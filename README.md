jPicture
========
As many of you might have at least once experienced, is that on smaller devices with slow connection pictures seem to load forever.

Mainly the problem there is that the high-res pictures are loaded anyway and just get scaled down for the low-res viewport.

To avoid that, might sometimes (or even most of the time) be a pain in the neck, and that is exactly what this jQuery plugin was built 
for.

To break it down to the essence, jPicture loads only the most fitting picture out of the picture-versions for the viewport the page is
displayed on. This not only takes away the trouble of handling this yourself, but also reduces loading times for lower-res viewports.

For further informations visit, [jpicture.net](http://jpicture.net)

Usage
-----

Reference the JavaScript file manually directly after jQuery:

```html
<script src="jpicture.min.js"></script>
```

Examples
--------

First you need some html element you want to use jPicture on. 
Here we make no difference if you either use an img-tag or any other tag

This is a simple example how to use jPicture with an id

```html
    <img id="super-pic">
```

```javascript
$('#super-pic').jp({
    'test_imgs/we_80.jpg' : 80, 
    'test_imgs/we_200.jpg' : 200, 
    'test_imgs/we_400.jpg' : 400, 
    'test_imgs/we_500.jpg' : 500, 
    'test_imgs/we_600.jpg' : 600, 
});
```

but you can also use jPicture with classes as easy as this

```html
    <img class="some-pics" id="some-other-pic1">
    <img class="some-pics" id="some-other-pic2">
    <img class="some-pics" id="some-other-Pic3">
```

```javascript
$('.some-pics').jp({
    'test_imgs/we_80.jpg' : 80, 
    'test_imgs/we_200.jpg' : 200, 
    'test_imgs/we_400.jpg' : 400, 
    'test_imgs/we_500.jpg' : 500, 
    'test_imgs/we_600.jpg' : 600, 
});
```

Note that there should be a width set for the elements, recommendedly for responsiveness it should be 100%.

Authors 
-------

Zoran Milanovic  [@HayterMiles ](https://twitter.com/HayterMiles) 

Oliver Jessner [Website](http://oliverj.net), [@oliverj_net](https://twitter.com/oliverj_net) 

Copyright © 2015
