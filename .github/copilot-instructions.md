## Copilot instructions for the ComfyUI docs repository

Keep this short and actionable so an AI coding agent can be immediately productive.

- Project purpose: this repository contains the Mintlify-based documentation for ComfyUI (English + translations under `zh-CN`, etc.). Primary content lives in MDX files across top-level folders (for example `get_started/`, `installation/`, `built-in-nodes/`).
- Dev server: start with `npm i` then `npm run dev`. The `dev` script runs `npx mint dev` (see `package.json`). The local site serves on port 3000 by default — verify by browsing to `http://localhost:3000`.

- What to change: edit or add MDX files under the top-level folders. Keep file names stable; if you move/rename an MDX file, update `docs.json` with a redirect entry and add the corresponding translated file under `zh-CN/` (GitHub Actions will fail the PR if missing).

- Key files and directories to reference:
  - `package.json` — scripts and important dev dependencies.
  - `README.md` — local dev steps and localization notes.
  - `docs.json` — navigation and redirects (required when renaming/moving pages).
  - `built-in-nodes/` — built-in node MDX docs; note node docs are synchronized from the embedded-docs repo.

- Common patterns in this repo:
  - Single-level organization for node docs (see `built-in-nodes/`).
  - Translations are stored in language-code folders (for example `zh-CN/`). When editing an English page you must update the translated version too.
  - Images and example workflows: upload examples to the `example_workflows` or reference raw GitHub URLs; follow the README guidance for raw URLs.

- When changing layout/style or adding images, run the dev server and visually inspect the page(s) at `http://localhost:3000/<path>` (for example `/get_started/first_generation`). Verify images load, layout does not break, and navigation links work.

- Troubleshooting dev server:
  - If `npm run dev` fails, check `package.json` and ensure `mint` is installed. Running `npm i` will install dependencies.
  - If port 3000 is in use, either free the port or run Mintlify on a different port via the Mintlify CLI options (see Mintlify docs). Update reviewers and CI notes if the port changes.

- Minimal contract for edits (useful for automated agents):
  - Input: modified or new MDX file(s).
  - Output: updated MDX content, updated `docs.json` if paths changed, translated file(s) under `zh-CN` when required.
  - Error modes: missing redirects in `docs.json` will fail GitHub Action; missing translations will also fail checks.

- Examples to reference in reviews:
  - `get_started/first_generation.mdx` — example user-facing page to verify after edits.
  - `built-in-nodes/overview.mdx` — node docs pattern and structure.

If anything in this file is unclear, ask for the target page(s) or a failing PR reference so we can provide more tailored guidance.
