Template.shutterButton.events({
    'click .get-camera' : function(){
        
        console.log('getting stream');

        postal.publish({
            topic : 'get-camera-stream'
        });
    },

    'click .get-pic' : function(){
        postal.publish({
            topic : 'capture-image',
            data : {
                mode: 'manual'
            }
        });
    },

    'click .save-gif' : function(e, template){
        template.$('.save-gif').attr('disabled','disabled');
        template.$('.reset').attr('disabled','disabled');

        postal.publish({ topic : 'save-gif' });
    },

    'click .reset' : function(){
        Session.set('shutter-preview-mode', false);
        postal.publish({ topic : 'editor-reset' });
    }
});

Template.shutterButton.created = function(){
    Session.set('shutter-preview-mode', false);
    Session.set('shutter-is-camera-active',false);
    Session.set('can-take-pictures',false);

    this.subCameraActivated = postal.subscribe({
        topic : 'camera-activated',
        callback : function(){
            Session.set('shutter-is-camera-active',true);
            Session.set('can-take-pictures',true);
        }
    });

    this.subAllImagesIn = postal.subscribe({
        topic : 'all-images-in',
        callback : function(){
            Session.set('can-take-pictures',false);
        }
    });

    this.subResetImages = postal.subscribe({
        topic : 'editor-reset',
        callback : function(){
            Session.set('can-take-pictures',true);
        }
    });

    this.subLaunchPreview = postal.subscribe({
        topic : 'show-preview',
        callback : _.bind(function(data){
            Session.set('shutter-preview-mode', true);
        },this)
    });
};

Template.shutterButton.destroyed = function(){
    _.each([
            this.subCameraActivated,
            this.subAllImagesIn,
            this.subResetImages,
            this.subLaunchPreview
        ],
        function(sub){
            if(typeof sub !== 'undefined'){
                sub.unsubscribe();
            }
        }
    );
};

Template.shutterButton.isCameraActive = function(){
    return Session.get('shutter-is-camera-active');
};

Template.shutterButton.canTakePictures = function(){
    return Session.get('can-take-pictures');
};

Template.shutterButton.previewMode = function(){
    return Session.get('shutter-preview-mode');
};

