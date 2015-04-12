var rdioTab,
    rdioIsPlaying;

function injectRdioListener () {
  var el = document.querySelectorAll(".play_pause")[0],
      sendInitMessage = true,
      playing;

  if (!el) return;

  if (sendInitMessage) {
    chrome.runtime.sendMessage({
      isPlaying: el.className.indexOf('playing') > -1
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

function toggleRdio () {
  document.querySelectorAll(".play_pause")[0].click();
}

export default function () {
  var queryOptions = {
        url: '*://www.rdio.com/*'
      };

  chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    console.log('onMessage: ', request);

    rdioIsPlaying = request.isPlaying;

    chrome.browserAction.setIcon({ path: rdioIsPlaying ? 'assets/icon-on.png' : 'assets/icon-off.png' });
  });

  chrome.tabs.query(queryOptions, (tabs) => {
    console.log(injectRdioListener, toggleRdio);
    // Only care about the first rdio tab we come across. Why would you have multiple rdio tabs open?
    rdioTab = tabs[0];
    if (rdioTab) {
      console.log(injectRdioListener);
      chrome.tabs.executeScript(rdioTab.id, { code: '(' + injectRdioListener.toString() + '());'});
    } else {
      console.warn('no rdio.com tab found');
    }
  });

  chrome.browserAction.onClicked.addListener( () => {
    console.log('chrome listener added for tab:', rdioTab.id);
    chrome.tabs.executeScript(rdioTab.id, { code: '(' + toggleRdio.toString() + '());'});
  });
}
