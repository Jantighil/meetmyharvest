const baseUrl = 'http://localhost:8000'

async function submitProducts() {
    const search = document.getElementById("search").value;
    const name = document.getElementById("productName").value;
    const quantity = document.getElementById("quantity").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const location = document.getElementById("location").value;
    const images = document.getElementById("images");
    const errorMessage = document.getElementById("error");


    if((!name) || (!quantity) || (!description) || (!price) || (!location)) {
        errorMessage.innerHTML = 'Please fill in your Product\'s details correctly!';
        errorMessage.classList.add('error');
        return;
    }

    await fetch(baseUrl+'/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, quantity, description, price, location })
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (data.success == true) {
            errorMessage.innerHTML = 'Product Added Successfully!';
            errorMessage.classList.add('valid');
        } else {
            errorMessage.innerHTML = 'Something went wrong. Please try again.';
            errorMessage.classList.add('error');
        }
    })
}

async function searchProducts() {
    const search = document.getElementById("search").value;
    const errorMessage = document.getElementById("error");
    const searchItems = document.getElementById("searchItems");
    const doubleItems = document.getElementById("doubleItems");
    const allItems = document.getElementById("allItems");
    const prod_name = document.getElementById("prod_name");
    const prod_desc = document.getElementById("prod_desc");
    const prod_quantity = document.getElementById("prod_quantity");
    const prod_price = document.getElementById("prod_price");
    const prod_location = document.getElementById("prod_location");

    if((!search)) {
        await fetch(baseUrl+'/items', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(item => {
            if (item.success == true) {
                allItems.style.display = 'block'
                searchItems.style.display = 'none'
                doubleItems.style.display = 'none'
                for (let i = 0; i < item.data.length; i++) {
                    const prod_name = document.createElement("p");
                    const prod_desc = document.createElement("p");
                    const prod_quantity = document.createElement("p");
                    const prod_price = document.createElement("p");
                    const prod_location = document.createElement("p");
                    prod_name.innerHTML = `<p class="product_info">NAME: <span>${item.data[i].name.replace(item.data[i].name[0], item.data[i].name[0].toUpperCase())} </span></p>`;
                    prod_desc.innerHTML = `<p class="product_info">DESCRIPTION: <span>${item.data[i].description} </span></p>`;
                    prod_quantity.innerHTML = `<p class="product_info">QUANTITY: <span>${item.data[i].quantity} </span></p>`;
                    prod_price.innerHTML = `<p class="product_info">PRICE: <span>${item.data[i].price} </span></p>`;
                    prod_location.innerHTML = `<p class="product_info">LOCATION: <span>${item.data[i].location.replace(item.data[i].location[0], item.data[i].location[0].toUpperCase())} </span></p> <br>`;
                    allItems.appendChild(prod_name);
                    allItems.appendChild(prod_desc);
                    allItems.appendChild(prod_quantity);
                    allItems.appendChild(prod_price);
                    allItems.appendChild(prod_location); 
                }
            }
        })
        errorMessage.innerHTML = 'Please fill in a Particular Product to find!';
        errorMessage.classList.add('error1');
        return;
    }

    await fetch(baseUrl+'/items/'+search, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        if (item.success == true) {
            if (item.data.length === 1) {
                searchItems.style.display = 'block'
                allItems.style.display = 'none'
                doubleItems.style.display = 'none'
                prod_name.innerHTML = `<p class="product_info">NAME: <span>${item.data[0].name.replace(item.data[0].name[0], item.data[0].name[0].toUpperCase())} </span></p>`;
                prod_desc.innerHTML = `<p class="product_info">DESCRIPTION: <span>${item.data[0].description} </span></p>`;
                prod_quantity.innerHTML = `<p class="product_info">QUANTITY: <span>${item.data[0].quantity} </span></p>`;
                prod_price.innerHTML = `<p class="product_info">PRICE: <span>${item.data[0].price} </span></p>`;
                prod_location.innerHTML = `<p class="product_info">LOCATION: <span>${item.data[0].location.replace(item.data[0].location[0], item.data[0].location[0].toUpperCase())} </span></p> <br>`;
                errorMessage.innerHTML = '';
                errorMessage.classList.add('none');

            } else if (item.data.length > 1) {
                // if (doubleItems.style.display = 'none') {
                //     doubleItems.style.display = 'block'
                // } else {
                //     doubleItems.style.display = 'none'
                // }
                doubleItems.style.display = 'block'
                searchItems.style.display = 'none'
                allItems.style.display = 'none'
                for (let i = 0; i < item.data.length; i++) {
                    const prod_name1 = document.createElement("p");
                    const prod_desc1 = document.createElement("p");
                    const prod_quantity1 = document.createElement("p");
                    const prod_price1 = document.createElement("p");
                    const prod_location1 = document.createElement("p");
                    prod_name1.innerHTML = `<p class="product_info">NAME: <span>${item.data[i].name.replace(item.data[i].name[0], item.data[i].name[0].toUpperCase())} </span></p>`;
                    prod_desc1.innerHTML = `<p class="product_info">DESCRIPTION: <span>${item.data[i].description} </span></p>`;
                    prod_quantity1.innerHTML = `<p class="product_info">QUANTITY: <span>${item.data[i].quantity} </span></p>`;
                    prod_price1.innerHTML = `<p class="product_info">PRICE: <span>${item.data[i].price} </span></p>`;
                    prod_location1.innerHTML = `<p class="product_info">LOCATION: <span>${item.data[i].location.replace(item.data[i].location[0], item.data[i].location[0].toUpperCase())} </span></p> <br>`;
                    doubleItems.appendChild(prod_name1);
                    doubleItems.appendChild(prod_desc1);
                    doubleItems.appendChild(prod_quantity1);
                    doubleItems.appendChild(prod_price1);
                    doubleItems.appendChild(prod_location1); 
                }
            }   
        } else {
            errorMessage.innerHTML = `"${search.replace(search, search.toUpperCase())}" is not Available at the moment!`;
            errorMessage.classList.add('error');
        }
    })
}