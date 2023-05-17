const url = 'http://localhost:3000/products/'
const getData = e => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            getProducts(data);
        })
        .catch(err => console.log(err))
}

getData()


const getProducts = data => {
    data.forEach(products => {
        let data = `
        <div class="discover-cards">
                <div class="card">
                    <img src=${products.image}>
                    <div class="card-content">
                        <a href="javascript:void(0)" class="viewProduct" data-key=${products.id}>${products.description}</a>
                        <span>${products.price} ${products.currency}</span>
                    </div>
                </div>
        </div>
        `
        product.innerHTML += data;
    });
    const viewProductButton = document.querySelectorAll('.viewProduct')
    viewProductButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            getModal(data, +e.target.dataset.key)
        })
    })
}

const getModal = (data, currentProductId) => {
    const productImage = document.querySelector('#productImage')
    const cardPrice = document.querySelector('.card-price')
    const productDescription = document.querySelector('#productDescription')
    const addToCartButton = document.querySelector('#addToCartButton')


    data.forEach((product) => {
        if (product.id === currentProductId) {
            productImage.src = product.image
            cardPrice.innerHTML = product.price + " " + product.currency
            productDescription.innerHTML = product.description

            ProductModal.style.display = 'flex'
            document.querySelector('body').style.overflow = "hidden";

            addToCartButton.addEventListener("click", (e) => {
                fetch(url + product.id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        addedBasket: true,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        e.target.innerHTML = 'Product add to card' // Handle the response from the server
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });

        };

    });

};

closeModal.addEventListener('click', e => {
    document.querySelector('body').style.overflow = "visible"
    ProductModal.style.display = 'none'
})

