# Google-Contacts-Coda-Pack

Comprehensive Google Contacts Coda Pack with two-way sync support. Manage regular contacts and Gmail "other contacts" directly in Coda tables. Features: CRUD operations, contact groups, batch updates, and seamless OAuth token refresh. Edit contacts in Coda and sync changes back to Google automatically.

## Commands

| Task | Command |
|---|---|
| install | `npm ci` |
| build | `npm run build` |
| validate | `npm run validate` |

## How this repo is gated

- `dev` is the default branch and where work lands. Pull requests are required, and a status check must pass before merge.
- `main` is production. It is restricted: only an admin can advance it, so an agent can open a pull request against it but cannot merge one.
- This repo ships a Coda Pack.

## Working rules

- Branch from `dev` with an approved prefix: `feat/`, `fix/`, `chore/`, `docs/`,
  `sec/`, `adr/`. Land back into `dev` through a pull request.
- Conventional Commits. Imperative subject, lower case, no trailing full stop,
  72 characters hard limit. The body explains *why*; the diff already shows what.
- Never modify vendored third-party sources. Fix the environment instead.
- Secrets come from 1Password at runtime via `op run` and `op://` references.
  Never write a credential into a file, a commit, or a shell history line.
- Verify before claiming completion. A merged pull request is not a deployment,
  and a git tag is not a publication.

Cross-repo policy lives in `cnw-platform-handbook/docs/engineering-operating-model.md`.
