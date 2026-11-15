# Golden Grace from another device

## Free browser editing and hosted preview

Open https://github.dev/Sankofa-Digital-Studio/golden-grace-legacy/tree/development and sign in to GitHub to edit the development branch. Commit changes through Source Control. This editor is free and does not depend on the original computer. It does not include a terminal or a running Node server.

The public preview runs on the existing Vercel project. Use the preview alias supplied in the deployment email. Keep development changes on `development`, validate, then merge to `preview`. Production stays on `main`.

## Full cloud development environment

The repository includes `.devcontainer/devcontainer.json` with Node 24, automatic dependency installation and port 5173 forwarding. Open https://github.com/codespaces/new?repo=1120545222&ref=development to create a Codespace under your account. In its terminal run `npm run dev -- --host 0.0.0.0` and open the forwarded port. Run `npm run validate` before publishing changes.

A running Codespace was not provisioned by this update: the connected GitHub CLI lacks the `codespace` OAuth scope. Codespaces has a monthly included allowance for eligible personal accounts, not unlimited free compute. To remain within the requested zero-cost constraint, do not enable paid usage; use the free browser editor and Vercel preview when the allowance is unavailable.

## Working from a phone

Use the public preview to review the site in Safari on iPhone or Chrome on Android. The browser editor is more comfortable on a tablet or with desktop-site mode and a keyboard. Changes saved only in browser storage are not backed up until committed to GitHub.

## References

- https://docs.github.com/en/codespaces/the-githubdev-web-based-editor
- https://docs.github.com/en/codespaces/developing-in-a-codespace/developing-in-a-codespace
