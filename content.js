'use strict'
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
        console.log('content has received message');
        var $title = $('#eow-title').prop('title');
    }
    chrome.runtime.sendMessage({"message": "open_new_tab", "artistTitle": $title});
  }
);
