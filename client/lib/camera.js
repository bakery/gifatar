Camera = {
    getStream : function(onReady, onError){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || 
            navigator.mozGetUserMedia || navigator.msGetUserMedia;

        // Check for getUserMedia support.
        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                video: true
            }, onReady, onError);
        } else {
            onError.call();
        }
    }
};



      
      // Check if window contains URL object.
      // window.URL = window.URL || window.webkitURL;
      
      