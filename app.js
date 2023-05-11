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
                        <h4>${products.description}</h4>
                        <span>${products.price} ${products.currency}</span>
                    </div>
                </div>
        </div>
        `
        product.innerHTML += data;
    });
}
