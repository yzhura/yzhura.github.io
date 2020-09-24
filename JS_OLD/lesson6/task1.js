function removeClass(obj, cls){
    var classes = obj.className ? obj.className.split(' ') : []; 
    console.log(classes)
    for (var i = 0;i <= classes.length;i++ ){        
        for(var j = 0; j <= classes.length; j++){
            if (classes[i] == cls){
            var index = classes.indexOf(cls)
            classes.splice(index,1);
            console.log(classes);
            }
        } 
    }
    obj.className = classes.join(' ');
}
var obj = {
    className: 'open menu menu'
  };

removeClass(obj, 'menu');
console.log(obj.className);