;(function ($, win) { 'use strict';
// jPicture version 0.6.0
// Authors: Oliver Jessner, Zoran Milanovic
$.fn.jp = function (parameter) {

    // this obj stores all css properties, which are added to the fetched html elem e.g. $('#special.div').
    var containerCSS = {
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover',
        'display' : 'block'
    },

    settings = {},

    defaults = {
        enableZoom : true,
        orientationChange : true,
        callback : function noop () { },
        animationSpeed: 'fast', // at the moment not used.
        checkForHtml: true,
        lastPicture : {
            height : 0, // at the moment not used.
            width : 0
        }
    };

    if (!parameter.hasOwnProperty('picList')) {
        var picList = parameter;
        parameter = {
            picList: picList
        };
    }

    settings = $.extend({}, defaults, parameter);

    return this.each(function () {
        var $container = $(this),

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
            settings.lastPicture.width = w;
            settings.lastPicture.height = h;
        },

        // this calucates the growing or shrink height of the element.
        // otherwise it would take height of the picture.
        calcResizingRatio = function (picWidth, containerWidth, height) {
            return height * (1 + ((containerWidth - picWidth) / picWidth));
        },

        // This function fetches the image through ajax. In case of a non-img.
        // element it also checks if the height is 0. If it is 0 it resizes the.
        // non-img element to the height of the picture.
        fetchImg =  function ($container, imgProp, containerWidth) {
            var useImg = function ($imgElem, url) {
            	$imgElem.attr('src', url);
            	$imgElem.css('display', 'block');
                cacheWandH($imgElem.width(), $imgElem.height());
            },

            // container is the non-img tag.
            useDiv = function ($container, url) {
                var loadImg = new Image(); // We need this image obj to get the height.

                // it is also very important to check dynamic heights, like navi pictures,
                // those get a predefined height of their inside elements example: oliverj.net.
                loadImg.onload = function() {
                    var w = $container.width();
                    containerCSS.backgroundImage = 'url(' + url + ')';
                    containerCSS.height = calcResizingRatio(loadImg.width, w, loadImg.height);
                    $container.css(containerCSS);
                    cacheWandH(w, containerCSS.height);
                };
                loadImg.src = url;
            };

            $.ajax({
                url: win.location.href,
              	cache: true,
       	 		processData : false
    		}).always(function () {
                if ($container.prop("tagName") === 'IMG') {
                    useImg($container, imgProp.key);
                } else {
                    useDiv($container, imgProp.key);
                }

                // if there is no callback passed, it is just a noop.
                settings.callback($container);
    		});
        },

        onZoom = function ($container, picList) {
            win.addEventListener('resize', function () {
                setPicture($container, picList);
            });
        },

        // simlest solution for OrientationChange.
        onOrientationChange = function ($container, picList) {
            win.addEventListener('orientationchange', function () {
                switch (win.orientation) {
                    case -90: case 90: setPicture($container, picList); break;
                    default: setPicture($container, picList); break;
                }
            });
        },

        clearPicture = function ($container) {
            $container.css({
                'background-image': 'none',
                'height': 'auto'
            });
        },

        isSameWidth = function (containerWidth) {
            return settings.lastPicture.width === containerWidth;
        },

        hasWhiteSpace = function (str) {
            return /\s/g.test(str);
        },

        hasLT = function (str) {
            return str.indexOf('&lt;') !== -1;
        },

        // gets called at the bottom of the plugin
        // and everytime the user resizes or changes the orientation.
        setPicture = function ($container, picList) {
            var containerWidth = $container.width(),
                imgObj = findMatchingWidth(picList, containerWidth);

           // only refetches the img if the width shrinks or grows.
           if (!isSameWidth(containerWidth)) {
               // User wants to hide anything.
               if (imgObj.key === 'hidden') {
                  $container.css('display', 'none');
                  cacheWandH(0, 0);

               // User wants to display some html.
               } else if ((hasWhiteSpace(imgObj.key) || hasLT(imgObj.key)) && settings.checkForHtml) {
                   $container.html(imgObj.key);
                   clearPicture($container);
               } else {
               	  fetchImg($container, imgObj, containerWidth);
                  $container.html('');
               }
           }
        },

        initParameters = function ($container, picList) {
            // optional parameter for enabling/disabling Zoom, default on.
            if (settings.enableZoom) {
                onZoom($container, picList);
            }

            // optional parameter for orientationChange, default on.
            if (settings.orientationChange) {
                onOrientationChange($container, picList);
            }
        };

        // Init of plugin is here.
        initParameters($container, settings.picList);
        setPicture($container, settings.picList);
        return $container;
    });
}; }(jQuery, window));
