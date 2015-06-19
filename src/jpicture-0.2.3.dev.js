// version 0.2.3
// License: The MIT License (MIT)
(function ($) {
    'use strict';

    // @param picList : object, key is url, val is width
    // @param p1 : is either a function or an object
    // @param p2 : function, if p2 is used it has to be a function  
    $.fn.jp = function (picList, p1, p2) {
         
    return this.each(function () {
                
        // this obj stores all css properties
        var containerCSS = { 
            'background-repeat': 'no-repeat',
            'background-size': 'cover'
        },
        
        // this obj stores all properties
        containerProp = {
            enableZoom : true,
            orientationChange : true,
            lastPicture : undefined,
            callback : null
        },
    
        checkType = function (elem, type) {
            if (Object.prototype.toString.call(elem) === '[object ' + type + ']') {
                return true;
            }
            return false;
        },
    
        findMatchingWidth = function (picList, width) {
            var minDiff = Infinity,
                retVal = 0,
                retKey = '';
            
            for (var key in picList) {
                if (picList.hasOwnProperty(key)) {
                    if (Math.abs(picList[key] - width) < minDiff) {
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
    
        // this calucates the growing or shrink height of the elment 
        // otherwise it would take height of the picture
        calcResizingRatio = function (picWidth, containerWidth, height) { 
            return height * (1 + ((containerWidth - picWidth) / picWidth)); 
        },
        
        // a little animation to, make the loading smoother
        animatePicutreLoad = function (container, fun) {
            $(container).fadeOut('middle', function () {
                fun();
                $(container).fadeIn('middle');
            });
        },
        
        // This function fetches the image through ajax. In case of a non-img
        // element it also checks if the height is 0. If it is 0 it resizes the 
        // non-img element to the height of the picture
        fetchImg =  function (container, imgProp, containerWidth) {  
            var useImg = function (imgTag, url) {
                animatePicutreLoad(imgTag, function () {
                   imgTag.attr('src', url);  
                });
            }, 
            // container is the non-img tag
            useDiv = function (container, url) {
                var loadImg = new Image(); // We need this image obj to get the height 
            
                // this is a critical part, the div picture is not always the same size as the img tag 
                // it is also very important to check dynamic heights, like navi pictures,
                // those get a predefined height of their inside elements example: oliverj.net 
                loadImg.onload = function() {
                    containerCSS.backgroundImage = 'url(' + url + ')';
                    containerCSS.height = calcResizingRatio(loadImg.width, $(container).width(), loadImg.height);
                    
                    animatePicutreLoad(container, function () {
                        container.css(containerCSS);
                    });
                };
                loadImg.src = url;     
            };
            
            $.ajax({
                url: window.location.href,
              	cache: true,
       	 		processData : false
    		}).always(function () {
                if (container.tagName === 'IMG') {
                    useImg($(container), imgProp.key);
                } else {
                    useDiv($(container), imgProp.key);    
                } 
                // Pass the picture element to the callback function. 
                // Therefore the user can modify the picture through the callback.
                if(containerProp.callback){
                    containerProp.callback(container);
                }
                // Store last picture url, so we do not have to reload
                // the same picture while resizing
                container.lastPicture = imgProp.key;
    		});
        }, 
    
        onZoom = function (container, picList) {
            $(window).resize(function () {
                main(container, picList);
            });
        },
    
        onOrientationChange = function (container, picList) {
            // TODO: reimplement orientationChange
        },
    
        main = function (container, picList) {
            var containerWidth = $(container).width(),
                imgObj = findMatchingWidth(picList, containerWidth);
            
                // TODO: fix
            if (true) {
                fetchImg(container, imgObj, containerWidth);   
            }
        }, 
    
        initParameters = function (container, picList, p1, p2) {            
            // First optional parameter is a callback
            if (checkType(p1, 'Function')) {
                containerProp.callback = p1; 
            } 
            // First optional parameter is a object
            if (checkType(p1, 'Object')) {
                containerProp = $.extend( {}, containerCSS, p1);
            
                // First optional parameter is object and the second one is a callback
                if (checkType(p2, 'Function')) {
                    containerProp.callback = p2; 
                }
            }   
            // optional parameter for enabling/disabling Zoom, default on
            if (containerProp.enableZoom) {
                onZoom(container, picList);
            }
            // optional parameter for orientationChange, default on
            if (containerProp.orientationChange) {
                onOrientationChange(container, picList);
            }
        };
                
        initParameters(this, picList, p1, p2);
        main(this, picList); 
        
        return this;
    });
};
}(jQuery));