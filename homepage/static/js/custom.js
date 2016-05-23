/* ======= Custom js ======= */
jQuery(document).ready(function ($) {
    'use strict';

    function loadFBGP() {
        /* Facebook */
        if (window.location.pathname.length > 1) {
            return;
        }
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        /* Google +1 */
        window.___gcfg = {
          lang: 'en-US',
          parsetags: 'onload'
        };
        (function() {
            var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
            po.src = 'https://apis.google.com/js/plusone.js?onload=onLoadCallback';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
        })();
    }
    loadFBGP();

    function resizeImages() {
        var pImgs = $('.features .content p img');
        pImgs.removeAttr('style');
        var pWidth = $('.features .content p').width();
        pImgs.each(function(i, el) {
            if ( pWidth < $(this, el).width() ) {
                $(this, el).css('width', pWidth);
            }
        });
    }
    resizeImages();

    $(window).resize(resizeImages);

    $( "div.watch-video").click(function () {
        // get parent block
        var parentBlock = $( this ).parent().parent().parent().next();
        // get width and height of parent block
        var width = parentBlock.width();
        var height = Math.floor(width * 0.5625);
        // hide image
        parentBlock.find( "img.image" ).hide();
        // show video
        var vid = parentBlock.find( "iframe.youtube-video");
        vid.prop("src", function () {
            return $( this ).data("src");
        });
        vid.prop("width", width);
        vid.prop("height", height);
        vid.show();

        // disable link from being clicked again
        $( this ).prop("disabled", true);

    });
});
