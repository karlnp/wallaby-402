import GamesInterface from './gamesInterface';
var domino = require('domino');
describe('gamesInterface', function () {
  beforeEach(function () {
    var window = domino.createWindow('<iframe id="iframeCanvas" src="about:blank"  sandbox="allow-same-origin allow-scripts"></iframe>');
    var document = window.document;
  });

  it('should receive events from supplied element', function (done) {
    function spyOnListener (event) {
      var testData = event.data;
      assert.equal(testData, "TEST:SUCCESS");
      done();
    }

    var elementRef = document.getElementById("iframeCanvas");
    should.exist(elementRef);
    GamesInterface.addGameEventListener(elementRef,spyOnListener);
    var event = document.createEvent('Event');
    event.initEvent('message', true, true);
    event.origin = "https://expectedUrl.com";
    event.data = "TEST:SUCCESS";
    elementRef.dispatchEvent(event);
  });
});
