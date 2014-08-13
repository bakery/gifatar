Template.editor.rendered = function(){
    this.$('.panel').addClass('animated bounceInDown');
    
    var that = this;
    this.subCameraClick = postal.subscribe({
        topic: 'get-camera-stream',
        callback: function(){
            that.$('.start-here').addClass('transparent');
        }
    });
};

Template.editor.destroyed = function(){
    if(typeof this.subCameraClick !== 'undefined'){
        this.subCameraClick.unsubscribe();
    }
};
