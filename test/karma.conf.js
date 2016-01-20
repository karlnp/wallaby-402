/**
 * Created by Karl on 6/3/2015.
 */
var path = require('path');
var webpack = require('webpack');
var appRootPath = path.resolve(__dirname, "../app");
var webpackConfig =  {
  devtool: "source-map",
  plugins: [
    new webpack.SourceMapDevToolPlugin(
      {
        filename:'[file].js.map',
        sourceMappingURLComment: "[name]",
        moduleFilenameTemplate: "[resourcePath]",
        fallbackModuleFilenameTemplate:"[resourcePath]?[hash]",
        append: `\n//# sourceMappingURL=${path}[url]`,
        include: ["./", "./app"],
        exclude: ["./node_modules", "./app/vendor", "./app/bower_components", "./build"]
      }),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    fallback: path.resolve("./node_modules"),
    root: [
      appRootPath,
      path.resolve(appRootPath,"game-wrappers")
    ],
    extensions: ['', '.js', '.jsx', '.sass', '.css', '.scss']
  },
  noParse: /(vendor|jquery|lib|bower_components|gsap|json|scss|react\.js|sinon\/).*/,
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|vendor)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-runtime', "babel-plugin-transform-decorators-legacy"]
        },
        include: [appRootPath,
          path.join(appRootPath,"game-wrappers")
        ]
      }
    ]
  },
  node: {
    fs: "empty"
  }
};

webpackConfig.devtool = "cheap-module-source-map";
webpackConfig.node = {
  net: "empty",
  tls: "empty",
  fs: "empty"
};
webpackConfig.bail = true;
require('babel-polyfill');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['chai-as-promised', 'sinon-chai', 'chai', 'mocha'], //karma load order is important
    browsers: ['Chrome', 'Firefox', 'PhantomJS_custom'], //eventually we will use a headless browser like PhantomJS but you gotta start somewhere
    // you can define custom flags on launchers
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS2',
        debug: true
      }
    },
    singleRun: false,
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
    captureTimeout: 60000,
    browserNoActivityTimeout: 30000,
    //list of files/patterns to load in the browser
    files: [
      'polyfill.js',
      'karmaIndex.js'
    ],
    preprocessors: {
      'karmaIndex.js': ['webpack']
    },
    reporters: ['mocha'],
    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-babel-preprocessor'),
      require('karma-mocha-reporter'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-sinon-chai'),
      require('karma-chai-as-promised'),
      require('karma-phantomjs2-launcher'),
      require('karma-webpack-with-fast-source-maps')
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      //noInfo: true
    }
  });
};
