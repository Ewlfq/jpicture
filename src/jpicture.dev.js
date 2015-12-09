// jPicture version 0.6.0
// Authors: Oliver Jessner, Zoran Milanovic
(function (window, document) { 'use strict';
    // this obj stores all css properties, which are added to the fetched html elem e.g. $('#special.div').
    var containerCSS = {
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover',
        'display' : 'block'
    },

    defaults = {
        enableZoom: true,
        orientationChange: true,
        callback: function noop () { },
        animationSpeed: 'fast', // at the moment not used.
        checkForHtml: true,
        lastPicture: {
            height: 0, // at the moment not used.
            width: 0
        }
    },

    // implementation of $.extend({}, defaults, parameter);
    // can be found at line 37
    // support for this extend function ie8+
    extend = function (defaults, options) {
        var extended = {},
            prop = null;

        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    },

    jPicture = function () {
        this.settings = {};

        this.checkType = function (elem, type) {
            if (Object.prototype.toString.call(elem) === '[object ' + type + ']') {
                return true;
            }
            return false;
        };

        this.findMatchingWidth = function (picList, width) {
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
        };

        this.cacheWandH = function (w, h) {
            this.settings.lastPicture.width = w;
            this.settings.lastPicture.height = h;
        };

        // this calucates the growing or shrink height of the element.
        // otherwise it would take height of the picture.
        this.calcResizingRatio = function (picWidth, containerWidth, height) {
            return height * (1 + ((containerWidth - picWidth) / picWidth));
        };

        // this functions only exist in the vanilla version
        this.getWidth = function (elem) {
            console.log(elem);
            return parseInt(window.getComputedStyle(elem, null).width);
        };

        this.getHeight = function (elem) {
            return parseInt(window.getComputedStyle(elem, null).height);
        };

        this.fetchImg =  function (container, imgProp, containerWidth) {
            var that = this,

            useImg = function (imgElem, url) {
            	imgElem.setAttribute('src', url);
            	imgElem.style.display = 'block';
                cacheWandH(that.getWidth(imgElem), that.getHeight(imgElem));
            },

            // container is the non-img tag.
            useDiv = function (container, url) {
                var loadImg = new Image(); // We need this image obj to get the height.

                // it is also very important to check dynamic heights, like navi pictures,
                // those get a predefined height of their inside elements example: oliverj.net.
                loadImg.onload = function() {
                    var w = that.getWidth(container);

                    container.style.backgroundImage = 'url(' + url + ')';
                    container.style.backgroundRepeat = 'no-repeat';
                    container.style.backgroundSize = 'cover';
                    container.style.display = 'block';
                    container.style.height = that.calcResizingRatio(loadImg.width, w, loadImg.height);

                    that.cacheWandH(w, container.style.height);
                };
                loadImg.src = url;
            },

            httpRequest = new XMLHttpRequest();

            httpRequest.onreadystatechange = function (data) {
                if (container.getAttribute("tagName") === 'IMG') {
                    useImg(container, imgProp.key);
                } else {
                    useDiv(container, imgProp.key);
                }

                // if there is no callback passed, it is just a noop.
                that.settings.callback(container);
            };

            httpRequest.onerror = function () { };
            httpRequest.open('GET', window.location.href, true);
            httpRequest.send();
        };

        this.onZoom = function (container, picList) {
            var that = this;

            window.addEventListener('resize', function () {
                that.setPicture(container, picList);
            });
        };

        this.onOrientationChange = function (container, picList) {
            var that = this;

            window.addEventListener('orientationchange', function () {
                switch (window.orientation) {
                    case -90: case 90: that.setPicture(container, picList); break;
                    default: that.setPicture(container, picList); break;
                }
            });
        };

        this.clearPicture = function (container) {
            container.style.backgroundImage = 'none';
            container.style.height = 'auto';
        };

        this.isSameWidth = function (containerWidth) {
            return this.settings.lastPicture.width === containerWidth;
        };

        this.hasWhiteSpace = function (str) {
            return /\s/g.test(str);
        };

        this.hasLT = function (str) {
            return str.indexOf('&lt;') !== -1;
        };

        this.setPicture = function (container, picList) {
            var containerWidth = this.getWidth(container),
                imgObj = this.findMatchingWidth(picList, containerWidth);

            // only refetches the img if the width shrinks or grows.
            if (!this.isSameWidth(containerWidth)) {
                // User wants to hide anything.
                if (imgObj.key === 'hidden') {
                    container.style.display = 'none';
                    this.cacheWandH(0, 0);

                // User wants to display some html.
                } else if ((this.hasWhiteSpace(imgObj.key) || this.hasLT(imgObj.key)) && this.settings.checkForHtml) {
                    container.innerHTML = imgObj.key;
                    this.clearPicture(container);
                } else {
                    this.fetchImg(container, imgObj, containerWidth);
                    container.innerHTML = '';
                }
            }
        };

        this.setResponsive = function (id, parameter) {
            var container = document.getElementById(id);

            if (!parameter.hasOwnProperty('picList')) {
                var picList = parameter;
                parameter = {
                    picList: picList
                };
            }

            this.settings = extend(defaults, parameter);

            this.initParameters(id, this.settings.picList);
            this.setPicture(container, this.settings.picList);
        };

        this.initParameters = function (container, picList) {
            if (this.settings.enableZoom) {
                this.onZoom(container, picList);
            }

            // optional parameter for orientationChange, default on.
            if (this.settings.orientationChange) {
                this.onOrientationChange(container, picList);
            }
        };
    };

    window.jPicture = jPicture;
}(window, document));
