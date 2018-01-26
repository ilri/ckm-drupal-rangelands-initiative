(function ($) {
    $(document).ready(function () {
        $("div.focus").on("mouseenter", function (e) {
            $(this).find("p")
                .addClass("focused")
                .slideDown();
        });
        $("div.focus").on("mouseleave", function (e) {
            $(this).find("p")
                .removeClass("focused")
                .slideUp();
        });
        $("div#main-nav ul.nav.navbar-nav li a").each(function () {
            var desc = $(this).attr("title");
            $("<span class='desc'>" + desc + "</span>").appendTo($(this));
            $(this).attr("title", "");
        });
        $("body.page-contact form.contact-form").addClass("col-md-8 col-md-offset-2");
        $("body.page-contact form.contact-form button").addClass("btn-primary");
    });
})(jQuery);