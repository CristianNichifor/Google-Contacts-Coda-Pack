# Contributing

## Local checks without account access

Use Node **22.x** (`.nvmrc`), matching CI and the installed Packs SDK's minimum
Node version. With nvm, run `nvm install && nvm use`; other version managers can
select Node 22 directly.

```sh
npm ci
npm test
npm run validate
npm run build
```

The initial install needs access to the npm registry (or a populated npm cache).
After installation, these checks run locally without Google or Coda accounts,
OAuth credentials, 1Password, or a private handbook. Do not run `npm run upload`
or `npm run release` as a contribution check; they are maintainer publishing
commands and can change the live Pack.

`npm test` uses Node's built-in test runner and the installed SDK's development
helpers against the real exported `pack`. All People API responses are synthetic;
the mock fetcher has no network fallback. TypeScript's public `transpileModule`
API compiles `pack.ts` and `tests/pack.test.ts` into a unique ignored `.tmp/`
directory, which is removed after execution. Transpilation is not type checking.
The SDK CLI owns pack compilation and manifest validation; there is no standalone
`tsc` check configured here. Build artifacts are generated and must not be edited
or committed.

Tests cover regular/other-contact pagination, filtering and limits, etags and
conflicts, mixed sync-update outcomes, read-only Other Contacts, group detail
fallback, batch membership limits, and search query escaping. They do not verify
live OAuth, Google API compatibility, or Coda-hosted execution. Use invented names
and identifiers in fixtures, never exported account contacts.

## Branches and review

Target `dev`. Maintainers using `wt` create in-repo worktrees from the repository
root:

```sh
git fetch origin
wt new chore/my-change origin/dev
```

The worktree belongs at `<repo>/.worktrees/chore/my-change`; do not move it by hand.
Contributors without `wt` can use a separate ordinary clone of their fork, add this
repository as `upstream`, fetch it, and create a branch from `upstream/dev`.
Use `feat/`, `fix/`, `chore/`, `docs/`, `sec/`, or `adr/` prefixes.

Describe the expected behavior and acceptance criteria in the issue or PR. For a
bug, include a synthetic reproduction and a failing regression test before the
fix. In the PR, include the commands run, their results, and relevant limitations.
Keep Conventional Commit subjects imperative, lower case, and at most 72
characters; keep each commit focused on one change.

CI runs tests, validation, and build once in `checks`; the aggregate `verify` job
passes only when `checks` succeeds. Fork PRs require no secrets. Agents must never
merge PRs (including into `dev`), upload, release, or deploy. Maintainers review
and merge separately; merging is not publishing.

## Source boundaries

- `pack.ts`: exported schemas, formulas, sync tables, People API requests, and
  embedded country/label data. Keep formula names, parameter ordering, row IDs,
  schema mappings, and mutable-field contracts compatible.
- `tests/pack.test.ts`: mocked behavior of those exported entry points. Assert
  request method, URL, masks, etags, and outcomes, not just formula registration.
- `scripts/test.mjs`: local test transpilation and execution; no loader patches
  or private Node Module APIs.
- `node_modules/`, `.tmp/`, `pack-build/`, `build/`, and `dist/`: generated output.

Preserve the read-only treatment of Other Contacts, contact group restrictions,
deleted-row handling, and per-row update failures. Changes to writes must retain
etag conflict behavior and avoid changing fields outside the requested update.
