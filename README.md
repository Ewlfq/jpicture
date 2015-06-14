jPicture
========
A jQuery plugin to load pictures on the right viewport

Usage
-----

Reference the JavaScript file manually directly after jQuery:

```html
<script src="jpicture.min.js"></script>
```

Examples
--------

Simplest way, pass an object file to the jp function 
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
