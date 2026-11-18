# Security

Report security issues privately to hello@yrlp.ir. Do not include secrets or
exploit details in public issues.

## Dependency advisories

Reviewed on 2026-11-18:

- [GHSA-g3hv-75wg-m249 (minimatch)](https://github.com/advisories/GHSA-g3hv-75wg-m249):
  `readdir-glob` uses patched minimatch 11.0.9 or newer through an npm override.
  Remove the override when the upstream dependency includes the fix.
- [GHSA-fc5q-39xc-vjpf (picomatch)](https://github.com/advisories/GHSA-fc5q-39xc-vjpf):
  no patched release is published. This remains an open dependency risk.
  The site deploys static files; it does not accept visitor-supplied glob patterns
  or run Node.js on the public host. Keep build inputs trusted and update the
  affected dependency chains when a patch becomes available.

Run `npm audit` when updating dependencies. Do not use `npm audit fix --force`
without reviewing its proposed framework changes. Validate updates with
`npm test`, `npm run build`, and `npm run generate`.
