Template.shutterButton.events({
    'click button' : function(){
        Camera.getStream(
            function(stream){
                // postal.publish({
                //     topic : 'capture-image',
                //     data : {
                //         mode: 'manual'
                //     }
                // });

                postal.publish({
                    topic : 'get-camera-stream'
                });                
            },
            function(error) {
                alert('something went terribly wrong. sorry');
            }
        );
    }
});