# jPicture 0.5.0
========
As many of you might have at least once experienced, is that on smaller devices with slow connection pictures seem to load forever.

Mainly the problem there is that the high-res pictures are loaded anyway and just get scaled down for the low-res viewport.

To avoid that, might sometimes (or even most of the time) be a pain in the neck, and that is exactly what this jQuery plugin was built 
for.

To break it down to the essence, jPicture loads only the most fitting picture out of the picture-versions for the viewport the page is
displayed on. This not only takes away the trouble of handling this yourself, but also reduces loading times for lower-res viewports.

just 1.73 KB

## Usage
-----

### Bower
```html
bower install jpicture
```

### npm
```html
npm install jpicture
```

### The oldschool way
Reference the JavaScript file manually directly after [jQuery](http://jquery.com):

```html
<script src="jpicture-0.5.0.min.js"></script>
```

## Documentation
---
For a beautiful version of the documentation visit [Documentation page of jPicture.net](http://jpicture.net/documentation/).
For older version of jpicture >= 0.4.0 visit  [Legacy documentation page of jPicture.net](coming soon).

### The easiest way to use jPicture is, with an ID on an IMG-tag. This works as follows:

```javascript
$('#my-fancy-pic').jp({
    'test_imgs/mySuperFancyPic_80.jpg' : 80, 
    'test_imgs/mySuperFancyPic_200.jpg' : 200, 
    'test_imgs/mySuperFancyPic_400.jpg' : 400, 
    'test_imgs/mySuperFancyPic_500.jpg' : 500, 
    'test_imgs/mySuperFancyPic_600.jpg' : 600
});
```
This is an object, which you give jPicture as parameter where the key is the path to the picture and the value is the width of that picture. (Of course the picture should have the corresponding width.) With that given jPicture can determine which picture it should use for the best visualisation on the resolution the site is being viewed on.

### You can use jPicture on classes too

If you are using the same picture more frequently on the same page, you might want to use a class for that. But what if you want to use jPicture too? Well, that is no problem after all, everything you need to change is instead of selecting an ID you now	need to select a class. This works as follows:

```javascript
$('.some-fancy-pics').jp({
    'test_imgs/mySuperFancyPic_80.jpg' : 80, 
    'test_imgs/mySuperFancyPic_200.jpg' : 200, 
    'test_imgs/mySuperFancyPic_400.jpg' : 400, 
    'test_imgs/mySuperFancyPic_500.jpg' : 500, 
    'test_imgs/mySuperFancyPic_600.jpg' : 600
});
```

If you care about users without javascript enabled, you can include the original image inside a <noscript>; tag:

```html
<noscript>
  <img src="test_imgs/mySuperFancyPic_600.jpg" />
</noscript>
```

### You need to use non-IMG-tags – no problem

Sometimes an IMG-tag just isn't enough, but even that is no problem for jPicture after all. You can simply use it just the way you already did. The only difference is that the tag with corresponding ID or class is not an IMG-tag but an whatever- you-want-tag (for example a DIV-tag in a header).

### Your picture just won't look good on lower resolutions?

No problem, you can simply tell jPicture to not show the picture at all if the solution is too small, for example if your banner would just waste space on a low-res device, you can simply do as follows:

```javascript
$('.some-fancy-pics').jp({
    'hidden' : 200,
    'test_imgs/mySuperFancyPic_400.jpg' : 400, 
    'test_imgs/mySuperFancyPic_500.jpg' : 500, 
    'test_imgs/mySuperFancyPic_600.jpg' : 600
});
```
Now if the best fitting version would be for the picture version of 200 pixels, then it will be hidden by setting the display property of CSS to none.

### You can even set CSS-properties

To do so, you can give jPicture a second object as parameter, after the object containing the pictures. The second object should contain the CSS-properties you want to set. For example, if you want to set the opacity to 0.5 you would need to do as follows:

```javascript
$('.some-fancy-pics').jp({
    'test_imgs/mySuperFancyPic_80.jpg' : 80, 
    'test_imgs/mySuperFancyPic_200.jpg' : 200, 
    'test_imgs/mySuperFancyPic_400.jpg' : 400, 
    'test_imgs/mySuperFancyPic_500.jpg' : 500, 
    'test_imgs/mySuperFancyPic_600.jpg' : 600
}, { 
    'opacity' : '0.7',
    'border-color' : '#C1E0FF', 
    'border-width' : '5px', 
    'border-style' : 'solid'
});
```

### Need callbacks?

If you need a callback-function, then you can also give a callback to jPicture as a parameter. For example you want to print to the console when picture was loaded, that would look like follows:

```javascript
$('.some-fancy-pics').jp({
    'test_imgs/mySuperFancyPic_80.jpg' : 80, 
    'test_imgs/mySuperFancyPic_200.jpg' : 200, 
    'test_imgs/mySuperFancyPic_400.jpg' : 400, 
    'test_imgs/mySuperFancyPic_500.jpg' : 500, 
    'test_imgs/mySuperFancyPic_600.jpg' : 600
}, function () {
	console.log("Picture was loaded.");
});
```
Now each time the picture finished loading, "Picture was loaded." will be printed in the console.

### Further modification

What if you need to do something with the picture after you loaded it? Well, just easily hand it over as parameter in the callback-function. In the following example the width of the picture will be logged in the console.

```javascript
$('.some-fancy-pics').jp({
    'test_imgs/mySuperFancyPic_80.jpg' : 80, 
    'test_imgs/mySuperFancyPic_200.jpg' : 200, 
    'test_imgs/mySuperFancyPic_400.jpg' : 400, 
    'test_imgs/mySuperFancyPic_500.jpg' : 500, 
    'test_imgs/mySuperFancyPic_600.jpg' : 600
}, function (pic) {
	var pWidth = $(pic).width();
	console.log("The width of the picture is " + pWidth + "pixels.");
});
```

### CSS and callbacks

You need to change some of the CSS-properties and want to modify the picture with another function too? Nothing simpler than that with jPicture. You can do both simultaneously in one call of jPicture. For the following example the picture will be set to an opacity of 0.5 and then the width will be logged to the console as well as the opacity.

```javascript
$('.some-fancy-pics').jp({
    'test_imgs/mySuperFancyPic_80.jpg' : 80, 
    'test_imgs/mySuperFancyPic_200.jpg' : 200, 
    'test_imgs/mySuperFancyPic_400.jpg' : 400, 
    'test_imgs/mySuperFancyPic_500.jpg' : 500, 
    'test_imgs/mySuperFancyPic_600.jpg' : 600
}, { 
    'opacity' : '0.7',
    'border-color' : '#C1E0FF', 
    'border-width' : '5px', 
    'border-style' : 'solid'
}, function (pic) {
	var pWidth = $(pic).width();
	console.log("The picture has a width of " + pWidth + " pixels.");
});
```
Note that in case you need both, the CSS-properties always go first and after that the function is passed!

### Disable Zoom or Change OrientationChange

jPicture comes with an automatic Zoom and OrientationChange Event. If you want do disable this events just set enableZoom or orientationChange to false.

```javascript
$('.some-fancy-pics').jp({
    'test_imgs/mySuperFancyPic_80.jpg' : 80, 
    'test_imgs/mySuperFancyPic_200.jpg' : 200, 
    'test_imgs/mySuperFancyPic_400.jpg' : 400, 
    'test_imgs/mySuperFancyPic_500.jpg' : 500, 
    'test_imgs/mySuperFancyPic_600.jpg' : 600
}, { 
	enableZoom : false,
    orientationChange : false
});
```

### CSS, Callback and Chaining

You can chain every jquery method to the end of the jpicture function.

```javascript
$('.some-fancy-pics').jp({
    'test_imgs/mySuperFancyPic_80.jpg' : 80, 
    'test_imgs/mySuperFancyPic_200.jpg' : 200, 
    'test_imgs/mySuperFancyPic_400.jpg' : 400, 
    'test_imgs/mySuperFancyPic_500.jpg' : 500, 
    'test_imgs/mySuperFancyPic_600.jpg' : 600
}, { 
    'border-color' : '#C1E0FF', 
    'border-width' : '5px', 
    'border-style' : 'solid'
}, function (pic) {
	var pWidth = $(pic).width();
	console.log("The picture has a width of " + pWidth + " pixels.");
}).mouseenter(function () {
    $(this).css({'opacity' : '0.5'});
}).mouseleave(function () {
    $(this).css({'opacity' : '1'});            
});
```

### Inject HTML instead of pictures

Sometimes it is better display text instead of pictures.
Attention jPicture only recognizes html tags or text with at least one whitespace as 
none picture elements.
		
```javascript
$('#some-fancy-pic').jp({
    '<span>Too Small for a pic</span>;' : 80, 
    'test_imgs/mySuperFancyPic_200.jpg' : 200, 
    'test_imgs/mySuperFancyPic_400.jpg' : 400, 
    'test_imgs/mySuperFancyPic_500.jpg' : 500, 
    'test_imgs/mySuperFancyPic_600.jpg' : 600
});
```

You are not forced to use pictures at all.
		
```javascript
$('#headline-section').jp({
    '<h5>About us</h5>' : 60, 
    '<h4>About us</h4>' : 100, 
    '<h3>About us</h3>' : 140, 
    '<h2>About us</h2>' : 180, 
    '<h1>About us</h1>' : 220
});
```

#### Literals and Variables

Just in case, you didnt know. Instead of Literals we could use variables.

```javascript
var picList = {
    'test_imgs/mySuperFancyPic_80.jpg' : 80, 
    'test_imgs/mySuperFancyPic_200.jpg' : 200, 
    'test_imgs/mySuperFancyPic_400.jpg' : 400, 
    'test_imgs/mySuperFancyPic_500.jpg' : 500, 
    'test_imgs/mySuperFancyPic_600.jpg' : 600
};

var cssProperties = { 
    'border-color' : '#C1E0FF', 
    'border-width' : '5px', 
    'border-style' : 'solid'
};

var callback = function (pic) {
	var pWidth = $(pic).width();
	console.log("The picture has a width of " + pWidth + " pixels.");
};

$('.some-fancy-pics').jp(picList, cssProperties, callback);
```

## Known Issues
---

### A smaller picture is chosen

As far as we know this only appears on Firefox and only with a screen width of 1920 or more pixels, but only with IMG- elements. If all of that comes together in Firefox, then the IMG-element will be sized with a wrong width which causes jPicture to load a smaller version of the picture unregarding the actual resolution or element width. Of course this doesn't look quite good on higher resolutions, but as soon as a resize or an orientation change takes place the correct version will be loaded.

#### Things we tried

```javascript
document.getElementById('banner').offsetWidth;
document.getElementById('banner').innerWidth;
document.getElementById('banner').clientWidth;
$('#banner').width();
$('#banner').css('width');
$('#banner').outerWidth();
```

#### Workaround

The only way we know, to not have that issue is to use other elements than IMG for example a DIV-element should get the job done as expected. As we have already mentioned this is only needed for Firefox.

### Authors 
-------

Zoran Milanovic  [@HayterMiles ](https://twitter.com/HayterMiles) 

Oliver Jessner [@oliverj_net](https://twitter.com/oliverj_net), [Website](http://oliverj.net) 

Send us an email at: help@jpicture.net

Copyright © 2015
