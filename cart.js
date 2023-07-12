let url = "http://localhost:3000/products/";
const productsContainer = document.querySelector(".productTable");
const productCount = document.getElementById("productCount");
const confirmDeleteModal = document.querySelector(".confirmDeleteModal");
const cancelButton = document.querySelector(".cancelButton");
const deleteButton = document.querySelector(".deleteButton");
const successAlert = document.querySelector(".successAlert");

let deletedProductİd = 0;

async function getProducts() {
  try {
    let response = await fetch(url);
    return await response.json();
  } catch {
    (err) => console.log(err);
  }
}

async function renderProducts() {
  let count = 0;
  let data = "";
  productsContainer.innerHTML = "";

  products = await getProducts();

  products.forEach((product) => {
    if (product.addedBasket) {
      data += `<tr>
      <td><i class="material-icons" data-id=${
        product.id
      } onClick={deleteProduct(this)}>clear</i></td>
      <td>${product.description}</td>
      <td>${product.price + product.currency}</td>
      <td>1</td>
      <td>${product.price + product.currency}</td></tr>`;
    }
    product.addedBasket ? (count += 1) : null;
  });

  productCount.innerHTML = count;
  productsContainer.innerHTML += data;
}
renderProducts();

const removeProductOnData = (id) => {
  fetch(`${url + id}`, {
    method: "PATCH",
    body: JSON.stringify({
      addedBasket: false,
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
      renderProducts();
    });
};

const showDeleteModal = () => {
  confirmDeleteModal.classList.add("showModal");
};

const closeModal = () => confirmDeleteModal.classList.remove("showModal");
cancelButton.addEventListener("click", () => closeModal());

const deleteProduct = (e) => {
  deletedProductİd = e.dataset.id;
  showDeleteModal();
};

deleteButton.addEventListener("click", (e) => {
  removeProductOnData(deletedProductİd);
  closeModal();
});
