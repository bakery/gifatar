Template.capture.created = function(){
    
    var template = this;

    this.subGetCameraStream = postal.subscribe({
        topic: 'get-camera-stream',
        callback: function(){
            Camera.getStream(
                _.bind(Template.capture.onGotCameraStrem,template),
                function(error) {
                    alert('something went terribly wrong. sorry');
                }
            );
        }
    });

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

Template.capture.onGotCameraStrem = function(stream){
    var video = this.$('video')[0];

    if (window.URL) {
        video.src = window.URL.createObjectURL(stream);
    } else {
        video.src = stream; // Opera support.
    }
};

Template.capture.destroyed = function(){
    if(typeof this.subCaptureImage !== 'undefined'){
        this.subCaptureImage.unsubscribe();
    }

    if(typeof this.subGetCameraStream !== 'undefined'){
        this.subGetCameraStream.unsubscribe();
    }
};

Template.capture.helpers({
    cameraWidth : function(){
        return ApplicationSettings.camera.width;
    },

    cameraHeight : function(){
        return ApplicationSettings.camera.height;
    }
});