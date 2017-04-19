//
// Youtube
//

var videoWidth,
    state;

YouTubeIframeLoader.load(function(YT) {

    videoWidth = $(window).width();

    player = new YT.Player('player', {
      height: videoWidth * 9 / 16 ,
      width: videoWidth,
      playerVars: {
        'color' : 'white',
        'controls' : 0,
        'showinfo' : 0,
        'rel' : 0
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  });

});

function onPlayerReady(event) {
  console.log('ready for use');
  // event.target.playVideo();
}

function onPlayerStateChange(event) {
  state = player.getPlayerState();
}

resizeVideo = function() {
  videoWidth = $(window).width();
  player.setSize( videoWidth , videoWidth * 9 / 16 );
  $('#player').css({
    "margin-top" : ($(window).height() - (videoWidth * 9 / 16) ) / 2,
  });
}
