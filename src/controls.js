/**
* Find an rdio tab and toggle the play/pause button
*/
export default function foo() {
  var options = {
        url: '*://www.rdio.com/*'
      },
      playing = false;

  chrome.browserAction.onClicked.addListener( function () {

    chrome.browserAction.setIcon({ path: !playing ? 'icon-on.png' : 'icon-off.png' }, function () {
      playing = !playing;
    });

    chrome.tabs.query(options, function (tabs) {
      var details = {
        code: 'document.getElementsByClassName("play_pause")[0].click();'
      };
      tabs.forEach(function (tab) {
        chrome.tabs.executeScript(tab.id, details);
      });

    });
  });
}
