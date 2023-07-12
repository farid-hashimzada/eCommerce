let url = "http://localhost:3000/products/";
const productsContainer = document.getElementById("productsContainer");
const productContainer = document.querySelectorAll(".discover-cards");
const productCount = document.getElementById("productCount");
const successAlert = document.querySelector(".successAlert");
const errorAlert = document.querySelector(".errorAlert");
let count = 0;

//modal
const modal = document.querySelector(".productModal");
const closeModalButton = document.getElementById("closeModal");
const productImage = document.querySelector("#productImage");
const totalPrice = document.querySelector(".totalPrice");
const discountedPrice = document.querySelector(".discountedPrice");
const aboutProduct = document.querySelector(".aboutProduct");
const productDescription = document.querySelector("#productDescription");
let addToCartButton = document.querySelector(".addToCartButton");

let currentProduct = "";
let products = "";

async function getProducts() {
  try {
    let response = await fetch(url);
    return await response.json();
  } catch {
    (err) => console.log(err);
  }
}

async function renderProducts() {
  products = await getProducts();
  products.forEach((product) => {
    let data = `
            <div class="discover-cards" data-id=${product.id}>
                <div class="card" data-id=${product.id}>
                    <img src=${product.image}>
                    <div class="card-content"><a href="javascript:void(0)" class="viewProduct"
                        data-key=${product.id}>${product.description}</a><span>${product.price} ${product.currency}</span>
                    </div>
                </div>
            </div>`;

    product.addedBasket ? (count += 1) : null;
    productCount.innerHTML = count;
    productsContainer.innerHTML += data;
    getCurrentProduct(product);
  });
}
renderProducts();

const getCurrentProduct = (product) => {
  const viewProductButton = document.querySelectorAll(".discover-cards");
  viewProductButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      const currentProductId = e.target.parentNode.parentNode.dataset.id;
      if (+product.id === +currentProductId) currentProduct = product;
      getModal();
    });
  });
};

//Modal
const getModal = () => {
  modal.style.display = "flex";
  document.querySelector("body").style.overflow = "hidden";
  productImage.src = currentProduct.image;
  totalPrice.innerHTML = `${currentProduct.currency}  ${(
    currentProduct.price + currentProduct.discount
  ).toFixed(2)}`;

  discountedPrice.innerHTML = `${currentProduct.currency} ${currentProduct.price}`;
  productDescription.innerHTML = currentProduct.description;
  aboutProduct.innerHTML = currentProduct.aboutProduct;
  addToCartButton.dataset.id = currentProduct.id;
  addToCartButton.innerHTML = currentProduct.addedBasket
    ? "ADDED TO CART"
    : "ADD TO CART";
};

closeModalButton.addEventListener("click", (e) => {
  modal.style.display = "none";
  document.querySelector("body").style.overflow = "visible";
});

//Add to cart
const addToCart = (id) => {
  fetch(`${url + id}`, {
    method: "PATCH",
    body: JSON.stringify({
      addedBasket: true,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      successAlert.classList.add("showAlert");
      setTimeout(() => {
        successAlert.classList.remove("showAlert");
      }, 3000);
      currentProduct.addedBasket = true;
    });
};

async function changeProduct(e) {
  products = await getProducts();
  products.map((product) => {
    if (+product.id === +e.target.dataset.id) {
      if (!product.addedBasket) {
        addToCart(product.id);
        e.target.innerHTML = "ADDED TO CART";
        count++;
        productCount.innerHTML = count;
      } else {
        errorAlert.classList.add("showAlert");
        setTimeout(() => {
          errorAlert.classList.remove("showAlert");
        }, 3000);
      }
    }
  });
}
addToCartButton.addEventListener("click", (e) => {
  changeProduct(e);
});
