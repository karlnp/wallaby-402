var keyMirror = require('keymirror');
import * as _ from 'lodash';

var events = keyMirror({
  ERROR_DESCRIPTION: null,
  TEST: null
});

var Actions = keyMirror({
  NOT_IMPLEMENTED: null,
  ERROR_DESCRIPTION: null
});

console.log(WebpackAPIRoot);

/**
 * @name buildAction
 * @param suppliedType string
 * @param suppliedJson {json | string}
 */
export function buildAction(suppliedType, suppliedJson) {
  return {type: suppliedType, json: suppliedJson, errors: []};
}

/**
 * @name notifyViewEventDispatcher
 * @param actionObject Action
 */
export function notifyViewEventDispatcher(actionObject) {
  // stub
}
/**
 * @name notifyViewEventDispatcher
 * @param key
 * @param value
 * @param actionObject
 *
 **/
export function notifyServerEventDispatcher(key, value, actionObject) {
 // stub
}

export function stubbedListener(event) {
  if (event === undefined || event === null) {
    console.log("Undefined or null event. Returning.");
    return;
  }

  if (event.target == document.getElementById("iframeCanvas")) {
    var data = event.data;
    var separator = data.indexOf(":");
    var key = data.substr(0, separator);
    var value = data.substr(separator + 1);
    notifyPropertyChanged(key, value);
  }
}

/**
 * @name sendEventToIFrame
 * @param key
 * @param value
 * @method
 */
export function sendEventToIFrame(key, value = null){
  let dataString = "";
  if(value === null){
    dataString = key;
  }else{
    dataString = key.toString().toUpperCase()+":"+value.toString().toUpperCase();
  }
  document.getElementById("iframeCanvas").contentWindow.postMessage(dataString, "*");
}

export function addFrameEventListener(eventRef, suppliedListener = stubbedListener) {
  eventRef.addEventListener('message', suppliedListener, false);
}

export function removeFrameEventListener(eventRef, suppliedListener = stubbedListener) {
  eventRef.removeEventListener("message", suppliedListener);
  console.log("Event listener removed.");
}

export function notImplemented(suppliedKey, suppliedValue) {
  notifyViewEventDispatcher(buildAction(
    Actions.NOT_IMPLEMENTED,
    JSON.stringify({[suppliedKey]: suppliedValue}),
    "{}"
   // JSON.stringify({key: suppliedValue})
    //JSON.stringify({[suppliedKey]: suppliedValue})
  ));
}

export function notifyPropertyChanged(key, value) {
  var eventReactions = {
    [events.ERROR_DESCRIPTION]: function logError(message) {
      console.warn("error: " + message);
    }
  };
  if (_.includes(Object.keys(events), key)) {
    eventReactions[key](value);
  }
}
var publicObj = {
  notifyPropertyChanged: notifyPropertyChanged,
  addGameEventListener: addFrameEventListener,
  removeGameEventListener: removeFrameEventListener,
  sendEventToGame: sendEventToIFrame
};
export default publicObj;
