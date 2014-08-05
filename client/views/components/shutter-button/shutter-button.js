Template.shutterButton.events({
    'click .get-camera' : function(){
        Camera.getStream(
            function(stream){
                postal.publish({
                    topic : 'get-camera-stream'
                });
            },
            function(error) {
                alert('something went terribly wrong. sorry');
            }
        );
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