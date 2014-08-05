Template.images.created = function(){
    
    Session.set('captured-images',[]);

    this.imageCapturedSub = postal.subscribe({
        topic : 'image-captured',
        callback : function(){
            alert('images got a captured image');

            var currentImages = Session.get('captured-images');
            currentImages.push({});
            Session.set('captured-images', currentImages);

            if(currentImages.length === 4){
                alert('done with all the images. making gif now');
            }
        }
    });
};

Template.images.destroyed = function(){
    if(typeof this.imageCapturedSub !== 'undefined'){
        this.imageCapturedSub.unsubscribe();
    }
};