HSRS = {
    IMAGE_LOCATION: "./imgs/"
};

HSRS.formatSize = function(filesize) {
                        var suffix;
                        var div;

                        if (filesize >= 1073741824) {
                            div = 1073741824;
                            suffix = "Gb";
                        }
                        else if (filesize >= 1048576) {
                            div = 1048576;
                            suffix = "Mb";
                        } 
                        else if (filesize >= 1024) {
                            div = 1024;
                            suffix = "Kb";
                        }
                        else {
                            div = 1;
                            suffix ="b";
                        }
                        filesize = Math.round((filesize/div*100))/100;
                        filesize = String(filesize)+" "+suffix;
                        return filesize;
};

HSRS.timer  = function(call,scope){ 

  var callme = call;
  var mescope = scope;

  function timoutFunc() {
      callme.apply(mescope,[]);
  }

  this.pause = function() {
    setTimeout(timoutFunc, 500);
  };
}; 

HSRS.getUrlParams = function( url ) {
    var params = {}, queries, temp, i, l;
    var queryString = url.substring( url.indexOf('?') + 1 );

    // Split into key/value pairs
    queries = queryString.split("&");
 
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
 
    return params;
};


if (!('map' in Array.prototype)) {
    Array.prototype.map= function(mapper, that /*opt*/) {
        var other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= mapper.call(that, this[i], i, this);
        return other;
    };
}

