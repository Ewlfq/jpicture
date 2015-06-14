jPicture
========
A jQuery plugin to load pictures on the right viewport.
Reduce your traffic and load your images async.

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

Oliver Harald Jessner [Website](http://oliverj.net), [@oliverj_net](https://twitter.com/oliverj_net) 

Copyright © 2015
