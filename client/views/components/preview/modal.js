Template.previewModal.created = function(){
    this.subLaunchPreview = postal.subscribe({
        topic : 'show-preview',
        callback : _.bind(function(data){
            var preview = UI.renderWithData(Template.preview, data);
            this.$('.modal-body').html('');
            UI.insert(preview, this.$('.modal-body')[0]);
            this.$('.modal').modal();

            console.log('posting', data.dataURL);
            console.log('size is', data.dataURL.length);

            Meteor.call('saveGif', data.dataURL, function(error,data){
                if(!error){
                    alert('all good ' + data);
                } else {
                    alert('could not save the gif');
                }
            });

        },this)
    });
};

Template.previewModal.destroyed = function(){
    if(typeof this.subLaunchPreview !== 'undefined'){
        this.subLaunchPreview.unsubscribe();
    }
};