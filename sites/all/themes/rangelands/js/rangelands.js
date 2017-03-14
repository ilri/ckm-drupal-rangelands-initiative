(function(){
    CKEDITOR.on('instanceReady', function(e){
        var instance = e.editor;
        var rules = {
            indent : false,
            breakBeforeOpen : false,
            breakAfterOpen : false,
            breakBeforeClose : false,
            breakAfterClose : true
        };
        instance.dataProcessor.writer.setRules( 'p',rules);
        instance.dataProcessor.writer.setRules( 'div',rules);
    });
})();