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
- `npm run start-backend-dev` は `app-backend/src` のみを監視する設定へ変更済み。権限付き起動では `EMFILE` が解消し、`touch app-backend/src/main.js` による再起動も確認済み。
