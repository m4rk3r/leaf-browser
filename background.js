
chrome.storage.local.get(['lbEnabled'], res => {
  enabled = res.lbEnabled;
  // init icon state
  chrome.browserAction.setIcon({ path: {
    '16': `icon16-${enabled?'on':'off'}.png`,
    '64': `icon64-${enabled?'on':'off'}.png`,
    '128': `icon128-${enabled?'on':'off'}.png`
  }});
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.storage.local.get(['lbEnabled'], res => {
    enabled = !res.lbEnabled;

    // update storage
    chrome.storage.local.set({'lbEnabled': enabled});

    // notify content script
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {leafEnabled: enabled});
    })

    // update icon
    chrome.browserAction.setIcon({ path: {
      '16': `icon16-${enabled?'on':'off'}.png`,
      '64': `icon64-${enabled?'on':'off'}.png`,
      '128': `icon128-${enabled?'on':'off'}.png`
    }});
  });
});
