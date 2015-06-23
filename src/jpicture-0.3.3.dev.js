// version: 0.3.3
(function ($, win) {
    'use strict';

    // @param picList : object, key is url, val is width
    // @param p1 : is either a function or an object
    // @param p2 : function, if p1 is used it has to be a function  
    $.fn.jp = function (picList, p1, p2) {
         
    return this.each(function () {
                
        // this obj stores all css properties.
        var containerCSS = { 
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover',
            'display' : 'block', /* omfg I am scared */
            enableZoom : true,
            orientationChange : true
        },
        
        // this obj stores all properties.
        containerProp = {
            callback : null,
            animationSpeed: 'fast',
            lastPicture : {
                height : 0, // at the moment not needed.
                width : 0
            } 
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
        
        cacheWandH = function (w, h) {
            containerProp.lastPicture.width = w;
            containerProp.lastPicture.height = h;
        },
    
        // this calucates the growing or shrink height of the element.
        // otherwise it would take height of the picture.
        calcResizingRatio = function (picWidth, containerWidth, height) { 
            return height * (1 + ((containerWidth - picWidth) / picWidth)); 
        },
        
        // This function fetches the image through ajax. In case of a non-img.
        // element it also checks if the height is 0. If it is 0 it resizes the.
        // non-img element to the height of the picture.
        fetchImg =  function (container, imgProp, containerWidth) {  
            var useImg = function (imgTag, url) {
            	imgTag.attr('src', url);  
            	imgTag.css('display', 'block'); 
                cacheWandH($(imgTag).width(), $(imgTag).height());
            }, 
            // container is the non-img tag.
            useDiv = function (container, url) {
                var loadImg = new Image(); // We need this image obj to get the height. 
 
                // it is also very important to check dynamic heights, like navi pictures,
                // those get a predefined height of their inside elements example: oliverj.net.
                loadImg.onload = function() {
                    var w = $(container).width();
                    containerCSS.backgroundImage = 'url(' + url + ')';
                    containerCSS.height = calcResizingRatio(loadImg.width, w, loadImg.height);
                    container.css(containerCSS);
                    cacheWandH(w, containerCSS.height);
                };
                loadImg.src = url;     
            };
            
            $.ajax({
                url: win.location.href,
              	cache: true,
       	 		processData : false
    		}).always(function () {
                if (container.tagName === 'IMG') {
                    useImg($(container), imgProp.key);
                } else {
                    useDiv($(container), imgProp.key);    
                } 
                // Pass the container object to the callback function. 
                // Therefore the user can modify the picture through the callback.
                if(containerProp.callback){
                    containerProp.callback(container);
                }
    		});
        }, 
    
        onZoom = function (container, picList) {
            $(win).resize(function () {
                setPicture(container, picList);
            });
        },
        
        // simlest solution for OrientationChange.
        onOrientationChange = function (container, picList) {
            win.addEventListener('orientationchange', function () {
                switch (win.orientation) {  
                    case -90: case 90: setPicture(container, picList); break; 
                    default: setPicture(container, picList); break; 
                } 
            });
        },
        
        isNotSameWidth = function (containerWidth) {
            return containerProp.lastPicture.width !== containerWidth;    
        },
        
        // gets called at the bottom of the plugin
        // and everytime the user resizes or changes the orientation.
        setPicture = function (container, picList) {
            var containerWidth = $(container).width(),
                imgObj = findMatchingWidth(picList, containerWidth);
       
           // only refetches the img if the width shrinks or grows.
           if (isNotSameWidth(containerWidth)) {
               if (imgObj.key === 'hidden') {
                  $(container).css('display', 'none');   
                  cacheWandH(0, 0);
               } else {
               	  fetchImg(container, imgObj, containerWidth);
               }
           } 
        }, 
    
        initParameters = function (container, picList, p1, p2) {            
            // First optional parameter is a callback.
            if (checkType(p1, 'Function')) {
                containerProp.callback = p1; 
            } 
            
            // First optional parameter is a object.
            if (checkType(p1, 'Object')) {      
                containerCSS = $.extend( {}, containerCSS, p1);
                
                // First optional parameter is object and the second one is a callback.
                if (checkType(p2, 'Function')) {
                    containerProp.callback = p2; 
                }
            }   
            // optional parameter for enabling/disabling Zoom, default on.
            if (containerCSS.enableZoom) {
                onZoom(container, picList);
            } else {
            	setPicture(this, picList); 
            }
            // optional parameter for orientationChange, default on.
            if (containerCSS.orientationChange) {
                onOrientationChange(container, picList);
            } else {
            	setPicture(this, picList); 
            }
            
            delete containerCSS.enableZoom; // not very happy about this.
            delete containerCSS.orientationChange; // not very happy about this.
        };
        
        // Plugin starts here.
        initParameters(this, picList, p1, p2);
        
        return this;
    });
}; }(jQuery, window));
