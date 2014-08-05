Template.shutterButton.events({
    'click button' : function(){
        postal.publish({
            topic : 'capture-image',
            data : {
                mode: 'manual'
            }
        });
    }
});