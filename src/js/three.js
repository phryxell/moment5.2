"use strict";

function greet() {
    document.getElementById('result').innerHTML = 'Hej!';
    return false;
}

document.getElementById('go').addEventListener('click', greet);