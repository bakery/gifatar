Animate = {
    images : function(imgs){
        var gif = new GIF({
                workers: 2,
                quality: 10
            }),
            imageWidth = ApplicationSettings.camera.width,
            imageHeight = ApplicationSettings.camera.height;

        gif.on('finished', function(blob) {
            window.open(URL.createObjectURL(blob));
        });

        // var bigImages = _.map(imgs, function(i){
        //     return jQuery('img')
        //         .attr('width', imageWidth + 'px')
        //         .attr('height', imageHeight + 'px')
        //         .attr('src', $(i).attr('src'))[0];
        // });

        _.each(imgs, function(i){
            gif.addFrame(i);
        });

        gif.render();
    }
};