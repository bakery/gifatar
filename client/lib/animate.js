Animate = {
    images : function(imgs, onComplete){
        var gif = new GIF({
                workers: 2,
                quality: 10
            }),
            imageWidth = ApplicationSettings.camera.width,
            imageHeight = ApplicationSettings.camera.height;

        gif.on('finished', function(blob) {
            if(typeof onComplete !== 'undefined'){
                onComplete({
                    url : URL.createObjectURL(blob)
                });
            }
        });

        _.each(imgs, function(i){
            gif.addFrame(i);
        });

        gif.render();
    }
};