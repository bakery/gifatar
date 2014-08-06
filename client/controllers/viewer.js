ViewerController = RouteController.extend({
    waitOn: function () {
        return Meteor.subscribe('gifById', this.params.id);
    },

    data: function () {
        return {
            gif : Gif.findOne({ _id : this.params.id })
        };
    }
});