var tasksCompleted = {
    'Anna': 29,
    'Serg': 35,
    'Elena': 1,
    'Anton':99
}


function getTasks (tasks){
    var result = 0;
    for(code in tasksCompleted){
        if(tasksCompleted[code] > result){
            result = tasksCompleted[code];
        } 
    } 
    console.log(result);
}

getTasks(tasksCompleted);
