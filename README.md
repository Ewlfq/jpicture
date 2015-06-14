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
Here we make no difference if you either use an img-tag (with id or class)

```html
    <img id="superpic">
    <img class="somePics" id="someOtherPic1">
    <img class="somePics" id="someOtherPic2">
```

or any other tag (with either id or class)

```html
    <div class="somePics">
        <button id="buttonPic"></button>
    </div>
```

The simplest way to let jPicture know which picture it should use for which resolution is to pass an object file to the jp function 
with all picture paths (you may use whichever file extension you prefer) and width sizes.

```javascript
$('#first').jp({
    'test_imgs/we_80.jpg' : 80, 
    'test_imgs/we_200.jpg' : 200, 
    'test_imgs/we_400.jpg' : 400, 
    'test_imgs/we_500.jpg' : 500, 
    'test_imgs/we_600.jpg' : 600, 
});
```

Authors 
-------
Copyright © 2015

Zoran Milanovic  [@HayterMiles ](https://twitter.com/HayterMiles) 

Oliver Harald Jessner [Website](http://oliverj.net), [@oliverj_net](https://twitter.com/oliverj_net) 
