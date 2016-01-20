var imageRoot = "/app/images/";
var fontRoot = "/app/fonts/";
var styleRoot = "/app/style/";
var mobileDir = "Mobile_Assets/";
var webDir = "Client_Assets/";
var webPath = imageRoot + webDir;
var mobilePath = imageRoot + mobileDir;
var demoPath = "http://url1.com/";
var devPath = "https://url2.net";
// these variables are injected into both Javascript and SCSS.
module.exports = {
  templateDir: "jsx-templates/foxwoods/",
  styleDir: "style/foxwoods/",
  webPath: imageRoot + webDir,
  mobilePath: imageRoot + mobileDir,
  _facebookEnabled: false,
  WebpackAPIRoot: devPath
}