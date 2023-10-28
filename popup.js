document.addEventListener("DOMContentLoaded", function() {
  chrome.runtime.connect({ name: "content-script" });

  chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message) {
      if (message.highlightedText) {
        document.getElementById("highlightButton").style.display = "block";
      } else {
        document.getElementById("highlightButton").style.display = "none";
      }
    });
  });

  document.getElementById("highlightButton").addEventListener("click", function() {
    // Handle the highlighted text here
    // Example: send the highlighted text to a server or process it in some way
    console.log("Highlighted Text: " + highlightedText);
  });
});
