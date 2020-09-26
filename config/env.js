'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

// en:
// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
//
// ja:
// `NODE_PATH`に従ってモジュールを解決することをサポートします。
//これにより、大きなモノリポジトリ内のインポートで絶対パスを使用できます。
//https://github.com/facebook/create-react-app/issues/253。
//ノード自体の `NODE_PATH`と同様に機能します。
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
//ノードとは異なり、 `NODE_PATH`からの*相対*パスのみが尊重されることに注意してください。
//そうしないと、WebpackシムではなくNode.jsコアモジュールをアプリにインポートするリスクがあります。
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
//また、それらを使用するすべてのツールが一貫して機能するように、それらを解決します。
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// en:
// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
// ja:
// NODE_ENVおよびREACT_APP_ *環境変数を取得し、次のように準備します
// webpack構成のDefinePluginを介してアプリケーションに注入されます。
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // en:
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        //
        // ja:
        //本番モードで実行しているかどうかを判断するのに役立ちます。
        //最も重要なのは、Reactを正しいモードに切り替えることです。
        NODE_ENV: process.env.NODE_ENV || 'development',
        // en:
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        //
        // ja:
        // `public`の静的アセットへの正しいパスを解決するのに役立ちます。
        //たとえば、<img src = {process.env.PUBLIC_URL + '/ img / logo.png'} />。
        //これはエスケープハッチとしてのみ使用する必要があります。通常、あなたは置くでしょう
        //画像を `src`に入れ、コードで` import`して、パスを取得します。
        PUBLIC_URL: publicUrl,
        // en:
        // We support configuring the sockjs pathname during development.
        // These settings let a developer run multiple simultaneous projects.
        // They are used as the connection `hostname`, `pathname` and `port`
        // in webpackHotDevClient. They are used as the `sockHost`, `sockPath`
        // and `sockPort` options in webpack-dev-server.
        //
        // ja:
        //開発中のsockjsパス名の構成をサポートします。
        //これらの設定により、開発者は複数のプロジェクトを同時に実行できます。
        //接続 `hostname`、` pathname`、 `port`として使用されます
        // webpackHotDevClient内。それらは `sockHost`、` sockPath`として使用されます
        // webpack-dev-serverの `sockPort`オプション。
        WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
        REACT_APP_IS_ACTIVATE_WDYR: process.env.IS_ACTIVATE_WDUR,
      }
    );
  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
