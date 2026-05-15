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
- `app-backend/src/utils/logger.ts` の `any` を Hono の `Context` / `Next` 型に置換。`npm run format` は成功。`npm run check` は logger の診断は解消し、残りは import 整理 4 件。
- `app-backend/src/api/errortest.ts` の import 順を整理し、Hono `Context` と `unknown` / `Record<string, unknown>` で暗黙 any を解消。`npm run format` は成功。`npm run check` は errortest の診断は解消し、残りは import 整理 3 件。
- Zed/TypeScript 上の `errortest.ts` の `c.text()` status 型エラーに対応。`ContentfulStatusCode` を使い、本文なし status code を除外するよう `_status` を調整。`tsc -p tsconfig.backend.json --noEmit` と `tsc --noEmit` は成功。`npm run check` は残り import 整理 3 件。
- `tsconfig.check.json` を追加し、`npm run check` の先頭で `tsc -p tsconfig.check.json --noEmit` を実行するよう変更。check 用 tsconfig は `.ts` のみ対象。`npm run format` は成功。`npm run check` は tsc 通過後、残り import 整理 3 件で失敗。
- `app-frontend/src/App.jsx` を `App.tsx` に変更し、`tsconfig.json` / `tsconfig.check.json` の対象を `.tsx` に更新。`HttpCilent` の省略可能引数も TSX 呼び出しに合わせて調整。`npm run format` は成功。`npm run check` は tsc 通過後、残り import 整理 2 件で失敗。
- `app-backend/src/api/users.ts` の import 順を整理し、Hono `Context` 型を追加。`npm run format` は成功。`npm run check` は tsc 通過後、残り import 整理 1 件で失敗。
- `vite.config.ts` の import 順を整理。`npm run format` と `npm run check` が成功。check は `tsc -p tsconfig.check.json --noEmit`、`biome check .`、`oxlint` まで通過。
