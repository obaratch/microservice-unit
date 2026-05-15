# project-status.md

このファイルは、次の作業者へ現在地を引き継ぐために使う。
git push 完了時などの作業区切りで適宜更新することが望ましい。
作業中または次の判断に必要な情報を残し、すでに完了済みでコードや他のドキュメントで確認できる詳細は適宜削除して整理する。

## 2026-05-15 (初回用書式サンプル。消してもOK)
- AGENTS.md を配備し、AIとの協業できるよう準備した。
- Node.js 26 を基底に、各種ライブラリやツール群を一新する予定

## 2026-05-15
- バックエンドの Express 依存コードを Hono 形式へ移行した。
- `hono` と `@hono/node-server` を利用し、Express/helmet/cors/express-session 依存は削除済み。
- `/healthcheck`, `/api/users/`, `/api/errortest/?status=418`, `POST /api/errortest/` の疎通確認済み。
- `npm run start-backend-dev` は `app-backend/src` のみを監視する設定へ変更済み。権限付き起動では `EMFILE` が解消し、`touch app-backend/src/main.ts` による再起動も確認済み。
- SCSS の Dart Sass `@import` deprecation warning を解消するため、`app-frontend/src/styles/index.scss` を `@use` へ移行し、共通リンクスタイルを `base.scss` に分離した。
- `node_modules/.bin/sass --no-source-map app-frontend/src/styles/index.scss /private/tmp/index.css` と `npm run build-frontend` で SCSS warning が出ないことを確認済み。
- TypeScript 6.0.3 を追加し、ソース内の `.js` を `.ts` 化した。対象は Vite 設定、フロント入口/設定/HTTP util、バックエンド Hono API/入口/logger。
- `package.json` に `"type": "module"` を追加し、backend/Vite 設定は import/export ベースへ移行した。backend の相対 import は NodeNext に合わせて `.js` 拡張子で記述している。
- `config` パッケージは削除し、設定は `app-backend/src/config.ts` に集約した。backend の `version` は `package.json.version` から取得し、server port は `config.server.port`、log level は `config.log.level` で定義している。log level は `NODE_ENV=dev` なら `debug`、それ以外なら `info`。Vite はビルド時に `package.json.version` を直接参照する。
- backend の開発時 TypeScript 実行は `tsx` に変更した。`npm run start-backend-dev` は `tsx watch app-backend/src/main.ts` を使う。
- backend の通常起動は `npm run build-backend` 後に `node app-backend/dist/main.js` を起動する。全体ビルド用に `npm run build` を追加し、backend/frontend をまとめてビルドできる。
- 検証: `./node_modules/.bin/tsc --noEmit`, `npm run build`, `npm run start-backend` 起動後に `/healthcheck` と `/api/users/` 疎通確認済み。起動プロセスは `npm run stop` で停止済み。
