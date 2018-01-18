(function ($) {
    Drupal.d3.ilri_publications = function (select, settings) {

        var container = "#" + settings.id;
        var baseUrl = 'https://dspacetest.cgiar.org/api/items?collection=1166';

        $(container).append("<div class='row'></div>");
        $("div.main-container h1.page-header").append(" <span id='loading'><i class='fa  fa-refresh fa-spin fa-fw'></i></span>");
        $(container).before(
            "<div class='form-container'>" +
            "<form id='publication-search'>" +
            "<div class='row'>" +
            "<div class='col-md-6 col-md-offset-3'>" +
            "<div class='input-group'>" +
            "<input id='title' type='text' class='form-control' placeholder='Search by title' data-namespace='dc' data-element='title'>" +
            "<span class='input-group-btn'>" +
            "<button id='search' class='btn btn-primary' type='submit'>Search</button>" +
            "<button id='clear' class='btn btn-default' type='button'>Clear</button>" +
            "</span>" +
            "</div>" +
            "<p class='text-center'>" +
            "<a id='advanced' href='#'>Advanced Options</a>" +
            "</p>" +
            "</div>" +
            "</div>" +
            "<div class='row advanced'>" +
            "<div class='col-md-3'>" +
            "<div class='form-group label-floating'>" +
            "<label for='author'><input type='radio' name='meta' value='author'> Author</label>" +
            "<input type='text' class='form-control' id='author' data-namespace='dc'  data-qualifier='author' data-element='contributor'>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-3'>" +
            "<div class='form-group label-floating'>" +
            "<label for='date'><input type='radio' name='meta' value='date'> Date</label>" +
            "<input type='text' class='form-control' id='date' data-namespace='dc'  data-qualifier='issued' data-element='date'>" +
            "<p class='help-block'>e.g. <em>2016-06-14, 2016-06, 2016</em></p>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-3'>" +
            "<div class='form-group label-floating'>" +
            "<label for='subject'><input type='radio' name='meta' value='subject'> Subject</label>" +
            "<input type='text' class='form-control' id='subject' data-namespace='cg'  data-qualifier='ilri' data-element='subject'>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-3'>" +
            "<div class='form-group label-floating'>" +
            "<label for='type'><input type='radio' name='meta' value='type'> Type</label>" +
            "<input type='text' class='form-control' id='type' data-namespace='dc' data-element='type'>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</form>" +
            "</div>" +
            "</div>"
        );

        $("button#clear").on("click", function (e) {
            e.preventDefault();

            $("#publication-search")[0].reset();
        });

        $("input").on("focus", function (e) {
            e.preventDefault();
            $('form input[type=radio][value=' + $(this).attr("id") + ']').attr('checked', true);
        });

        $("a#advanced").on("click", function (e) {
            e.preventDefault();

            if ($("#publication-search div.advanced").css("display") == 'block') {
                $("#publication-search div.advanced").slideUp();
            } else {
                $("#publication-search div.advanced").slideDown();
            }
        });

        $("form#publication-search").on('submit', function (e) {
            e.preventDefault();

            var query = getFormElementQuery($("form #title"));

            if ($('form input[type=radio]:checked').val()) {
                query = getFormElementQuery($("form #" + $('form input[type=radio]:checked').val()));
            }

            fetchItems(baseUrl + "?community=1" + query);
        });

        // Ajax request to get publications
        fetchItems(baseUrl + "?community=1");

        function fetchItems(url) {
            $("#loading").show();

            // Clear the container
            $(container + " .row div.item,  ul.pagination").remove();

            $.get(url, null, function (data) {

                data.items.forEach(function (item) {
                    // Insert the items to the container
                    // Title (linked to handle), Thumbnail, Category (Type), Date Issued,
                    $(container + " .row").append(
                        "<div class='item col-md-6'>" +
                        "<div class='clearfix'>" +
                        "<div class='col-md-4'>" +
                        "<img src='" + item.thumbnail + "' class='img-responsive' style='width: 100%;' />" +
                        "</div>" +
                        "<div class='item col-md-8'>" +
                        "<h5><a href='" + item.handle + "' target='_blank'>" + getTitle(item.metadata) + "</a></h5>" +
                        "<ul>" +
                        "<li><strong>Type:</strong> " + getType(item.metadata) + "</li>" +
                        "<li><strong>Authors:</strong> " + getAuthors(item.metadata) + "</li>" +
                        "<li><strong>Subjects:</strong> " + getSubjects(item.metadata) + "</li>" +
                        "<li><strong>Date Issued:</strong> " + getDateIssued(item.metadata) + "</li>" +
                        "</ul>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                    )
                    ;
                });

                // Generate pagination
                $(container).append(getPager(data.options));

                // Attach click event handler
                $("ul.pagination a").on("click", function (e) {
                    e.preventDefault();

                    var queryUrl = $(this).data('query');
                    fetchItems(queryUrl);
                });

                $("ul.pagination input").on("change keyup", function (e) {
                    e.preventDefault();

                    if (e.type == "change" || (e.type == "keyup" && e.keyCode == 13)) {
                        var queryUrl = $(this).data('query') + "&page=" + $(this).val();
                        fetchItems(queryUrl);
                    }
                });


                $("#loading").hide();
            }, 'json');
        }


        function getFormElementQuery(input) {
            var query = '';
            query += input.data("namespace") ? "&namespace=" + input.data("namespace") : "";
            query += input.data("qualifier") ? "&qualifier=" + input.data("qualifier") : "";
            query += input.data("element") ? "&element=" + input.data("element") : "";
            query += input.val() ? "&value=" + getQueryValueCase(input.val(), input.data("element")) : "";
            return query;
        }

        function getQueryValueCase(text, element) {
            return element == 'subject' ? text.toUpperCase() : text;
        }

        function getTitle(metadata) {
            var meta = _.find(metadata, function (metadatum) {
                return metadatum.namespace == 'dc' && metadatum.element == 'title' && metadatum.qualifier == null;
            });
            return meta ? meta.value : "No Title";
        }

        function getType(metadata) {
            var meta = _.find(metadata, function (metadatum) {
                return metadatum.namespace == 'dc' && metadatum.element == 'type' && metadatum.qualifier == null;
            });
            return meta ? meta.value : "Unavailable";
        }

        function getAuthors(metadata) {
            var authorsMeta = _.filter(metadata, function (metadatum) {
                return metadatum.namespace == 'dc' && metadatum.element == 'contributor' && metadatum.qualifier == 'author';
            });

            var meta = _.reduce(authorsMeta, function (memo, author) {
                return memo.length > 0 ? memo + ", " + author.value : author.value;
            }, "");

            return meta ? meta : "Unavailable";
        }

        function getSubjects(metadata) {
            var authorsMeta = _.filter(metadata, function (metadatum) {
                return metadatum.namespace == 'cg' && metadatum.element == 'subject' && metadatum.qualifier == 'ilri';
            });

            var meta = _.reduce(authorsMeta, function (memo, author) {
                return memo.length > 0 ? memo + ", " + author.value : author.value;
            }, "");

            return meta ? meta : "Unavailable";
        }

        function getDateIssued(metadata) {
            var meta = _.find(metadata, function (metadatum) {
                return metadatum.namespace == 'dc' && metadatum.element == 'date' && metadatum.qualifier == 'issued';
            });
            return meta ? meta.value : "Unavailable";
        }

        function getPager(options) {
            var pager = "<div class='text-center'><ul class='pagination'>";

            if (options.current_page > 1) {
                pager += "<li><a href='#' data-query='" + getPagingQuery(options) + "'><i class='fa fa-arrow-left'></i></a></li>";
            }

            var placeHolder = "Page " + options.current_page + " of " + options.total_pages;
            pager += "<li><input type='number' max='" + options.total_pages + "' placeholder='" + placeHolder + "' data-query='" + getCurrentPageQuery(options) + "'></input></li>";

            if (options.current_page < options.total_pages) {
                pager += "<li><a href='#' data-query='" + getPagingQuery(options, true) + "'><i class='fa fa-arrow-right'></i></a></li>";
            }

            pager += "</ul></div>";

            return pager;
        }

        function getCurrentPageQuery(options) {
            var params = $.param(options.params);
            return baseUrl + "?" + params;
        }

        function getPagingQuery(options, next) {
            var params = $.param(options.params);
            var page = params.length ? "&page=" : "page=";
            return next ? baseUrl + "?" + params + page + (options.current_page + 1) :
                baseUrl + "?" + params + page + (options.current_page - 1)
        }

    };
})(jQuery);
