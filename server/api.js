Meteor.methods({
    saveGif : function(gif){
        return Gif.insert(gif);
    }
});