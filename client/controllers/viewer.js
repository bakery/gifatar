ViewerController = RouteController.extend({
    waitOn: function () {
        return Meteor.subscribe('gifById', this.params.id);
    },

    data: function () {

    	console.log('got data', Gif.findOne({ _id : this.params.id }));

        return {
            gif : Gif.findOne({ _id : this.params.id })
        };
    }
});