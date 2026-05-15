# project-status.md

このファイルは、次の作業者へ現在地を引き継ぐために使う。
git push 完了時などの作業区切りで適宜更新することが望ましい。
作業中または次の判断に必要な情報を残し、すでに完了済みでコードや他のドキュメントで確認できる詳細は適宜削除して整理する。
コミットログで追えるような内容はこのドキュメントに残す必要はない。

## 2026-05-15
- 未コミットの作業として、テストランナーを Jest から Vitest へ変更中。
- 変更ファイル: `package.json`, `package-lock.json`, `vitest.config.ts`, `tsconfig.json`, `docs/tests.md`, `docs/project-status.md`。
- 検証済み: `npm test`, `./node_modules/.bin/tsc --noEmit`。
- `package.json` に `check` と `format` scripts を追加。`check` は `biome check . && oxlint`、`format` は `biome format --write .`。
- `AGENTS.md` の方針に従って `npm run check`、`npm run format`、再度 `npm run check` を実行。`format` は成功して 22 ファイルを整形。`check` は `biome check .` の診断で失敗中。
- `biome.json` と `.oxlintrc.json` を追加し、`dist`、`node_modules`、`.git`、`.vscode`、`log`、`sqlite` を check/format 対象外に設定。`npm run format` は成功。`npm run check` は `dist` 由来の診断は解消したが、ソース側の import 整理などで失敗中。`./node_modules/.bin/oxlint` 単独実行は成功。
