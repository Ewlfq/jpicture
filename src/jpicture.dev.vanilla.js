(function(window) { 'use strict';
    var defaults = {
        enableZoom : true,
        orientationChange : true,
        callback : function noop () { },
        animationSpeed: 'fast', // at the moment not used.
        checkForHtml: true,
        lastPicture : {
            height : 0, // at the moment not used.
            width : 0
        }
    },
    
    // ie8+
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
        
        this.jp = function (id, parameter) {
            if (!parameter.hasOwnProperty('picList')) {
                var picList = parameter;
                parameter = {
                    picList: picList  
                };
            }
            
            this.settings = extend(defaults, parameter);
            this.initParameters(id, parameter.picList);
        }
        
        this.initParameters = function (container, picList) {      
            console.log(picList);      
            if (this.settings.enableZoom) {
                //onZoom($container, picList);
            }
            
            // optional parameter for orientationChange, default on.
            if (this.settings.orientationChange) {
                //onOrientationChange($container, picList);
            }
        }
    }
    
    window.jPicture = jPicture;
}(window));