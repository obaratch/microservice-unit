# project-status.md

このファイルは、次の作業者へ現在地を引き継ぐために使う。
git push 完了時などの作業区切りで適宜更新することが望ましい。
作業中または次の判断に必要な情報を残し、すでに完了済みでコードや他のドキュメントで確認できる詳細は適宜削除して整理する。
コミットログで追えるような内容はこのドキュメントに残す必要はない。

## 2026-05-15
- 未コミットの作業として、テストランナーを Jest から Vitest へ変更中。
- 変更ファイル: `package.json`, `package-lock.json`, `vitest.config.ts`, `tsconfig.json`, `docs/tests.md`, `docs/project-status.md`。
- 検証済み: `npm test`, `./node_modules/.bin/tsc --noEmit`。
