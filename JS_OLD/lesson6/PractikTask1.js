var obj1 = { 
    classname: 'open menu'
};
function addClass(obj, cls){
    var classes = obj.classname ? obj.classname.split(' ') : [];
    for (var i = 0; i < classes.length; i++){
        if (classes[i] = cls){
            return //Класс уже есть 
        }
    }
    classes.push(cls); // добавить
    obj.classname = classes.join(' '); // обновить свойство
}

addClass(obj1, 'sdfsdf');
console.log(obj1);