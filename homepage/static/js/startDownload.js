'use strict';
jQuery(document).ready(function () {
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    sleep(2000).then(() => {
        // Do something after the sleep!
        document.location.assign($( "#download-link").attr('href'));
    });
});
