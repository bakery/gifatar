Meteor.startup(function(){
    var settings = Meteor.settings.private || {};
    if(typeof settings.s3 === 'undefined'){
        console.error('Application settings are not valid');
    }
});