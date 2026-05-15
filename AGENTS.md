# AGENTS.md

## 前提
- 本プロジェクトでは基本的に日本語を使用する。ただし以下は英語でも良い
  * コードそのもの
  * ログ
  * エラーメッセージ
- この AGENTS.md は
  * プロジェクト全体の定義やルールを記載するドキュメントである。
  * `docs/` 下の各種ドキュメントへのTOCである。

## 共通作業方針
- 会話スレッドの冒頭や初回担当時は、 `project-status.md` を確認し、作業の一区切りごとに更新する。
- npm はサンドボックス制約下にあるためすぐには実行せず、まず `npm.md` を参照する。
- コードやドキュメントの編集後は `npm run check` と `npm run format` を実行する。

## 主要ドキュメント
- [project-status.md](./docs/project-status.md): プロジェクトの現状や今後の予定
- [git.md](./docs/git.md): gitの運用ルール
- [npm.md](./docs/npm.md): npmの運用ルール
- [tests.md](./docs/tests.md): テストコードの記述方針
