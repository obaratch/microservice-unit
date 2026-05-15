# project-status.md

このファイルは、次の作業者へ現在地を引き継ぐために使う。
git push 完了時などの作業区切りで適宜更新することが望ましい。
作業中または次の判断に必要な情報を残し、すでに完了済みでコードや他のドキュメントで確認できる詳細は適宜削除して整理する。
コミットログで追えるような内容はこのドキュメントに残す必要はない。

## 現在の状態
- 主な変更は、フロントエンド SCSS 整理、CSS リセットの `modern-normalize` 化、npm script 名の `:` 区切り化、README 更新、Docker 起動修正、Dockerfile の `node:26-slim` 移行。
- テストランナーは Vitest。`npm run check` は `tsc -p tsconfig.check.json --noEmit`、`biome check .`、`oxlint` を実行する。
- `.editorconfig` は Biome の既定に合わせてタブインデント、幅 2 にしている。
- SCSS は `app-frontend/src/styles/index.scss` から `fonts.scss`、`layers.scss`、`reset.scss`、`base.scss`、`header-footer.scss` を読み込む構成。cascade layer は `reset, base, components, page, overrides`。
- フロントエンドのビルド時刻表示は `app-frontend/src/utils/DatetimeUtils.ts` に集約している。`Temporal.Now.timeZoneId()` が使える場合はそれを優先し、Temporal が無い場合は `Intl.DateTimeFormat().resolvedOptions().timeZone` にフォールバックする。表示形式は `yyyy-mm-dd HH:mm:ss ([zone])`。
- バックエンド起動時間計測は `app-backend/src/utils/TimeUtils.ts` の `performance.now()` ベース `Stopwatch` を使用する。
- Dockerfile は `node:26-slim` を使用する。`tzdata` の明示インストールは不要なため行わず、runtime stage のみ `sqlite3` を apt で導入する。
- Docker の公開ポートからバックエンドへ接続できるよう、Hono は `0.0.0.0` で listen する。

## 直近の検証
- 2026-05-16: `git pull` のコンフリクトを incoming 側採用で解決し、merge commit `f542660` を作成。作業ツリーは clean。
- 2026-05-16: `npm run format` 成功。
- 2026-05-16: `npm run check` 成功。
- 2026-05-16: `npm test` 成功。
- 2026-05-16: `docker compose up --build -d` 成功。コンテナ内の `date +%Z` は `JST`、`node -p "process.version + ' Temporal=' + typeof Temporal"` は `v26.1.0 Temporal=object`、`sqlite3 --version` は `3.46.1`。
- 2026-05-16: `http://127.0.0.1:3000/healthcheck` は `ok`、`http://127.0.0.1:3000/api/users` は admin ユーザー JSON を返すことを確認。
