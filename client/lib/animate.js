Animate = {
    images : function(imgs, onComplete){
        var gif = new GIF({
                workers: 2,
                quality: 10
            }),
            imageWidth = Meteor.settings.public.camera.width,
            imageHeight = Meteor.settings.public.camera.height;

        var strToDataURL = function(str, contentType, opt_isBinary) {
            var isBinary = opt_isBinary != undefined ? opt_isBinary : true;
            if (isBinary) {
              return 'data:' + contentType + ';base64,' + self.btoa(str);
            } else {
              return 'data:' + contentType + ',' + str;
            }
        };

        gif.on('finished', function(blob) {
            if(typeof onComplete !== 'undefined'){
                var reader  = new FileReader();
                reader.onloadend = function () {
                    onComplete({
                        url : URL.createObjectURL(blob),
                        dataURL : reader.result
                    });
                };
                reader.readAsDataURL(blob);
            }
        });

        _.each(imgs, function(i){
            gif.addFrame(i);
        });

        gif.render();
    }
};