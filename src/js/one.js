'use strict'

// Variables
let coursesEl = document.getElementById('courses');
let addButton = document.getElementById('addButton');
let updateDiv = document.getElementById('updateDiv');
let code = document.getElementById('code');
let name = document.getElementById('name');
let prog = document.getElementById('prog');
let plan = document.getElementById('plan');



// Eventlisteners
window.addEventListener('load', getCourses);
addButton.addEventListener('click', addCourse);

function getCourses() {
    // Call
    fetch('https://studenter.miun.se/~phno1900/moment5/api/read.php')
    .then(response => response.json())
    .then(data => {
      let output = "";
        data.forEach(course => {
        output += `<tr><td>${course.code}</td><td>${course.course_name}</td><td>${course.progression}</td><td>
        <a href='${course.syllabus}' title='Kursplan för ${course.code}' target='_blank'>Webblänk</a></td></tr>
        </br>
        <button id="${course.id}" onClick="deleteCourse(${course.id})">Radera</button>
        <button id="${course.id}" onClick="getOneToUpdate(${course.id})">Updatera</button>`;
      });
      document.getElementById('coursesOutput').innerHTML = output;
    })
};

function deleteCourse(id) {
    fetch('https://studenter.miun.se/~phno1900/moment5/api/delete.php?id=' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        getCourses();
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}

function addCourse() {
    code = code.value;
    name = name.value;
    prog = prog.value;
    plan = plan.value;

    let course = {'code' : code, 'course_name' : name, 'progression' : prog, 'syllabus' : plan};

    fetch('https://studenter.miun.se/~phno1900/moment5/api/create.php', {
        method: 'POST',
        body: JSON.stringify(course)
    })
    .then(response => response.json())
    .then(data => {
        getCourses();
    })
    .catch(error => {
        console.log('Error: ', error);
    })

}


function getOneToUpdate(id) {
    // Call
    fetch('https://studenter.miun.se/~phno1900/moment5/api/readOne.php?id=' + id)
    .then(response => response.json())
    .then(updateDiv.style.display = 'block')
    .then(course => {
        updateDiv.innerHTML +=
            `<form method="get">
            <label>
                    Kurskod: <br />
                    <input type="text" name="c_code" id="c_code" class="inputField" required value="${course.code}"> <br>
            </label>
            <label class="rightLabel">
                    Kursnamn: <br />
                    <input type="text" name="c_name" id="c_name" class="inputField" required value="${course.course_name}"> <br>
            </label>
            <label>
                    Progression: <br />
                    <input type="text" name="c_progression" id="c_progression" class="inputField" required value="${course.progression}"> <br>
            </label>
            <label class="rightLabel">
                    Kursplan: <br />
            <input type="text" name="c_syllabus" id="c_syllabus" class="inputField" required value="${course.syllabus}"> <br>
            </label>
            <input type="submit" id="updateButton" onClick="updateCourse(${course.id})" value="Uppdatera kurs"> <br>      
            <input type="submit" id="closeButton" onClick="closeDiv()" value="Avbryt">
            </form>`     
    })
}

//closeDiv = () => {updateDiv.style.display = 'none'};

function updateCourse(id) {
    
    let newcode = document.getElementById('newcode');
    let newname = document.getElementById('newname');
    let newprog = document.getElementById('newprog');
    let newplan = document.getElementById('newplan');

    newcode = newcode.value;
    newname = newname.value;
    newprog = newprog.value;
    newplan = newplan.value;

    let course = {'id': id, 'code' : newcode, 'course_name' : newname, 'progression' : newprog, 'syllabus' : newplan};

    fetch('https://studenter.miun.se/~phno1900/moment5/api/update.php?id=' + id, {
        method: 'PUT',
        body: JSON.stringify(course)
    })
    .then(response => response.json())
    .then(data => {
        getCourses();
    })
    .catch(error => {
        console.log('Error: ', error);
    })

}