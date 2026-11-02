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
        source = {'archive_sha256': fonts.digest(data), 'fonts': [{
            'path': 'public/fonts/Satoshi-Variable.woff2',
            'sha256': fonts.digest(body), 'official_exact_match': entry}]}
        return data, source, body

    def test_exact_bytes_and_output_allowlist(self):
        data, source, body = self.fixture()
        self.assertEqual(fonts.verified_members(data, source), {source['fonts'][0]['path']: body})

    def test_archive_drift_fails_closed(self):
        data, source, _ = self.fixture()
        with self.assertRaisesRegex(ValueError, 'archive hash'):
            fonts.verified_members(data + b'drift', source)

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
        with self.assertRaisesRegex(ValueError, 'archive hash'):
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
