Template.viewer.rendered = function(){
	this.$('.panel').addClass('animated bounceInDown');
};

Template.viewer.imageUrl = function(){
    return this.gif ? this.gif.url || this.gif.dataURL : null;
};

Template.viewer.events({
	'click .btn-make' : function(e, template){
		template.$('.panel').addClass('animated bounceOutUp');
		Router.go('editor');
	},

	'click .btn-tweet' : function(){
		var shareUrl = 'https://twitter.com/share?url=' + 
			encodeURIComponent(window.location.href);

		window.open(shareUrl,"_blank",
			["width=400","height=300"].join(",")
		);
	}
});