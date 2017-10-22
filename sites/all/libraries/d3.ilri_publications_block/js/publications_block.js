(function ($) {
    Drupal.d3.ilri_publications_block = function (select, settings) {

        var container = "#" + settings.id;
        var baseUrl = 'https://dspacetest.cgiar.org/api/items';
        var metaFilter = getMetaFilter(settings.rows[0]);

        $(container).append("<div class='row'></div>");
        $("div#publications-block h2.pane-title").append(" <span id='loading'><i class='fa  fa-refresh fa-spin fa-fw'></i></span>");

        // Ajax request to get publications
        fetchItems(baseUrl + "?community=1&limit=3" + metaFilter);

        function fetchItems(url) {
            $("#loading").show();

            // Clear the container
            $(container + " .row div.item,  ul.pagination").remove();


            $.get(url, null, function (data) {

                data.items.forEach(function (item) {
                    // Insert the items to the container
                    // Title (linked to handle), Thumbnail, Category (Type), Date Issued,
                    $(container + " .row").append(
                        "<div class='item col-md-4'>" +
                        "<div class='clearfix'>" +
                        "<h5><a href='" + item.handle + "' target='_blank'>" + getTitle(item.metadata) + "</a></h5>" +
                        "<div class='col-md-6 no-padding'>" +
                        "<img src='" + item.thumbnail + "' class='img-responsive' style='width: 100%;' />" +
                        "</div>" +
                        "<div class='item col-md-6'>" +
                        "<p>" + getType(item.metadata) + "</p>" +
                        "<p>" + getAuthors(item.metadata) + "</p>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                    )
                    ;
                });


                $("#loading").hide();
            }, 'json');
        }

        function getMetaFilter(termData) {
            var vocabulary = termData[0];
            var term = termData[1].toUpperCase();
            var filter = '';

            switch (vocabulary) {
                case 'Country focus':
                    filter = '&namespace=cg&qualifier=country&element=coverage&value=' + term;
                    break;
                case 'Region focus':
                    filter = '&namespace=cg&qualifier=region&element=coverage&value=' + term;
                    break;
                case 'Subject Categories':
                    filter = '&namespace=cg|dc&qualifier=ilri&element=subject|subject&value=' + term;
                    break;
                default:
                    filter = '';
            }

            return filter;
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
    };
})(jQuery);
