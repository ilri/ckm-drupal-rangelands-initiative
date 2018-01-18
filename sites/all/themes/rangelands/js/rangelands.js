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
    jQuery("body.page-contact form.contact-form").addClass("col-md-8 col-md-offset-2");
    jQuery("body.page-contact form.contact-form button").addClass("btn-primary");
});