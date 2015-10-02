'use strict'
var trackToPost = {};
var tags = [];

document.addEventListener('DOMContentLoaded', function() {
    //chrome.pageAction.setIcon(icon_128_active.png);
    chrome.tabs.executeScript(null, {file: "jquery-2.1.1.min.js"});
    chrome.tabs.executeScript(null, {file: "content.js"});

    //push tags, split them by commas, display them

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
                    $('.typed-tags').append('<span id="' + tag + '">' + tag + '<button type="button" class="closes">×</button></span>');
                };
            };
        };
    });

    // remove tag when 'x' button is clicked

    $('.typed-tags').on('click', '.closes' ,function(){
        var tag = $(event.target).closest('span');
        tag.remove();
        tags.splice(tags.indexOf(tag.attr('id')), 1);

    });

    //post trackToPost and tags when clicking save

    $('#save').on('click', function(){
        var url = 'http://localhost:3000/tracks';
        $.post(url, {track: trackToPost});
    });

    //get current tab url, send message to content script

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        trackToPost.url = activeTab.url;
        chrome.tabs.sendMessage(activeTab.id, {"message": "youtube"});
    });
});

//process message to get artist and title, enable save button

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
        $('#save').attr('disabled', false);
        $('h1').text(artist + ' - ' + title);

        //}
    }
);



















