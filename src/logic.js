$( document ).ready(function() {
    /*
    console.log('Parameter test');
    $('#first').jp('String');
    $('#second').jp(13);
    $('#third').jp([1,2,3]);
    $('#fourth').jp({ 'a' : 160});
    
    console.log('\nWidth test');
    $('#first').jp({ 'a' : 160});
    $('#second').jp({ 'a' : 160});
    $('#third').jp({ 'a' : 160});
    $('#fourth').jp({ 'a' : 160});
    $('#fifth').jp({ 'a' : 160});
    console.log('Class Width test');
    $('.pic').jp({ 'a' : 160}); */
    
    console.log('\npic test');
    var picList = {
        '../test_imgs/we_80.jpg' : 80, 
        '../test_imgs/we_200.jpg' : 200, 
        '../test_imgs/we_400.jpg' : 400, 
        '../test_imgs/we_500.jpg' : 500, 
        '../test_imgs/we_600.jpg' : 600, 
    };
    
    $('#first').jp(picList);
    $('#second').jp(picList);
    $('#third').jp(picList);
    $('#fourth').jp(picList);
    $('#fifth').jp(picList);
});