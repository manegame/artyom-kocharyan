(function () {

    "use strict";

    // global variables
    global.player;

    global.YouTubeIframeLoader =     require('youtube-iframe');

    window.$                =     require("jquery"),
    window.jQuery           =      $;
                                  require("jquery-ui-dist/jquery-ui.js");
                                  require('./_youtube.js');



    $(function () {

      var name = "Artyom Kocharyan";
      name.split('');
      // $('.dot').each(function (index){
      //   $(this).find('p').text(name[index]);
      // });

      $('.dot').on('click', function () {
          //
      });

      $(window).on('resize', function(){
        resizeVideo()  
      });

      $('#collapse').on('click', function () {
          var txt = $(this);
          var nav = $(this).parents('.nav')
          nav.toggleClass('collapsed');
          if(txt.text() === '+') {
            txt.text('-');
          } else {
            txt.text('+');
          }

      });

      $('a').on('click', function(e) {
        player.cueVideoById('HDvTqWKWukc');
        player.playVideo();
        console.log('aahajhagajhg');
        $('.grid').css({
          'background-color' : 'rgba(196, 196, 196, 0.14)'
        });
      });

    });

}());
