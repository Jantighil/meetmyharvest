const username_input = document.getElementById('textField');
const email_input = document.getElementById('emailField');
const password = document.getElementById('password_input');
const mobile_no = document.getElementById('mobile_no_input');
const checkbox = document.getElementById('checkbox_input');

const errorMessage1 = document.querySelector('#username');      
const errorMessage2 = document.querySelector('#email');      
const errorMessage3 = document.querySelector('#password');          
const errorMessage4 = document.querySelector('#confirm-password');
const errorMessage5 = document.querySelector('#checkbox');      

const btn = document.getElementById('btn');

function changeBorderColor() {
    const field1 = document.getElementById("textField")
    const field2 = document.getElementById("emailField")
    const field3 = document.getElementById("password_input")
    const field4 = document.getElementById("mobile_no_input")

    if (field1.value === '' || field1.value.trim().lenght < 3) {
        field1.style.border = '1px solid #ccc'
    } else {
        field1.style.border = '1px solid green'   
    }
    if (field3.value === '') {
        field3.style.border = '1px solid #ccc'
    } else {
        field3.style.border = '1px solid green'   
    }
    if (field4.value === '') {
        field1.style.border = '1px solid #ccc'
    } else {
        field4.style.border = '1px solid green'   
    }
}

const baseUrl = 'http://localhost:8000'
async function submitForm() {
    const errorMessage = document.getElementById('error');
    const username = document.getElementById('textField').value;
    const email =  document.getElementById('emailField').value;
    const user_type =  document.querySelector('input[name="user"]:checked').value;
    // console.log(user_type);
    const password = document.getElementById('password_input').value;
    const mobile_no = document.getElementById('mobile_no_input').value;
    const checkbox = document.getElementById('checkbox_input');
    
    const user = (username === '' || username.trim().length < 3)
    const mob_no = (mobile_no === '')
    const checkBox = (!checkbox.checked)
    // const radio = ((user_type !== 'Farmer') || (user_type !== 'Buyer'))

    if((user) || (!email) || (!password) || (mob_no) || (checkBox)) {
        errorMessage.innerHTML = 'Please fill in your details correctly!';
        errorMessage.classList.add('error0');
        return;
    }

    await fetch(baseUrl+'/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, user_type, mobile_no })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success == true) {
            errorMessage.innerHTML = 'Registration successful!';
            errorMessage.classList.add('valid1');

            setTimeout(function() {
                var loadingPage = document.getElementById('loadingPage');
                var content = document.getElementById('content');
                loadingPage.style.display = 'block';
                content.style.display = 'none';                  
            }, 2000);

            setTimeout(function() {
                window.location = "http:/\/127.0.0.1:5501/Frontend/htmls/login.html"
            }, 3000);
        } else {
            errorMessage.innerHTML = 'Something went wrong. Please try again.';
            errorMessage.classList.add('error1');
        }
    });
}


username_input.addEventListener('input', (e) => {
    if(username_input.value === ''){
        errorMessage1.innerText = 'Please enter a name';
        errorMessage1.classList.add('error');   
    }
    else if(username_input.value.trim().length < 3){
        errorMessage1.innerHTML = 'Name must be at least 3 characters';
        errorMessage1.classList.add('error');
    }else{
        errorMessage1.innerText = '';
        errorMessage1.classList.add('error');
        console.log("Username: " + username_input.value);
    }
    console.log("Username: " + username_input.value);
})
email_input.addEventListener('input', (e) => {
    function check_email(email) {
        const email_list = /[@]/;
        const fullstop = /[.]/;
        if (
            email_list.test(email) &&
            fullstop.test(email) 
        ) {
            errorMessage2.innerText = '';
            errorMessage2.classList.add('error');
            console.log("Email: " + email_input.value + " is correct");
        }
        else {
            errorMessage2.innerText = "Email must be in *****@example.com";
            errorMessage2.classList.add('error');
        }
    }
    if(email_input.value === ''){
        errorMessage2.innerText = 'Please enter an email';
        errorMessage2.classList.add('error');
    } 
    else {
        check_email(email_input.value);
    }
})
password.addEventListener('input', (e) => {
    function check_password(password) {
        const uppercase_list = /[A-Z]/;
        const lowercase_list = /[a-z]/;
        const number_list = /[0-9]/;
        const special_list = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

        if (
            uppercase_list.test(password) &&
            lowercase_list.test(password) &&
            number_list.test(password) &&
            special_list.test(password) 
        ) {
            errorMessage3.innerText = '';
            errorMessage3.classList.add('error');
        }else {
            errorMessage3.innerText = 'Password must contain: An uppercase, A lowercase, A number, A special character';
            errorMessage3.classList.add('error');
        }
    }
    if(password.value === ''){
        errorMessage3.innerText = 'Please type a password';
        errorMessage3.classList.add('error');
    }
    else if(password.value.trim().length < 8){
        errorMessage3.innerText = 'Password should be at least 8 characters';
        errorMessage3.classList.add('error');
    }
    else{
        check_password(password.value);
    }
})
mobile_no.addEventListener('input', (e) => {
    if(mobile_no.value === ''){
        errorMessage4.innerText = 'Provide your mobile number';
        errorMessage4.classList.add('error');
    }else{
        errorMessage4.innerText = '';
        errorMessage4.classList.add('error');
    }
})

checkbox.addEventListener('change', (e) => {
    // CHECKBOX
    if(!checkbox.checked){
        errorMessage5.innerText = 'You must accept the Terms and Conditions to continue!!';
        errorMessage5.classList.add('checkbox_error');
    }
    else {
        errorMessage5.innerText = '';
        errorMessage5.classList.add('checkbox_error');
    }
})