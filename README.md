# blend-monitoring

## 開発目的

色の調整をするために、複数の描画結果を見ることができるツール。

## 開発者向け

### 開発環境

* 言語 : TypeScript
* フレームワーク : React , Redux

基本的に、関数コンポーネントと React Hooks での開発をしています。

### ビルド

パッケージ管理には `yarn` を使用しています。

まずは `node.js` の環境が必要なので、もしなければ

node.js : v12.18.3

npm : v6.14.6

で開発していますので、ご用意いただければ..!と思います。

以下に、node.js が準備できた段階での初期インストールコマンドを記載します。

```
yarn install
yarn start
```

### コマンド

**yarn start**

開発サーバーを起動し、コードの変更があれば、サーバーをリロードするスクリプト

**yarn start-wdur**

基本的には、 `yarn start` と一緒だが、`why-did-you-render` パッケージを使用して、無駄な再レンダリングが起きていないかも監視する (ブラウザのコンソールに表示される)

**yarn build**

本番環境用のコードをビルドする

**yarn build-profile**

上の `yarn build`とほぼ変わらないが、追加で React DevToolsにて、パフォーマンス用の`profile`機能を、本番環境でも使用できるようにして、ビルドする

**yarn build-doc**

ドキュメントをビルドする

**yarn build-storybook**

ストーリーブックのページをビルドする

**yarn build-all**

アプリ、ドキュメント、ストーリーブックのファイルをビルドする

**yarn view-doc**

ドキュメントページを開く

**yarn view-storybook**

ストーリーブックページを開く

**yarn view-build**

ビルドしたアプリを開く

**yarn view-all**

ドキュメント、アプリ、ストーリーブックを開く

**yarn view-site**

よく使用するユーティリティ系のサイトを開くコマンド

**yarn view-site-doc**

よく使用するドキュメントのサイトを開くコマンド

## 今後やりたいこと

* Reactバージョンアップ
* electronでスタンドアロンなソフトにしたい

## ライセンス
しばらくお待ち下さい

おそらくGPLにする予定ですが、いまのところライセンスは定義されておりません
