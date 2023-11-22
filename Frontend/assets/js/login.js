const baseUrl = 'http://localhost:8000'

async function submitForm() {
    const errorMessage = document.getElementById('error');
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    const user = (username === '' || username.trim().length < 3)

    if((user) || (!password)) {
        errorMessage.innerHTML = 'Please fill in your details!';
        errorMessage.classList.add('error');
        return; 
    }
    
    
    await fetch(baseUrl+'/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.match == true) {
            if (data.data[0].status === 0) {
                errorMessage.innerHTML = 'Login successful!';
                errorMessage.classList.add('valid');

                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.data[0].user_id);
                localStorage.setItem("username", data.data[0].username);

                setTimeout(function() {
                    var loadingPage = document.getElementById('loadingPage');
                    var content = document.getElementById('content');
                    loadingPage.style.display = 'block';
                    content.style.display = 'none';                  
                }, 3000);
    
                setTimeout(function() {
                    if (data.data[0].user_type == 'Buyer') {
                        window.location = "http://127.0.0.1:5501/Frontend/htmls/buyerUser.html";
                    } else if(data.data[0].user_type == 'Farmer') {
                        window.location = "http://127.0.0.1:5501/Frontend/htmls/farmerUser.html";
                    } 
                    else {
                        window.location = "http://127.0.0.1:5501/Frontend/htmls/buyerUser.html";
                    }
                  }, 7000);
            } else {
                errorMessage.innerHTML = 'Login failed. Please check your credentials.';
                errorMessage.classList.add('error1');
            }
    
        } else {
            errorMessage.innerHTML = 'Login failed. Please check your credentials.';
            errorMessage.classList.add('error1');
        }
    });
}