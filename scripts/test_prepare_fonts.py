"""Network-free packaging regression tests; fixture bytes are not font software."""
import io
from pathlib import Path
import tempfile
import unittest
import zipfile
import prepare_fonts as fonts


class FontPackagingTests(unittest.TestCase):
    def fixture(self, entries=None):
        body = b'wOF2synthetic-test-data-not-a-font'
        entry = 'Fixture/Fonts/WEB/fonts/Example.woff2'
        stream = io.BytesIO()
        with zipfile.ZipFile(stream, 'w') as archive:
            for name, data in (entries or [(entry, body)]):
                archive.writestr(name, data)
        data = stream.getvalue()
        source = {'archive_sha256': fonts.digest(data),
                  'archive_members': {name: {'sha256': fonts.digest(value), 'bytes': len(value)}
                                      for name, value in (entries or [(entry, body)])},
                  'fonts': [{
            'path': 'public/fonts/Satoshi-Variable.woff2',
            'sha256': fonts.digest(body), 'official_exact_match': entry}]}
        return data, source, body

    def test_exact_bytes_and_output_allowlist(self):
        data, source, body = self.fixture()
        self.assertEqual(fonts.verified_members(data, source), {source['fonts'][0]['path']: body})

    def test_metadata_only_container_variation_keeps_exact_members(self):
        data, source, body = self.fixture()
        stream = io.BytesIO()
        with zipfile.ZipFile(stream, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
            info = zipfile.ZipInfo(source['fonts'][0]['official_exact_match'], (2020, 1, 2, 3, 4, 6))
            info.comment = b'changed container metadata'
            archive.writestr(info, body)
        varied = stream.getvalue()
        self.assertNotEqual(fonts.digest(varied), fonts.digest(data))
        self.assertEqual(fonts.verified_members(varied, source), {source['fonts'][0]['path']: body})

    def test_repacked_content_drift_fails_closed(self):
        _, source, body = self.fixture()
        stream = io.BytesIO()
        with zipfile.ZipFile(stream, 'w') as archive:
            archive.writestr(source['fonts'][0]['official_exact_match'], body + b'tamper')
        with self.assertRaisesRegex(ValueError, 'member hash'):
            fonts.verified_members(stream.getvalue(), source)

    def test_added_or_removed_member_rejected(self):
        data, source, body = self.fixture()
        for entries in ([('extra', b'x'), (source['fonts'][0]['official_exact_match'], body)], []):
            stream = io.BytesIO()
            with zipfile.ZipFile(stream, 'w') as archive:
                for name, value in entries:
                    archive.writestr(name, value)
            with self.assertRaisesRegex(ValueError, 'inventory'):
                fonts.verified_members(stream.getvalue(), source)

    def test_member_size_limit_rejected(self):
        data, source, _ = self.fixture()
        from unittest.mock import patch
        with patch.object(fonts, 'MAX_FONT', 1), self.assertRaisesRegex(ValueError, 'member'):
            fonts.verified_members(data, source)

    def test_no_outputs_written_if_later_source_fails(self):
        import copy
        import json
        from unittest.mock import patch, Mock
        data, source, _ = self.fixture()
        first, second = copy.deepcopy(source), copy.deepcopy(source)
        paths = sorted(fonts.ALLOWED)
        first['url'], second['url'] = 'first', 'second'
        first['fonts'] = [{**source['fonts'][0], 'path': p} for p in paths[:-1]]
        second['fonts'][0]['path'] = paths[-1]
        manifest = Mock()
        manifest.read_text.return_value = json.dumps({'first': first, 'second': second})
        with tempfile.TemporaryDirectory() as directory, patch.object(fonts, 'MANIFEST', manifest):
            root = Path(directory)
            with self.assertRaises(ValueError):
                fonts.prepare(root, fetch=lambda url: data if url == 'first' else b'invalid')
            self.assertEqual(list(root.rglob('*')), [])

    def test_nonselected_member_drift_rejected(self):
        _, source, body = self.fixture()
        source['archive_members']['License/FFL.txt'] = {'sha256': fonts.digest(b'license'), 'bytes': 7}
        stream = io.BytesIO()
        with zipfile.ZipFile(stream, 'w') as archive:
            archive.writestr(source['fonts'][0]['official_exact_match'], body)
            archive.writestr('License/FFL.txt', b'changed')
        with self.assertRaisesRegex(ValueError, 'member hash'):
            fonts.verified_members(stream.getvalue(), source)

    def test_font_drift_fails_closed(self):
        data, source, _ = self.fixture()
        source['fonts'][0]['sha256'] = '0' * 64
        with self.assertRaisesRegex(ValueError, 'font hash'):
            fonts.verified_members(data, source)

    def test_output_escape_rejected(self):
        data, source, _ = self.fixture()
        source['fonts'][0]['path'] = '../escape.woff2'
        with self.assertRaisesRegex(ValueError, 'output path'):
            fonts.verified_members(data, source)

    def test_unsafe_archive_paths_rejected(self):
        for name in ('../escape', '/absolute', 'a\\b'):
            with self.subTest(name=name):
                data, source, _ = self.fixture([(name, b'fixture')])
                with self.assertRaisesRegex(ValueError, 'Unsafe'):
                    fonts.verified_members(data, source)

    def test_duplicate_archive_rejected(self):
        import warnings
        with warnings.catch_warnings():
            warnings.simplefilter('ignore', UserWarning)
            data, source, _ = self.fixture([('duplicate', b'a'), ('duplicate', b'b')])
        with self.assertRaisesRegex(ValueError, 'Duplicate'):
            fonts.verified_members(data, source)

    def test_html_error_response_is_not_an_archive(self):
        data, source, _ = self.fixture()
        with self.assertRaisesRegex(ValueError, 'archive format'):
            fonts.verified_members(b'<html>Service unavailable</html>', source)

    def test_missing_member_rejected(self):
        data, source, _ = self.fixture()
        source['fonts'][0]['official_exact_match'] = 'absent.woff2'
        with self.assertRaises(KeyError):
            fonts.verified_members(data, source)

    def test_provider_and_redirect_restrictions(self):
        fonts.safe_url('https://api.fontshare.com/v2/fonts/download/satoshi')
        for url in ('http://api.fontshare.com/font', 'https://attacker.example/font',
                    'https://api.fontshare.com.attacker.example/font',
                    'https://api.fontshare.com/font?redirect=elsewhere'):
            with self.subTest(url=url), self.assertRaises(ValueError):
                fonts.safe_url(url)

    def test_symlink_destination_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'public').symlink_to(root / 'elsewhere', target_is_directory=True)
            with self.assertRaisesRegex(ValueError, 'Symlink'):
                fonts.destination(root, 'public/fonts/Satoshi-Variable.woff2')

    def test_symlink_member_rejected(self):
        stream = io.BytesIO()
        with zipfile.ZipFile(stream, 'w') as archive:
            info = zipfile.ZipInfo('link')
            info.external_attr = 0o120777 << 16
            archive.writestr(info, 'target')
        _, source, _ = self.fixture()
        data = stream.getvalue()
        source['archive_sha256'] = fonts.digest(data)
        with self.assertRaisesRegex(ValueError, 'Unsafe'):
            fonts.verified_members(data, source)


if __name__ == '__main__':
    unittest.main()
