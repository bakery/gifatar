Template.capture.created = function(){
    
    var template = this;

    this.subGetCameraStream = postal.subscribe({
        topic: 'get-camera-stream',
        callback: function(){
            Camera.getStream(
                _.bind(Template.capture.onGotCameraStream,template),
                function(error) {
                    alert('something went terribly wrong. sorry');
                }
            );
        }
    });

    this.subCaptureImage = postal.subscribe({
        topic: 'capture-image',
        callback: _.bind(Template.capture.onCaptureImageRequest,this)

        // function(data, envelope) {
        //     alert('must capture image');

        //     // do some advanced processing and come up with the pic

        //     setTimeout(function(){
        //         postal.publish({
        //             topic: 'image-captured',
        //             data : {
        //                 url : 'http://cs313618.vk.me/v313618360/6722/2rnMHMn7Swc.jpg'
        //             }
        //         });
        //     }, 3000);

        // }
    });
};

Template.capture.onGotCameraStream = function(stream){
    
    postal.publish({
        topic : 'camera-activated'
    });

    this.__cameraStream = stream;

    var video = this.$('video')[0];
    if (window.URL) {
        video.src = window.URL.createObjectURL(stream);
    } else {
        video.src = stream; // Opera support.
    }
};

Template.capture.onCaptureImageRequest = function(){
    var video = this.$('video')[0],
        canvas = this.$('canvas')[0],
        ctx = canvas.getContext('2d'),
        width = Meteor.settings.public.camera.width, 
        height = Meteor.settings.public.camera.height;

    if (this.__cameraStream) {
        // Draw whatever is in the video element on to the canvas.
        ctx.drawImage(video, 0, 0, width, height);  
        // Create a data url from the canvas image.
        dataURL = canvas.toDataURL('image/png');
    
        console.log('frame data url', dataURL);

        postal.publish({
            topic: 'image-captured',
            data : { url : dataURL }
        });
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
        return Meteor.settings.public.camera.width;
    },

    cameraHeight : function(){
        return Meteor.settings.public.camera.height;
    }
});