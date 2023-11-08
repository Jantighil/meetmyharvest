const baseUrl = 'http://localhost:8000'
const password = document.getElementById('newpassword').value;
async function changePassword() {
    await fetch(baseUrl+`/buyers/passwordchange/${username}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}

async function deleteaccount() {
    await fetch(baseUrl+`/auth/deleteaccount/${username}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ password })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}

let firstname = document.getElementById('firstname').value;
let lastname = document.getElementById('lastname').value;
let email = document.getElementById('email').value;
let location = document.getElementById('location').value;
let mobile_no = document.getElementById('mobile_no').value;
let ProfilePageerror = document.querySelector('#profile_page_error');
async function updateProfile() {
    await fetch(baseUrl+`/buyers/${username}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname, lastname, email, location, mobile_no })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}

