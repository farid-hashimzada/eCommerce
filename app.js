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
                    <img src="../imgs/unsplash_KjRkxQ2NNXA.png" alt="girl">
                    <div class="card-content">
                        <h4>Plain White Shirt</h4>
                        <span>$29.00</span>
                    </div>
                </div>
        </div>
        `
    });
}
