const url = 'http://localhost:3000/products/';

const getData = (e) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            getProducts(data);
        })
        .catch(err => console.log(err))
}

getData()


const getProducts = data => {
    product.innerHTML = "";
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
            getModal(data, e.target.dataset.key)
        })
    })
}

const addToCard = (data, currentProductId, e) => {
    console.log(data[currentProductId].addedBasket)
    if (data[currentProductId].addedBasket) {
        // alert('This product added to basket: ' + data[currentProductId].id)
    } else {
        fetch(url + currentProductId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                addedBasket: true,
            }),
        })
            .then(response => response.json())
            .then(data => {
                e.target.innerHTML = 'ADDED' // Handle the response from the server
                getData();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

const getModal = (data, currentProductId) => {
    const productImage = document.querySelector('#productImage')
    const cardPrice = document.querySelector('.card-price')
    const productDescription = document.querySelector('#productDescription')
    let addToCartButton = document.querySelector('.addToCartButton')
    addToCartButton.dataset.key = currentProductId

    data.forEach(item => {
        if (+item.id === +currentProductId) {
            productImage.src = item.image
            cardPrice.innerHTML = item.price + " " + item.currency
            productDescription.innerHTML = item.description;
            addToCartButton.innerHTML = item.addedBasket ? 'ADDED' : 'ADD TO CARD';
            
        }
    })

    ProductModal.style.display = 'flex'
    document.querySelector('body').style.overflow = "hidden";

    addToCartButton.addEventListener("click", e => addToCard(data, currentProductId, e));
};

closeModal.addEventListener('click', e => {
    document.querySelector('body').style.overflow = "visible"
    ProductModal.style.display = 'none'
})

