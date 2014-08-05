Template.capture.created = function(){
    this.subCaptureImage = postal.subscribe({
        topic: 'capture-image',
        callback: function(data, envelope) {
            alert('must capture image');

            // do some advanced processing and come up with the pic

            setTimeout(function(){
                postal.publish({
                    topic: 'image-captured',
                    data : {
                        url : 'http://cs313618.vk.me/v313618360/6722/2rnMHMn7Swc.jpg'
                    }
                });
            }, 3000);

        }
    });
};

Template.capture.destroyed = function(){
    if(typeof this.subCaptureImage !== 'undefined'){
        this.subCaptureImage.unsubscribe();
    }
};