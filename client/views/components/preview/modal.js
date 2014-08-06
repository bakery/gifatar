Template.previewModal.created = function(){
    this.subLaunchPreview = postal.subscribe({
        topic : 'show-preview',
        callback : _.bind(function(data){
            var preview = UI.renderWithData(Template.preview, data);
            this.$('.modal-body').html('');
            
            UI.insert(preview, this.$('.modal-body')[0]);
            this.$('.modal').modal().on('hidden.bs.modal', function (e) {
                postal.publish({
                    topic : 'editor-reset'
                });
            });

            console.log('posting', data.dataURL);
            console.log('size is', data.dataURL.length);

            this.data.dataURL = data.dataURL;

        },this)
    });
};

Template.previewModal.events({
    'click .btn-save' : function(e,template){

        template.$('button').attr('disabled','disabled');


        Meteor.call('saveGif', template.data.dataURL, function(error,gifId){
            if(!error){
                window.location.href = '/view/' + gifId;
            } else {
                alert('could not save the gif');
            }
        });
    }
});

Template.previewModal.destroyed = function(){
    if(typeof this.subLaunchPreview !== 'undefined'){
        this.subLaunchPreview.unsubscribe();
    }
};