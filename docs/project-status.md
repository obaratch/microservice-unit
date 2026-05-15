# project-status.md

このファイルは、次の作業者へ現在地を引き継ぐために使う。
git push 完了時などの作業区切りで適宜更新することが望ましい。
作業中または次の判断に必要な情報を残し、すでに完了済みでコードや他のドキュメントで確認できる詳細は適宜削除して整理する。
コミットログで追えるような内容はこのドキュメントに残す必要はない。

## 現在の状態
- 作業ツリーには未コミット変更がある。今回の変更は `.editorconfig` 追加とこのステータス更新のみ。
- テストランナーは Vitest。`npm run check` は `tsc -p tsconfig.check.json --noEmit`、`biome check .`、`oxlint` を実行する。
- `.editorconfig` は Biome の既定に合わせてタブインデント、幅 2 にしている。
- `statman-stopwatch` は削除済み。起動時間計測は `app-backend/src/utils/TimeUtils.ts` の Temporal ベース `Stopwatch` を使用する。
- フロントエンドの CSS リセットは `modern-normalize` を使用する。

## 直近の検証
- 2026-05-16: `.editorconfig` を追加。npm 方針により `npm run format`, `npm run check` は未実行。
- 2026-05-16: `modern-css-reset` から `modern-normalize` へ切り替え。`npm run format`, `npm run check` が成功。
- 2026-05-16: `npm run format`, `npm run check` が成功。
