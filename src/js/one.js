'use strict'

// Variables
let coursesEl = document.getElementById('courses');
let addButton = document.getElementById('addButton');
let updateDiv = document.getElementById('updateDiv');
let code = document.getElementById('code');
let name = document.getElementById('name');
let prog = document.getElementById('prog');
let syllabus = document.getElementById('syllabus');

const updateBtn = document.querySelector(".updateBtn");
const modal = document.querySelector(".form-modal");


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
        <a href='${course.syllabus}' title='Kursplan för ${course.code}' target='_blank'>Webblänk</a></td>
        <td><span class="deleteBtn" id="${course.id}" onClick="deleteCourse(${course.id})">Radera</span></td>
        <td> <span class="updateBtn" id="${course.id}" onClick="getOneToUpdate(${course.id})">Uppdatera</span></td></tr>
       `;
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
    code = c_code.value;
    name = c_name.value;
    prog = c_progression.value;
    syllabus = c_syllabus.value;

    let course = {'code' : code, 'course_name' : name, 'progression' : prog, 'syllabus' : syllabus};

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
    .then(modal.style.display = "flex")
    .then(course => {
        updateDiv.innerHTML +=
            `<form method="get">
            <label>
                    Kurskod: <br />
                    <input type="text" name="code" id="newcode" class="inputField" required value="${course.code}"> <br>
            </label>
            <label class="rightLabel">
                    Kursnamn: <br />
                    <input type="text" name="name" id="newname" class="inputField" required value="${course.course_name}"> <br>
            </label>
            <label>
                    Progression: <br />
                    <input type="text" name="prog" id="newprog" class="inputField" required value="${course.progression}"> <br>
            </label>
            <label class="rightLabel">
                    Kursplan: <br />
            <input type="text" name="syllabus" id="newsyllabus" class="inputField" required value="${course.syllabus}"> <br>
            </label>
            <input type="submit" class="btn" id="updateButton" onClick="updateCourse(${course.id})" value="Uppdatera kurs"> <br>      
            <input type="submit" class="btn" id="closeButton" onClick="closeDiv()" value="Avbryt">
            </form>
            `     
    })
}

//closeDiv = () => {updateDiv.style.display = 'none'};

function updateCourse(id) {
    
    let newcode = document.getElementById('newcode');
    let newname = document.getElementById('newname');
    let newprog = document.getElementById('newprog');
    let newsyllabus = document.getElementById('newsyllabus');

    newcode = newcode.value;
    newname = newname.value;
    newprog = newprog.value;
    newsyllabus = newsyllabus.value;

    let course = {'id': id, 'code' : newcode, 'course_name' : newname, 'progression' : newprog, 'syllabus' : newsyllabus};

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