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
        if (data.passwordData) {
            ChangePasswordPageerror.innerHTML = `Profile Updated!!`
            ChangePasswordPageerror.classList.add('valid');
        } else {
            ChangePasswordPageerror.innerHTML = `Something Went Wrong!!`
            ChangePasswordPageerror.classList.add('error');
        }
    })
}

async function deleteaccount() {
    await fetch(baseUrl+`/auth/deleteaccount/${username}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        
    })
}

let fname = document.getElementById('firstname').value;
let lname = document.getElementById('lastname').value;
let mail = document.getElementById('email').value;
let place = document.getElementById('location').value;
let mobile = document.getElementById('mobile_no').value;

async function updateProfile() {
    await fetch(baseUrl+`/buyers/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fname, lname, mail, place, mobile })
    })
    .then(response => response.json())
    .then(data => {
        if (data.data) {
            ProfilePageerror.innerHTML = `Profile Updated!!`
            ProfilePageerror.classList.add('valid');
        } else {
            ProfilePageerror.innerHTML = `Something Went Wrong!!`
            ProfilePageerror.classList.add('error');
        }
        // console.log(data);
    })
}



async function addimage() {
    fetch(baseUrl+'/uploadimg/profile', {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(image => {
            const div = document.createElement('div');
            div.classList.add('col-md-3');
            div.innerHTML = `   <div class="card">
                                    <img src="${image.url}" class="card-img-top" alt="...">
                                </div> `;
            document.querySelector('#images').appendChild(div)
        })
    })
}