# Google-Contacts-Coda-Pack

Comprehensive Google Contacts Coda Pack with two-way sync support. Manage regular contacts and Gmail "other contacts" directly in Coda tables. Features: CRUD operations, contact groups, batch updates, and seamless OAuth token refresh. Edit contacts in Coda and sync changes back to Google automatically.

## Commands

| Task | Command |
|---|---|
| install | `npm ci` |
| test (mocked, offline) | `npm test` |
| build | `npm run build` |
| validate | `npm run validate` |

## How this repo is gated

- `dev` is the default and PR target; `main` is production.
- CI runs mocked tests, SDK validation, and build in `checks`. The aggregate
  `verify` job requires `checks` to succeed, including on fork PRs without secrets.
- Agents must never merge PRs into any branch, upload, release, or deploy.
  Administrator credentials do not override this instruction.
- This repo ships a Coda Pack; merging a PR does not publish it.

## Working rules

- Branch from `dev` with an approved prefix: `feat/`, `fix/`, `chore/`, `docs/`,
  `sec/`, `adr/`. Land back into `dev` through a pull request.
- Conventional Commits. Imperative subject, lower case, no trailing full stop,
  72 characters hard limit. The body explains *why*; the diff already shows what.
- Never modify vendored third-party sources. Fix the environment instead.
- Local contribution checks need no secrets. Maintainer publishing credentials
  come from 1Password at runtime via `op run` and `op://` references.
  Never write a credential into a file, a commit, or a shell history line.
- Verify before claiming completion. A merged pull request is not a deployment,
  and a git tag is not a publication.

## Repository boundaries

- Use Node 22.x (`.nvmrc`) and `npm ci`; run test, validate, and build above.
- `pack.ts` is the source of truth. Keep formula parameter order, schema IDs,
  mutable fields, etags, group restrictions, and read-only Other Contacts stable.
- Exercise exported pack behavior through SDK mock helpers. Use synthetic data;
  never access or mutate account contacts for tests.
- Never edit generated `.tmp/`, `pack-build/`, `build/`, `dist/`, or dependencies.
- Worktrees: `wt new <name> origin/dev`, always at `<repo>/.worktrees/<name>`.
  Contributors without `wt` may use a separate standard clone instead.
- Follow [CONTRIBUTING.md](CONTRIBUTING.md) for self-contained setup, checks,
  acceptance criteria, and review evidence. No private handbook is required.
