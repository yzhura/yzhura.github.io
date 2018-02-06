/*Есть массив строк arr. Создайте массив arrSorted — из тех же элементов, но отсортированный.
Исходный массив не должен меняться.
*/

var arr = ['HTML', 'JavaScript', 'CSS'];
var arrSorted = arr.slice();
arrSorted.sort();

// ... ваш код ...

console.log( arrSorted ); // CSS, HTML, JavaScript
console.log( arr ); // HTML, JavaScript, CSS (без изменений)
