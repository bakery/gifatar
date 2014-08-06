Meteor.methods({
    saveGif : function(dataURL){
        var uploadAndCreate = function(callback){
            var client = Knox.createClient({
                key: 'AKIAI7TDTETXZKFI5XYQ',
                secret: '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',
                bucket: 'gifatar'
            });

            var crypto = Npm.require('crypto');
            var md5sum = crypto.createHash('md5');
            md5sum.update(new Date().toString());

            function decodeBase64Image(dataString) {
              var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};

              if (matches.length !== 3) {
                return new Error('Invalid input string');
              }

              response.type = matches[1];
              response.data = new Buffer(matches[2], 'base64');

              return response;
            }

            var imageBuffer = decodeBase64Image(dataURL);
            var req = client.put(md5sum.digest('hex') + '.gif', {
                'Content-Length': imageBuffer.data.length,
                'Content-Type': imageBuffer.type,
                'x-amz-acl': 'public-read'
            });
            req.on('response', Meteor.bindEnvironment(function(res){
              if (200 == res.statusCode) {
                console.log('saved to %s', req.url);

                callback(null,Gif.insert({ url : req.url }));
                
              } else {
                // TODO: handle errors
              }
            }));

            req.end(imageBuffer.data);
        };

        var uploadAndCreateSynced = Meteor._wrapAsync(uploadAndCreate);

        var result;
        try{
            result = uploadAndCreateSynced();
        }catch(e){
            console.log("getData method returned error : " + e);
        }finally{
            return result;
        }
    }
});