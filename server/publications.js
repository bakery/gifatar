Meteor.publish('gifById', function(id){
	console.log('publishing', id);
	return Gif.find({ _id : id });
});