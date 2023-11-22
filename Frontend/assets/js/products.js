const filterButtons = document.querySelectorAll('.filter_btn');

filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        filterButtons.forEach(btn => {
            btn.classList.remove('selected');
        });
        this.classList.add('selected');
        this.parentNode.prepend(this);
        this.style.animation = 'moveToLeft 1s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
});

const baseUrl = 'http://localhost:8000'
// const product_items_container = document.getElementById("product_items_container");
// const search = document.getElementById("search").value;
// const product_item = document.createElement("div");

async function displayProducts() {
    const product_items_container_search = document.getElementById("product_items_container_search");
    const product_items_container_fill = document.getElementById("product_items_container_fill");
    const product_items_container = document.getElementById("product_items_container");
    
    await fetch(baseUrl+'/items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        if (item.success == true) {
            product_items_container.innerHTML = ``;
            product_items_container_search.innerHTML = ``;
            product_items_container_fill.innerHTML = ``;

            for (let i = 0; i < item.data.length; i++) {
                const product_item = document.createElement("div");
                product_item.classList.add('product_item');
                
                var imgurl = item.data[i].img_url;
                src = '/Frontend/assets/images/offer2.png'
                product_item.innerHTML = `
                <div class="item_image">
                    <img src=${imgurl || src} alt="">
                </div>
                <div class="item_details">
                    <div class="product_details">
                        <div class="item_info">
                            <h3 class="product_name">${item.data[i].name.replace(item.data[i].name[0], item.data[i].name[0].toUpperCase())}</h3>
                            <p class="product_info">Quantity: <span>${item.data[i].quantity}</span></p>
                            <p class="product_info">Location: <span>${item.data[i].location.replace(item.data[i].location[0], item.data[i].location[0].toUpperCase())}</span></p>
                            <p class="product_info">Price: <span>₦${item.data[i].price}</span></p>
                        </div>
                    </div>
                    <div class="react_btns">
                        <button class="like"><img src="/Frontend/assets/images/icon/heart.png" alt=""></button>
                        <button class="addtocart"><img src="/Frontend/assets/images/icon/add-to-favorites-svgrepo-com.png" alt=""></button>
                    </div>
                    <div class="item_description">
                        <p>${item.data[i].description}</p>
                    </div>
                </div>`
                product_items_container.appendChild(product_item);
            }
        return;
        }
    })
}


async function searchProducts() {
    const product_items_container = document.getElementById("product_items_container");
    const product_items_container_fill = document.getElementById("product_items_container_fill");
    const product_items_container_search = document.getElementById("product_items_container_search");
    const search = document.getElementById("search").value;

    await fetch(baseUrl+'/items/'+search, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        if (item.success == true) {
            product_items_container.innerHTML = ``;
            product_items_container_search.innerHTML = ``;
            product_items_container_fill.innerHTML = ``;
            // product_items_container_search.style.display = 'grid';

            for (let i = 0; i < item.data.length; i++) {
                const product_item = document.createElement("div");
                product_item.classList.add('product_item');
                
                var imgurl = item.data[i].img_url;
                product_item.innerHTML = `
                <div class="item_image">
                    <img src=${imgurl} alt="">
                </div>
                <div class="item_details">
                    <div class="product_details">
                        <div class="item_info">
                            <h3 class="product_name">${item.data[i].name.replace(item.data[i].name[0], item.data[i].name[0].toUpperCase())}</h3>
                            <p>Quantity: <span>${item.data[i].quantity}</span></p>
                            <p>Location: <span>${item.data[i].location.replace(item.data[i].location[0], item.data[i].location[0].toUpperCase())}</span></p>
                            <p>Price: <span>₦${item.data[i].price}</span></p>
                        </div>
                    </div>
                    <div class="react_btns">
                        <button class="like"><img src="/Frontend/assets/images/icon/heart.png" alt=""></button>
                        <button class="addtocart"><img src="/Frontend/assets/images/icon/add-to-favorites-svgrepo-com.png" alt=""></button>
                    </div>
                    <div class="item_description">
                        <p>${item.data[i].description}</p>
                    </div>
                </div>`
                product_items_container_search.appendChild(product_item);
            }
        return;
        }
    });
}


async function filterProducts(id) {
    const product_items_container = document.getElementById("product_items_container");
    const product_items_container_search = document.getElementById("product_items_container_search");
    const product_items_container_fill = document.getElementById("product_items_container_fill");
    const btn_value = document.getElementById(`btnfill${id}`).value;

    await fetch(baseUrl+'/items/'+btn_value, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        if (item.success == true) {
            product_items_container.innerHTML = ``;
            product_items_container_search.innerHTML = ``;
            product_items_container_fill.innerHTML = ``;

            for (let i = 0; i < item.data.length; i++) {
                const product_item = document.createElement("div");
                product_item.classList.add('product_item');
                
                var imgurl = item.data[i].img_url;
                product_item.innerHTML = `
                <div class="item_image">
                    <img src=${imgurl} alt="">
                </div>
                <div class="item_details">
                    <div class="product_details">
                        <div class="item_info">
                            <h3 class="product_name">${item.data[i].name.replace(item.data[i].name[0], item.data[i].name[0].toUpperCase())}</h3>
                            <p>Quantity: <span>${item.data[i].quantity}</span></p>
                            <p>Location: <span>${item.data[i].location.replace(item.data[i].location[0], item.data[i].location[0].toUpperCase())}</span></p>
                            <p>Price: <span>₦${item.data[i].price}</span></p>
                        </div>
                    </div>
                    <div class="react_btns">
                        <button class="like"><img src="/Frontend/assets/images/icon/heart.png" alt=""></button>
                        <button class="addtocart"><img src="/Frontend/assets/images/icon/add-to-favorites-svgrepo-com.png" alt=""></button>
                    </div>
                    <div class="item_description">
                        <p>${item.data[i].description}</p>
                    </div>
                </div>`
                product_items_container_fill.appendChild(product_item);
            }
        return;
        }
    });
}
