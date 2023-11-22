var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var email = document.getElementById('email');
var locaton = document.getElementById('location');
var mobile_no = document.getElementById('mobile_no');
var ProfilePageerror = document.querySelector('#profile_page_error');      
const FNameerror = document.querySelector('#fname-error');      
const LNameerror = document.querySelector('#lname-error');      
const Emailerror = document.querySelector('#email-error');          
const Locationerror = document.querySelector('#location-error');
const MobNumerror = document.querySelector('#mobileNo-error');

const oldpassword = document.getElementById('oldpassword');
const newpassword = document.getElementById('newpassword');
const confNewPassword = document.getElementById('confirmnewpassword');
const ChangePasswordPageerror = document.querySelector('#password_page_error');
const OldPassworderror = document.querySelector('#oldpassworderror');      
const NewPassworderror = document.querySelector('#newpassworderror');      
const ConfirmNewPassworderror = document.querySelector('#confirmnewpassworderror'); 

const btn = document.getElementById('btn');


firstname.addEventListener('input', (e) => {
    if(firstname.value === ''){
        FNameerror.innerHTML = 'Please enter a name';
        FNameerror.classList.add('jsnameerror');
    }
    else if(firstname.value.trim().length < 3){
        FNameerror.innerHTML = 'Name must be at least 3 characters';
        FNameerror.classList.add('jsnameerror');
    }else{
        FNameerror.innerText = '';
        FNameerror.classList.add('jsnameerror');
    }
})
lastname.addEventListener('input', (e) => {
    if(lastname.value === ''){
        LNameerror.innerHTML = 'Please enter a name';
        LNameerror.classList.add('jsnameerror');
    }
    else if(lastname.value.trim().length < 3){
        LNameerror.innerHTML = 'Name must be at least 3 characters';
        LNameerror.classList.add('jsnameerror');
    }else{
        LNameerror.innerText = '';
        LNameerror.classList.add('jsnameerror');
    }
})

function validateNumberInput(input, maxLength) {
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength); // Truncate input to the desired length
    }
}
mobile_no.addEventListener('input', (e) => {
    if(mobile_no.value === ''){
        MobNumerror.innerText = 'Provide your mobile number';
        MobNumerror.classList.add('error');
    } else if (mobile_no.value.length !== 11){
        MobNumerror.innerText = '';
        MobNumerror.classList.add('error');
    } else {
        MobNumerror.innerText = '';
        MobNumerror.classList.add('error');
    }
})

email.addEventListener('input', (e) => {
    function check_email(email) {
        const email_list = /[@]/;
        const fullstop = /[.]/;
        const speciallist = /[!#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

        if (
            email_list.test(email) &&
            fullstop.test(email) 
        ) {
            Emailerror.innerText = '';
            Emailerror.classList.add('error');
        } else if (speciallist.test(email)) {
            Emailerror.innerText = 'You have inputed an invalid Character';
            Emailerror.classList.add('error');
        } else {
            Emailerror.innerText = "Email must be in *****@example.com";
            Emailerror.classList.add('error');
        }
    }
    if(email.value === ''){
        Emailerror.innerText = 'Please enter an email';
        Emailerror.classList.add('error');
    } 
    else {
        check_email(email.value);
    }
})

newpassword.addEventListener('input', (e) => {
    function check_password(newpassword) {
        const uppercase_list = /[A-Z]/;
        const lowercase_list = /[a-z]/;
        const number_list = /[0-9]/;
        const special_list = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

        if (
            uppercase_list.test(newpassword) &&
            lowercase_list.test(newpassword) &&
            number_list.test(newpassword) &&
            special_list.test(newpassword) 
        ) {
            NewPassworderror.innerText = '';
            NewPassworderror.classList.add('error');
        }else {
            NewPassworderror.innerText = 'Password must contain: an uppercase, a lowercase, a number, a special character';
            NewPassworderror.classList.add('error');
        }
    }
    if(newpassword.value === ''){
        NewPassworderror.innerText = 'Please type a password';
        NewPassworderror.classList.add('error');
    }
    else if(newpassword.value.trim().length < 8){
        NewPassworderror.innerText = 'Password should be at least 8 characters';
        NewPassworderror.classList.add('error');
    }
    else{
        check_password(newpassword.value);
    }
})

confNewPassword.addEventListener('input', (e) => {
    if(confNewPassword.value === ''){
        ConfirmNewPassworderror.innerText = 'Confirm your password';
        ConfirmNewPassworderror.classList.add('error');
    }else{
        ConfirmNewPassworderror.innerText = '';
        ConfirmNewPassworderror.classList.add('error');
    }
    if(confNewPassword.value !== newpassword.value){
        ConfirmNewPassworderror.innerText = 'Confirm that your password is the same';
        ConfirmNewPassworderror.classList.add('error');
    }
})

function toggleContent(elementId) {
    const content = [
        document.getElementById('content1'),
        document.getElementById('content2'),
        document.getElementById('content3'),
        document.getElementById('content4'),
        document.getElementById('content5'),
    ];
    const elements = [
        document.getElementById('navlink1'),
        document.getElementById('navlink2'),
        document.getElementById('navlink3'),
        document.getElementById('navlink4'),
        document.getElementById('navlink5'),
    ];
    const texts = [
        document.getElementById('text1'),
        document.getElementById('text2'),
        document.getElementById('text3'),
        document.getElementById('text4'),
        document.getElementById('text5'),
    ];
    const text = document.getElementById('text');

    for (let i = 0; i < content.length; i++) {
        content[i].style.display = i + 1 === elementId ? 'block' : 'none';
        texts[i].style.color = i + 1 === elementId ? '#5E5E0B' : '#574646';
        elements[i].style.borderLeft = i + 1 === elementId ? '2px solid #5E5E0B' : 'none';
    }
}


const dataFromServer = "John Doe";

firstname.value = 'Fortune';
lastname.value = 'Ifeanyi';
email.value = 'fortune@gmail.com';
locaton.value = 'kaduna'
mobile_no.value = '09043652728';





//  my square image
const imageUpload = document.getElementById('file');
const selectedImage = document.getElementById('selected-image');
// function circleImg() {
    imageUpload.addEventListener('change', function () {
        const file = imageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                selectedImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
// }


// const uploadButton = document.querySelector('.upload');
// const imageContainer = document.querySelector('.img_add_del');

// uploadButton.addEventListener('click', () => {
// // Get the file input element.
// const fileInputElement = document.querySelector('.upload input[type="file"]');

// // Get the file from the user.
// const file = fileInputElement.files[0];

// // Create a FileReader object to read the image file.
// const reader = new FileReader();

// // Load the image file into the FileReader object.
// reader.onload = () => {
//     // Create a new image element.
//     const image = new Image();

//     // Set the image element's src attribute to the image data.
//     image.src = reader.result;

//     // Append the image element to the image container.
//     imageContainer.appendChild(image);
// };

// // Start reading the image file.
// reader.readAsDataURL(file);
// });