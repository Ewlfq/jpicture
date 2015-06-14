$( document ).ready(function() {
    console.log('Parameter test');
    $('#first').jp('String');
    $('#second').jp(13);
    $('#third').jp([1,2,3]);
    $('#fourth').jp({ 'a' : 160});
    
    console.log('Width test');
    $('#first').jp({ 'a' : 160});
    $('#second').jp({ 'a' : 160});
    $('#third').jp({ 'a' : 160});
    $('#fourth').jp({ 'a' : 160});
});