// Define Variables ===>
let title = document.getElementById("title");
let price = document.getElementById("price");
let stored = document.getElementById("stored");
let sale = document.getElementById("sale");
let discount = document.getElementById("discount");
let totalProduct = document.getElementById("total-product");
let totalGain = document.getElementById("total-gain");
let create = document.getElementById("create");

let mode = "create";

// To Storage ID In Update
let tmp = "";

// Get Total ===>
function getTotal() {
  // Check Price Exist or Not
  if (price.value != "") {
    // Total Product
    let products = +stored.value - +sale.value;
    totalProduct.innerHTML = products;

    // Total Gain
    let gain = (+price.value - +discount.value) * sale.value;
    totalGain.innerHTML = gain;
  }

  // Change Totals Color
  if (stored.value != "") {
    totalProduct.style.backgroundColor = "green";
  } else {
    totalProduct.style.backgroundColor = "red";
  }

  if (sale.value != "") {
    totalGain.style.backgroundColor = "green";
  } else {
    totalGain.style.backgroundColor = "red";
  }
}

// Create Product ===>

let products;
// Check LocalStorage
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
} else {
  products = [];
}

create.addEventListener("click", createProduct);
function createProduct() {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    stored: stored.value,
    sale: sale.value,
    discount: discount.value,
    products: totalProduct.innerHTML,
    gain: totalGain.innerHTML,
  };

  // Check Inputs Are Full
  if (newProduct.title != "" && newProduct.price != "") {
    // Check Mode
    if (mode == "create") {
      products.push(newProduct);
    } else {
      products[tmp] = newProduct;
      create.innerHTML = "Create";
      mode = "create";
      getTotal();
    }
    
    clearData();
  }

  // Save In localStorage
  localStorage.setItem("products", JSON.stringify(products));
}

// Clear Data ===>
function clearData() {
  title.value = "";
  price.value = "";
  stored.value = "";
  sale.value = "";
  discount.value = "";
  totalProduct.innerHTML = "";
  totalGain.innerHTML = "";
}

// Show Products ===>
create.addEventListener("click", showProducts);
function showProducts() {
  getTotal();
  let table = "";
  document.querySelector("tbody").innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    table += `
            <tr>
                <td>${i + 1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].stored}</td>
                <td>${products[i].sale}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].products}</td>
                <td>${products[i].gain}</td>
                <td>
                    <button onclick="updateProduct(${i})" class="table-btn" id="update">update</button>
                </td>
                <td>
                    <button onclick="deleteProduct(${i})" class="table-btn" id="delete">delete</button>
                </td>
            </tr>
        `;
    document.querySelector("tbody").innerHTML = table;
  }

  // Check Products In localStorage Is Empty
  if (
    localStorage.getItem("products") &&
    localStorage.getItem("products") != "[]"
  ) {
    document.getElementById("delete-all").innerHTML = `
            <button onclick="deleteAllProducts()" class="delete-all">delete all (${products.length})</button>
        `;
  } else {
    document.getElementById("delete-all").innerHTML = "";
  }
}
showProducts();

// Delete Product ===>
function deleteProduct(index) {
  products.splice(index, 1);

  // Delete From localStorage
  localStorage.setItem("products", JSON.stringify(products));

  // Show Products After Delete
  showProducts();
}

function deleteAllProducts() {
  localStorage.removeItem("products");
  products.splice(0);
  showProducts();
}

// Update Product ===>
function updateProduct(index) {
  title.value = products[index].title;
  price.value = products[index].price;
  stored.value = products[index].stored;
  sale.value = products[index].sale;
  discount.value = products[index].discount;
  getTotal();
  create.innerHTML = "Update";

  // Change Mode
  mode = "update";

  // Storage ID
  tmp = index;

  // Scroll Top
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search ===>
let searchMode = "title";

function getSearchMode(id) {
  let search = document.getElementById("search");
  search.focus();

  // Check ID
  if (id == "by-title") {
    searchMode = "title";
  } else {
    searchMode = "price";
  }

  // Sutup Search
  search.placeholder = `Search By ${searchMode}`;
  showProducts();
  search.value = "";
}

function searchProduct(value) {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    // Check searchMode
    if (searchMode == "title") {
      // Check Char in title or not
      if (products[i].title.includes(value.toLowerCase())) {
        table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].stored}</td>
                    <td>${products[i].sale}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].products}</td>
                    <td>${products[i].gain}</td>
                    <td>
                        <button onclick="updateProduct(${i})" class="table-btn" id="update">update</button>
                    </td>
                    <td>
                        <button onclick="deleteProduct(${i})" class="table-btn" id="delete">delete</button>
                    </td>
                </tr>
            `;
      }
    } else {
      // Check Char in price or not
      if (products[i].price.includes(value)) {
        table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].stored}</td>
                    <td>${products[i].sale}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].products}</td>
                    <td>${products[i].gain}</td>
                    <td>
                        <button onclick="updateProduct(${i})" class="table-btn" id="update">update</button>
                    </td>
                    <td>
                        <button onclick="deleteProduct(${i})" class="table-btn" id="delete">delete</button>
                    </td>
                </tr>
            `;
      }
    }
    document.querySelector("tbody").innerHTML = table;
  }
}
