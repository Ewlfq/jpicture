(function ($) {
    'use strict';
    
    // this obj is only used if the user element is not a img
    var  imgCSS = { 
        'background-repeat': 'no-repeat',
        'background-size': 'contain'
    },
    
    callback = undefined,
    
    checkType = function (elem, type) {
        if (Object.prototype.toString.call(elem) === '[object ' + type + ']') {
            return true;
        }
        return false;
    },
    
    findMatchingWidth = function (picList, width) {
        var minDiff = Infinity,
            retVal,
            retKey;
            
        for (var key in picList) {
            if (picList.hasOwnProperty(key)) {
                if (Math.abs(picList[key] - width) < minDiff){
                    minDiff = Math.abs(picList[key] - width);
                    retVal = picList[key];
                    retKey = key;
                }
            }
        }
        
        return { 
            width: retVal, 
            key: retKey
        };
    },
        
    // This function fetches the image through ajax. In case of an none img
    // element it also checks if the height is 0. If it is 0 it resizes the 
    // none img element to the height of the picture
    fetchImg =  function (elem, url) {  
        var useImg = function (img, url) {
            img.attr('src', url);    
        }, 
        
        useDiv = function (img, url) {
            var height = img.height(),
                // We need this image obj to get the height
                loadImg = new Image(); 
                
            loadImg.onload = function() {
                imgCSS.backgroundImage = 'url(' + url + ')';
                
                if (height === 0) {
                    imgCSS.height = this.height;
                }
                
                img.css(imgCSS);
            }  
            loadImg.src = url;     
        };
        
        $.ajax({
            url: window.location.href,
          	cache: true,
   	 		processData : false,
		}).always(function () {
            if (elem.tagName === 'IMG') {
                useImg($(elem), url);
            } else {
                useDiv($(elem), url);    
            }
            
            // Pass the picture element to the callback function. 
            // Therefore the user can modify the picture through the callback.
            if(callback !== undefined){
                callback(elem);
            }
		});
    }, 
    
    main = function (pic) {
        var elemWidth = $(pic).width(),
            picProperties = findMatchingWidth(picList, elemWidth);
        
        fetchImg(pic, picProperties.key);
    };
    
    // Basic plugin structure starts to fetch all class elements or a single 
    // id element and passes them to main. Error gets throw if passed parameter
    // is not a object.
    //
    // @param picList : object, key is url, val is width
    // @param p1 : is either a function or a object
    // @param p2 : function, if p2 is used is has to be a function
    $.fn.jp = function (picList, p1, p2) {
        // First optional parameter is a callback
        if(checkType(p1, 'Function')){
            callback = p1; 
        } 
        // First optional parameter is a object
        if(checkType(p1, 'Object')){
            imgCSS = { // reset the obj because it is in jQuery scope
                'background-repeat': 'no-repeat',
                'background-size': 'contain'
            };
            imgCSS = $.extend( {}, imgCSS, p1);
        }   
        // First optional parameter is object and the second one is a callback
        if(checkType(p2, 'Function')){
            callback = p2; 
        } 
        
        if (checkType(picList, 'Object')) {          
            this.each(function() { 
                main(this); 
            });
        } else {
            console.log('Object of type [object Object] expected, object of type ' + Object.prototype.toString.call(picList) + ' given.'); 
        }
        
        return this;
    };
}(jQuery));