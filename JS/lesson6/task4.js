/*Напишите код, который отсортирует массив объектов people по полю age.*/

var vasya = { name: 'Вася', age: 23 };
var masha = { name: 'Маша', age: 18 };
var vovochka = { name: 'Вовочка', age: 6 };

var people = [ vasya , masha , vovochka ];

function compareAge(personA, personB) {
    return personA.age - personB.age;
}
// сам не додумался...

people.sort(compareAge);
// теперь people: [vovochka, masha, vasya]
console.log(people[0].age) // 6
