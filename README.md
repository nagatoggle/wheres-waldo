# Where's Waldo
[The Odin Project](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app)の課題として制作した､フルスタックの写真タグ付けアプリケーション

[デモサイト](https://wheres-waldo-plsz.onrender.com/) (Renderの無料枠のため､起動に20秒ほどかかります)

## 技術スタック
- フロントエンド: React, React Router, Material UI
- バックエンド: Node.js, Express
- データベース: PostgreSQL

## 特徴･機能
- **様々な画面サイズに対応**: クリック座標･元画像の大きさ･表示された画像の大きさから､画像のどこをクリックしたのか算出
- **サーバーサイドでの時間計測**: ゲーム開始時刻とゲームクリア時刻をサーバーで記録することで､時間の改ざんを防止
- **ランキング機能**: 30位以内に入ると､名前を記録できる

## ローカルでの実行方法
このプロジェクトは npm workspaces を使用したモノレポ構成になっています

1. リポジトリをCloneする
2. プロジェクトのルートディレクトリで`npm install`を実行する
3. `cp server/.env.example server/.env`で`.env`ファイルを作成し､usernameとpasswordを書き換える
4. `systemctl status postgresql`で`postgresql`が動いていることを確認する
5. `wheres_waldo`という名前のデータベースを作成する
6. `npm run populate -w server`を実行し､データベースにランキングの初期データを投入する
7. `npm run dev`を実行し､クライアントとサーバーを同時に起動する