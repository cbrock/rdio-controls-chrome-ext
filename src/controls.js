export default () => {

  var options = {
        url: '*://www.rdio.com/*'
      },
      codeToExecute = {
        code: 'document.querySelectorAll(".play_pause")[0].click()'
      },
      rdio,
      playing;

  // inject messaging into each rdio tab
  function injectTogglePlay () {

    var el = document.querySelectorAll(".play_pause")[0],
        sendInitMessage = true,
        playing;

    if (!el) return;

    if (sendInitMessage) {
      chrome.runtime.sendMessage({
        playing: el.className.indexOf('playing') > -1
      }, () => {
        sendInitMessage = false;
      });
    }

    // Send the current `playing` status back to the extension
    el.addEventListener('click', () => {
      chrome.runtime.sendMessage({
        playing: el.className.indexOf('playing') === -1
      });
    });

  }

  // toggle play/pause from the extension
  function togglePlay () {
    document.querySelectorAll(".play_pause")[0].click();
  }

  chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    console.log('onMessage: ', request);

    playing = request.playing;

    chrome.browserAction.setIcon({ path: playing ? 'assets/icon-on.png' : 'assets/icon-off.png' });
  });

  chrome.tabs.query(options, (tabs) => {
    // Only care about the first rdio tab we come across. Why would you have multiple rdio tabs open?
    rdio = tabs[0];
    chrome.tabs.executeScript(rdio.id, { code: '(' + injectTogglePlay.toString() + '());'});
  });

  chrome.browserAction.onClicked.addListener( () => {
    console.log('chrome listener added for tab:', rdio.id);
    chrome.tabs.executeScript(rdio.id, { code: '(' + togglePlay.toString() + '());'});
  });

};
