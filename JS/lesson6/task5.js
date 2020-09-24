/*Палиндром - это строка которая читается с обоих сторон одинаково. Например: Анна, оно, А роза упала на лапу Азора.
Необходимо написать функцию isPal(string) которая возвращает true или false в зависимости от того является ли строка палиндромом или нет.
 */

 function isPal(string){
    var arr = string.split('');
    var new_arr = arr.slice();
    new_arr.reverse();
    for(var i = 0; i < arr.length;i++){
        for (var j = 0; j < new_arr.length;j++){
            if(arr[i] == new_arr[i]){
                return true;
            } else return false;
        }
    }
 }
console.log(isPal('Anna')); // true
console.log(isPal('А роза упала на лапу Азора')); //true
console.log(isPal('Вася')); //false
console.log(isPal('12321')); //true
console.log(isPal('123212')); //false

//со строками пока хз как