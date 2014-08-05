Template.images.created = function(){
    
    Session.set('captured-images',[]);

    this.imageCapturedSub = postal.subscribe({
        topic : 'image-captured',
        callback : function(imageData){
            //alert('images got a captured image');

            var currentImages = Session.get('captured-images');
            currentImages.push(imageData);
            Session.set('captured-images', currentImages);

            // if(currentImages.length === ApplicationSettings.framesPerGif){
            //     alert('done with all the images. making gif now');
            // }
        }
    });
};

Template.images.destroyed = function(){
    if(typeof this.imageCapturedSub !== 'undefined'){
        this.imageCapturedSub.unsubscribe();
    }
};

Template.images.helpers({
    images : function(){
        return Session.get('captured-images');
    }
});