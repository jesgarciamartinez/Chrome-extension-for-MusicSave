'use strict'
var trackToPost = {};

document.addEventListener('DOMContentLoaded', function() {
  //chrome.pageAction.setIcon(icon_128_active.png);
      chrome.tabs.executeScript(null, {file: "jquery-2.1.1.min.js"});
      chrome.tabs.executeScript(null, {file: "content.js"});
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      trackToPost.url = activeTab.url;
      chrome.tabs.sendMessage(activeTab.id, {"message": "youtube"});
    });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // if( request.message === "artist_and_title" ) {
      var $title = request.artistTitle;
      var artist;
      var title;
      if ($title.indexOf('-') !== -1){
        artist = $title.slice(0, $title.indexOf('-')).trim();
        title = $title.slice($title.indexOf('-') + 1).trim();
      }
      else{
        artist = '';
        title = $title.trim();
      }
      trackToPost.artist = artist;
      trackToPost.title = title;
      $('button').attr('disabled', false);
      $('h1').text(artist + ' - ' + title);
      $('button').on('click', function(){
        var url = 'http://localhost:3000/tracks';
        $.post(url, {track: trackToPost});
      });
    //}
  }
);

















