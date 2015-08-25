'use strict'
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // if (request.message === "youtube") {
    //     //console.log('content has received message');
    //     var $title = $('#eow-title').prop('title');
    // }
    var $title = $('#eow-title').prop('title');
    chrome.runtime.sendMessage({"message": "artist_and_title", "artistTitle": $title});
  }
);
