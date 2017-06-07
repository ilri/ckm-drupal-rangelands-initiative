(function () {
    // CKEDITOR.on('instanceReady', function(e){
    //     var instance = e.editor;
    //     var rules = {
    //         indent : false,
    //         breakBeforeOpen : false,
    //         breakAfterOpen : false,
    //         breakBeforeClose : false,
    //         breakAfterClose : true
    //     };
    //     instance.dataProcessor.writer.setRules( 'p',rules);
    //     instance.dataProcessor.writer.setRules( 'div',rules);
    // });


})();
jQuery(document).ready(function () {
    jQuery("div.focus").on("mouseenter", function (e) {
        jQuery(this).find("p")
            .addClass("focused")
            .slideDown();
    });
    jQuery("div.focus").on("mouseleave", function (e) {
        jQuery(this).find("p")
            .removeClass("focused")
            .slideUp();
    });
    jQuery("div#main-nav ul.nav.navbar-nav li a").each(function () {
        var desc = jQuery(this).attr("title");
        jQuery("<span class='desc'>" + desc + "</span>").appendTo(jQuery(this));
        jQuery(this).attr("title", "");
    });
});