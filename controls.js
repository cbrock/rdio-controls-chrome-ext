/**
* Find an rdio tab and toggle the play/pause button
*/
var options = {
  url: '*://www.rdio.com/*'
};

chrome.browserAction.onClicked.addListener( function () {
  chrome.tabs.query(options, function (tabs) {

    var details = {
      code: 'document.getElementsByClassName("play_pause")[0].click();'
    };
    tabs.forEach(function (tab) {
      chrome.tabs.executeScript(tab.id, details);
    });

  });
});