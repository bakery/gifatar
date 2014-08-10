Template.share.currentPageUrl = function(){
	return window.location.href;
};

Template.share.events({
	'click .btn-make' : function(){
		window.location.href = '/';
	},

	'click .btn-tweet' : function(){
		var shareUrl = 'https://twitter.com/share?url=' + 
			encodeURIComponent(window.location.href);

		window.open(shareUrl,"_blank",
			["width=400","height=300"].join(",")
		);
	}
});