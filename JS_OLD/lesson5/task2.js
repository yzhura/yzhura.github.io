// Before
var image = {
    width: 100,
    height: 400,
    title: 'Cool image'
};

multiplyNumeric(image);


function multiplyNumeric(obj){
    // var result = 0;
    for(var code in image){
        if(isNaN(image[code])){
            image[code] = image[code];
        } else {
           image[code] *= 2;
        }
    } 
    console.log(image)
}