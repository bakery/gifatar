Template.capture.created = function(){

    Session.set('image-preview-url', '');
    
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
    });

    this.subLaunchPreview = postal.subscribe({
        topic : 'show-preview',
        callback : _.bind(function(data){
            Session.set('image-preview-url', data.dataURL);
        },this)
    });

    this.subSaveGif = postal.subscribe({
        topic : 'save-gif',
        callback : _.bind(function(){

            var gifId = Meteor.uuid();

            Meteor.call('saveGif', {
                    _id : gifId,
                    dataURL : this.$('.preview').attr('src')
                },
                function(error,gifId){
                    if(!error){
                        Router.go('viewer', {id : gifId});
                    } else {
                        alert('could not save the gif');
                    }
                }
            );
        },this)
    });

    this.subEditorReset = postal.subscribe({
        topic : 'editor-reset',
        callback : function(){
            Session.set('image-preview-url','');
        }
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
    _.each([
                this.subLaunchPreview, 
                this.subCaptureImage, 
                this.subGetCameraStream,
                this.subSaveGif
            ],
            function(sub) {
                if(typeof sub !== 'undefined'){
                    sub.unsubscribe();
                }
            }
    );
};

Template.capture.helpers({
    cameraWidth : function(){
        return Meteor.settings.public.camera.width;
    },

    cameraHeight : function(){
        return Meteor.settings.public.camera.height;
    },

    previewUrl : function(){
        return Session.get('image-preview-url');
    },

    modeClass : function(){
        return Session.get('image-preview-url') ? 'preview-mode' : 'capture-mode';
    }
});