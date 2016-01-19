var path = require('path');
var webpack = require('webpack');
var appRootPath = path.resolve(__dirname, "app");
var modulePath = path.resolve(appRootPath, 'vendor');
var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel-core');

var wallabyPostprocessor = wallabyWebpack({
    plugins: [
      new webpack.IgnorePlugin(/.scss$/)
    ],
    resolve: {
      fallback: path.resolve("./node_modules"),
      root: [
        appRootPath,
        path.resolve(appRootPath, "game-wrappers")],
      extensions: ['', '.js', '.jsx', '.wbp.js']
    },
    module: {
      noParse: /(json|scss|react\.js|sinon\/).*/
    },
    node: {
      fs: "empty"
    }
  }
);

module.exports = function (wallaby) {
  return {
    env: {
     runner: "node_modules/phantomjs2-ext/lib/phantom/bin/phantomjs"
    },

    files: [
      {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
      {pattern: 'node_modules/chai/chai.js', instrument: false},

      {pattern: 'app/game-wrappers/*Test.js*', ignore: true},
      {pattern: 'app/game-wrappers/*.js', load: false}
    ],

    compilers: {
      'app/**/*.js*': wallaby.compilers.babel({
        babel: babel,
        sourceMap: true,
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['transform-runtime', "babel-plugin-transform-decorators-legacy"]
      })
    },

    tests: [
      {pattern: 'app/game-wrappers/gamesInterface-Test.js', load: false}
    ],

    testFramework: 'mocha',

    postprocessor: wallabyPostprocessor,

    debug: true,

    bootstrap: function (wallaby) {
      window.should = window.chai.should();
      window.expect = window.chai.expect;
      window.assert = window.chai.assert;
      window.__moduleBundler.loadTests();
    }
  };
};
