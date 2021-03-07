chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    console.log(current_tab_info.url);
    if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
      chrome.tabs.insertHTML(null, { file: "./popup.html" });
      chrome.tabs.executeScript(null, { file: "./foreground.js" }, () =>
        console.log("i inject")
      );
      chrome.tabs.executeScript(null, { file: "./popup.js" }, () =>
        console.log("i inject")
      );
    }
  });
});
