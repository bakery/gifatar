Gif = new Meteor.Collection('gifs', {
    schema: new SimpleSchema({
        url : {
            type: String,
            regEx: SimpleSchema.RegEx.Url,
            optional: true
        },

        dataURL : {
            type: String
        }
    })
});

Gif.after.insert(function (userId, doc) {
    if(Meteor.isServer){
        var gifUrl = Uploader.upload(doc.dataURL);
        Gif.update(doc._id, { $set : {
                    url : gifUrl
                }
        });
    }
});