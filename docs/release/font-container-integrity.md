# Official font content integrity

The approved fonts remain unchanged. Source archives/fonts are not distributed in this repository. Builds fetch only the existing official HTTPS Fontshare endpoints under the existing own-site license decision.

## Observed hosted failure

Diagnostic commit `11f9f6b14852ef2689920dd9c0413e32367e9b67`, GitHub run [41426810178](https://github.com/GregoryPana/horizon-digital/actions/runs/41426810178), captured bounded HTTP and decompressed member identities before any repair. All responses were official HTTP 200 ZIPs. Comparing local and hosted identities found exact same names, lengths and SHA-256 for every archive member: Satoshi 63, Switzer 103, Gambarino 8. Every member's ZIP timestamp differed. All seven approved output mappings retained their previously pinned exact font hashes. Historical container digests differ; this is not evidence of changed font bytes. Raw identity-only logs and comparison are retained in the private/local release evidence under `production-release/remote-font-diagnostic`; no binary font artifacts were uploaded.

## Correction

`archive_sha256` retains the original container digest as historical provenance, not content authority. `archive_members` pins the complete exact member inventory, decompressed SHA-256 and byte length, including license files and unused font formats. These pins were captured from official local archives and matched against hosted diagnostic identities before changing validation. No existing output-font hash, URL or output path changed.

The verifier authenticates every member, rejects missing/additional/duplicate names, unsafe paths and symlinks, enforces archive/member/count/total-size limits, checks CRC while reading, and independently checks each selected WOFF2 signature and original font SHA-256. Only approved paths are written atomically after all sources pass. Host/HTTPS/redirect restrictions remain in force. No extraction or downloaded code execution. Timestamp/compression metadata variation cannot substitute changed content.

Regression coverage includes metadata-only containers, recompressed changed content, nonselected/license member drift, inventory changes, size limits, no partial output on a later failure, and retained format/path/redirect/symlink/duplicate checks. Release acceptance still requires normal hosted CI, exact 137-file approved-build verification, normal production build/deploy and public asset/analytics readback.
