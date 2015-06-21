export function injectRdioListener() {
  var el = document.querySelectorAll('.play_pause')[0],
      sendInitMessage = true,
      playing;

  if (!el) {
    return;
  }

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

export function toggleRdio() {
  document.querySelectorAll('.play_pause')[0].click();
}
