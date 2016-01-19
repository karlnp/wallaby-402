var path = require('path');
var webpack = require('webpack');
var appRootPath = path.resolve(__dirname, "app");
var modulePath = path.resolve(appRootPath, 'vendor');
var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel-core');

var wallabyPostprocessor = wallabyWebpack({
    externals: {
      "Backbone": "backbone",
      FB: "var FB"
    },
    plugins: [
      new webpack.DefinePlugin({}),
      new webpack.IgnorePlugin(/.scss$/),
      new webpack.ProvidePlugin(
        {
          "_": "underscore",
          "$": "jquery",
          "jquery": "jquery",
          "jQuery": "jquery",
          "React": "react",
          "react": "react",
          "isMobile": path.resolve(modulePath, "isMobile"),
          "hammer": path.resolve(modulePath, "hammer"),
          "Hammer": path.resolve(appRootPath, "vendor/hammer")
        })
    ],
    resolve: {
      fallback: path.resolve("./node_modules"),
      root: [
        appRootPath,
        path.resolve(appRootPath, "stores"),
        path.resolve(appRootPath, "server_interfaces"),
        path.resolve(appRootPath, "dispatchers"),
        path.resolve(appRootPath, "game-wrappers"),
        path.resolve(appRootPath, "jsx-templates/client/components"),
        path.resolve(appRootPath, "jsx-templates/client/dialogs"),
        path.resolve(appRootPath, "jsx-templates/client/"),
        path.resolve(appRootPath, "../node_modules/gsap/src/uncompressed"),
        path.resolve(appRootPath, "vendor"),
        path.resolve(appRootPath, "bower_components"),
        path.resolve(appRootPath, "utils"),
        path.resolve(appRootPath, "utils/patches")
      ],
      extensions: ['', '.js', '.jsx', '.wbp.js']
    },
    module: {
      noParse: /(vendor|jquery|bower_components|gsap|json|scss|react\.js|sinon\/).*/
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
      {pattern: 'node_modules/babel-core/browser-polyfill.js', instrument: false},
      {pattern: 'node_modules/es6-shim/es6-shim.js', instrument: false},
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