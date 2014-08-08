Template.images.created = function(){
    
    Session.set('captured-images',[]);

    this.imageCapturedSub = postal.subscribe({
        topic : 'image-captured',
        callback : _.bind(function(imageData){
        
            var currentImages = Session.get('captured-images');
            currentImages.push(imageData);
            Session.set('captured-images', currentImages);

            var that = this;

            setTimeout(function(){
                Deps.afterFlush(_.bind(function() {
                    if(currentImages.length === Meteor.settings.public.framesPerGif){
                        
                        postal.publish({
                            topic : 'all-images-in'
                        });

                        Animate.images(this.$('img.original'), function(gif){
                            postal.publish({
                                topic : 'show-preview',
                                data : gif
                            });
                        });
                    }
                },that));
            }, 200);

        },this)
    });

    this.editorResetSub = postal.subscribe({
        topic : 'editor-reset',
        callback : function(){
            Session.set('captured-images', []);
        }
    });
};

Template.images.destroyed = function(){
    if(typeof this.imageCapturedSub !== 'undefined'){
        this.imageCapturedSub.unsubscribe();
    }

    if(typeof this.editorResetSub !== 'undefined'){
        this.editorResetSub.unsubscribe();
    }
};

Template.images.helpers({
    images : function(){
        var capturedImages = Session.get('captured-images');
        return  _.map(_.range(Meteor.settings.public.framesPerGif), function(i){
            return capturedImages.length > i ? 
                _.extend(capturedImages[i], { empty : false }) : { empty : true };
        });
    }
});