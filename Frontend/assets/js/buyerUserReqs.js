const baseUrl = 'http://localhost:8000'

const form = document.getElementById('user_profile');
const formData = new FormData(form);
async function updateProfile() {
    await fetch(baseUrl+`/buyers/${username}`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success == true) {
            ProfilePageerror.innerHTML = `Profile Updated successfully!!`
            ProfilePageerror.classList.add('valid');
        } else if(data.success == false) {
            ProfilePageerror.innerHTML = `Something Went Wrong!! Please try again.`
            ProfilePageerror.classList.add('error');
        } else {
            ProfilePageerror.innerHTML = 'Error updating Profile.';
            ProfilePageerror.classList.add('error');
        }
    })
}

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


async function showCart() {
    const cartItems_container = document.getElementById("cart-items");


    await fetch(baseUrl+`/cart/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const cart_total = document.getElementById("cart_total");
        if (data.data == 'Product not found!') {
            cart_total.innerHTML = `0`;
        } else {
            cart_total.innerHTML = `${data.data.length}`;
        }

        for (let i = 0; i < data.data.length; i++) {
            const cart_item = document.createElement("div");
            cart_item.classList.add('cart_item');
            
            var imgurl = data.data[i].img_url;
            cart_item.innerHTML = `
            <div class="cart_item_img">
                <img src="${imgurl}" alt="${data.data[i].name} image">
            </div>
            <div class="product_details">
                <h3 class="product_name">${data.data[i].name.replace(data.data[i].name[0], data.data[i].name[0].toUpperCase())}</h3>
                <p>Quantity: <span>${data.data[i].quantity}</span></p>
                <p>Location: <span>${data.data[i].name.replace(data.data[i].name[0], data.data[i].name[0].toUpperCase())}</span></p>
                <p>Price: <span>₦${data.data[i].price}</span></p>
                <div class="react_btns">
                    <button class="like"><img src="/Frontend/assets/images/icon/heart.png" alt=""></button>
                    <button class="deleteCartitem"><img src="/Frontend/assets/images/icons/delete1.png" alt=""></button>
                </div>
            </div>
            <div class="item_description">
                <p></p>
            </div>`
            cartItems_container.appendChild(cart_item);
        }
    })
}



// let fname = document.getElementById('firstname').value;
// let lname = document.getElementById('lastname').value;
// let mail = document.getElementById('email').value;
// let place = document.getElementById('location').value;
// let mobile = document.getElementById('mobile_no').value;

// async function updateProfile() {
//     await fetch(baseUrl+`/buyers/${username}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ fname, lname, mail, place, mobile })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.data) {
//             ProfilePageerror.innerHTML = `Profile Updated!!`
//             ProfilePageerror.classList.add('valid');
//         } else {
//             ProfilePageerror.innerHTML = `Something Went Wrong!!`
//             ProfilePageerror.classList.add('error');
//         }
//         // console.log(data);
//     })
// }



    // fetch(baseUrl+'/uploadimg/profile', {
    //     method: 'POST',
    //     body: formData,
    // })
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data);
    //     data.forEach(image => {
    //         const div = document.createElement('div');
    //         div.classList.add('col-md-3');
    //         div.innerHTML = `   <div class="card">
    //                                 <img src="${image.url}" class="card-img-top" alt="...">
    //                             </div> `;
    //         document.querySelector('#images').appendChild(div)
    //     })
    // })
