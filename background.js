let highlightedText = "";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "highlightText") {
    highlightedText = request.text;
  }
});

chrome.runtime.onConnect.addListener(function(port) {
  port.postMessage({ highlightedText: highlightedText });
});
