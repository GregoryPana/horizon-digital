#!/usr/bin/env python3
"""Materialize only approved own-site fonts, never a public source distribution.
Requires Python 3 stdlib. No archive extraction or downloaded executable code.
"""
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import stat
import tempfile
import urllib.parse
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = Path(__file__).with_name('font-sources.json')
MAX_ARCHIVE = 32 * 1024 * 1024
MAX_FONT = 2 * 1024 * 1024
HOST = 'api.fontshare.com'
ALLOWED = frozenset({
    'public/fonts/Satoshi-Variable.woff2',
    'public/fonts/Switzer-Regular.woff2',
    'public/fonts/Switzer-Light.woff2',
    'public/fonts/Switzer-Bold.woff2',
    'public/fonts/Gambarino-Regular.woff2',
    'public/editorial-home/Satoshi-Variable.woff2',
    'public/editorial-home/Switzer-Regular.woff2',
})


def digest(data):
    return hashlib.sha256(data).hexdigest()


def safe_url(url):
    parsed = urllib.parse.urlsplit(url)
    if parsed.scheme != 'https' or parsed.netloc != HOST or parsed.query or parsed.fragment:
        raise ValueError('Only the pinned official HTTPS provider is permitted')


class OfficialRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        safe_url(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def download(url):
    safe_url(url)
    opener = urllib.request.build_opener(OfficialRedirect())
    request = urllib.request.Request(url, headers={'User-Agent': 'Horizon-Own-Site-Font-Build/1.0'})
    with opener.open(request, timeout=60) as response:
        safe_url(response.url)
        if response.status != 200:
            raise ValueError('Official font download did not return HTTP 200')
        data = response.read(MAX_ARCHIVE + 1)
    if len(data) > MAX_ARCHIVE:
        raise ValueError('Official font archive exceeds size limit')
    return data


def verified_members(data, source):
    if len(data) > MAX_ARCHIVE or digest(data) != source['archive_sha256']:
        raise ValueError('Pinned archive hash mismatch; provider drift requires explicit review')
    result = {}
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        infos = archive.infolist()
        names = [entry.filename for entry in infos]
        if len(names) != len(set(names)):
            raise ValueError('Duplicate archive entry')
        for entry in infos:
            path = PurePosixPath(entry.filename)
            mode = entry.external_attr >> 16
            if path.is_absolute() or '..' in path.parts or '\\' in entry.filename or stat.S_ISLNK(mode):
                raise ValueError('Unsafe archive entry')
        for font in source['fonts']:
            if font['path'] not in ALLOWED:
                raise ValueError('Unapproved output path')
            entry = archive.getinfo(font['official_exact_match'])
            if entry.is_dir() or entry.file_size > MAX_FONT:
                raise ValueError('Invalid font archive member')
            body = archive.read(entry)
            if body[:4] != b'wOF2' or digest(body) != font['sha256']:
                raise ValueError('Pinned font hash/format mismatch')
            result[font['path']] = body
    return result


def destination(root, name):
    if name not in ALLOWED:
        raise ValueError('Unapproved output path')
    target = root / name
    for path in [target, *target.parents]:
        if path == root:
            break
        if path.is_symlink():
            raise ValueError('Symlink output forbidden')
    return target


def prepare(root=ROOT, fetch=download):
    sources = json.loads(MANIFEST.read_text())
    declared = [f['path'] for s in sources.values() for f in s['fonts']]
    if len(declared) != len(set(declared)) or set(declared) != ALLOWED:
        raise ValueError('Manifest output inventory mismatch')
    pending = {}
    for source in sources.values():
        valid = True
        for font in source['fonts']:
            target = destination(root, font['path'])
            if not target.is_file() or digest(target.read_bytes()) != font['sha256']:
                valid = False
        if not valid:
            pending.update(verified_members(fetch(source['url']), source))
    # Complete all downloads/hash verification before any output write.
    for name, body in pending.items():
        target = destination(root, name)
        target.parent.mkdir(parents=True, exist_ok=True)
        temporary = None
        try:
            with tempfile.NamedTemporaryFile(dir=target.parent, prefix='.font-', delete=False) as handle:
                temporary = Path(handle.name)
                handle.write(body)
                handle.flush()
                os.fsync(handle.fileno())
            os.chmod(temporary, 0o644)
            os.replace(temporary, target)
        finally:
            if temporary is not None:
                temporary.unlink(missing_ok=True)
    print(f'Own-site fonts verified: {len(declared)}; downloaded outputs: {len(pending)}')


if __name__ == '__main__':
    prepare()
