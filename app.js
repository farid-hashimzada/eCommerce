const getData = e => {
    fetch('http://localhost:3000/products')
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
                        <a href="#" class="viewProduct" data-key=${products.id}>${products.description}</a>
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



    data.forEach((product) => {
        if (product.id === currentProductId) {
            console.log(product)
            productImage.src = product.image
            cardPrice.innerHTML = product.price + " " + product.currency
            productDescription.innerHTML = product.description

            ProductModal.style.display = 'flex'
            document.querySelector('body').style.overflow = "hidden"
        }
    })
}

closeModal.addEventListener('click', e => {
    document.querySelector('body').style.overflow = "visible"
    ProductModal.style.display = 'none'
})

