Gif = new Meteor.Collection('gifs', {
    schema: new SimpleSchema({
        url : {
            type: String,
            regEx: SimpleSchema.RegEx.Url
        }
    })
});