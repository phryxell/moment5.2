// Hello from 2
console.log("Hello from two.js");

hello = () => {
    return "Hello World!";
  }

var number = [1, 2, 6, 8, 12, 14];

var square = number.map(element => element*element)

console.log(square);

var result = number.filter(element => element>5)

console.log(result);