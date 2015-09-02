'use strict'
var trackToPost = {};
var tags = [];

$('#tags-input').on('propertychange change keyup paste input', function(){
    var $value = $(this).val();
    if ($value.indexOf(',') !== -1){
      var tagArray = $value.split(',');
      $(this).val('');
      $(this).attr('placeholder', '');
      for (var i = 0; i < tagArray.length; i++){
        var tag = tagArray[i];
        if ((/\S/.test(tag)) && tags.indexOf(tag) === -1){
          tag.trim();
          tags.push(tag);
          $('.typed-tags').append('<span class="label label-primary"><button type="button" class="close" data-dismiss="label">×</button>' + tag + '</span>');
        };
      };
    };
});

document.addEventListener('DOMContentLoaded', function() {
  //chrome.pageAction.setIcon(icon_128_active.png);
      chrome.tabs.executeScript(null, {file: "jquery-2.1.1.min.js"});
      chrome.tabs.executeScript(null, {file: "content.js"});
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      trackToPost.url = activeTab.url;
      chrome.tabs.sendMessage(activeTab.id, {"message": "youtube"});
    });
      $('button').on('click', function(){
        var url = 'http://localhost:3000/tracks';
        $.post(url, {track: trackToPost});
      });

//split tags by commas
      $('#tags-input').on('propertychange change keyup paste input', function(){
          var $value = $(this).val();
          if ($value.indexOf(',') !== -1){
            var tagArray = $value.split(',');
            $(this).val('');
            $(this).attr('placeholder', '');
            for (var i = 0; i < tagArray.length; i++){
              var tag = tagArray[i];
              if ((/\S/.test(tag)) && tags.indexOf(tag) === -1){
                tag.trim();
                tags.push(tag);
                $('.typed-tags').append('<span class="label label-primary"><button type="button" class="close" data-dismiss="label">×</button>' + tag + '</span>');
              };
            };
          };
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

    //}
  }
);



















