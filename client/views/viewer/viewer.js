Template.viewer.rendered = function(){
	this.$('.panel').addClass('animated bounceInDown');
};

Template.viewer.imageUrl = function(){
    return this.gif.url || this.gif.dataURL;
};
