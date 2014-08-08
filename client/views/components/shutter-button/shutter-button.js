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
    }
});

Template.shutterButton.created = function(){
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
};

Template.shutterButton.destroyed = function(){
    _.each([this.subCameraActivated,this.subAllImagesIn, this.subResetImages],
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