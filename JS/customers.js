// Define Variables ===>
let name = document.getElementById("name");
let date = document.getElementById("date");

let product = document.getElementById("product");
let count = document.getElementById("count");
let price = document.getElementById("price");
let addProduct = document.getElementById("add-product");

let totalPrice = document.getElementById("total-price");
let paid = document.getElementById("Paid");

let create = document.getElementById("create");

// Add Product ===>
let currentProducts = [];

addProduct.addEventListener("click", addNewProduct);
function addNewProduct() {
  let newProduct = {
    product_name: product.value,
    count: count.value,
    price: price.value,
  };
  currentProducts.push(newProduct);

  product.value = "";
  count.value = "";
  price.value = "";
}

// Create Invoice ===>
create.addEventListener("click", createInvoice);

// Check Invoices In localStorage
let invoices = [];
if (localStorage.getItem("invoices")) {
  invoices = JSON.parse(localStorage.getItem("invoices"));
} else {
  invoices = [];
}

function createInvoice() {
  let newInvoice = {
    name: name.value,
    date: date.value,
    products: currentProducts,
    total_price: totalPrice.value,
    paid: paid.value,
  };

  // Check Name & Date Are Full
  if (name.value != "" && date.value != "") {
    invoices.push(newInvoice);
    clearData();
    showInvoices();
  }

  // Save In localStorage
  localStorage.setItem("invoices", JSON.stringify(invoices));

  // Clear Current Products For Next Invoice
  currentProducts = [];
}

// Clear Inputs ===>
function clearData() {
  name.value = "";
  date.value = "";
  product.value = "";
  count.value = "";
  price.value = "";
  totalPrice.value = "";
  paid.value = "";
}

// Show Invoices ===>
let myHtml = "";
function showInvoices() {
  // Reset HTML
  myHtml = "";
  document.querySelector(".invoices").innerHTML = "";

  // Generate Invoices HTML
  for (let i = 0; i < invoices.length; i++) {
    let residual = invoices[i].total_price - invoices[i].paid;

    // Create Invoice HTML
    myHtml += `
            <div class="invoices-item">
                <div class="logo">
                    <img src="Images/BIO_VET.jpg" alt="logo">
                    <h2>bio vet</h2>
                </div>
                <div class="invoice-customer">
                    <p id="invoice-date">${invoices[i].date}</p>
                    <h3 id="invoice-name">${invoices[i].name}</h3>
                </div>
                <table border="2">
                    <thead>
                        <tr>
                            <th>الصنف</th>
                            <th>العدد</th>
                            <th>السعر</th>
                            <th>الاجمالي</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${getProducts(invoices[i].name)}
                    </tbody>
                </table>
                <div class="monay">
                    <div id="total">${invoices[i].total_price}</div>
                    <div>
                        <div id="pay">${invoices[i].paid}</div>
                        <div id="residual">${residual}</div>
                    </div>
                </div>
            </div>
        `;
    document.querySelector(".invoices").innerHTML = myHtml;
  }
}

// Get Products ===>
function getProducts(username) {
  let invoice = invoices.find((inv) => inv.name === username);
  let myProducts = invoice.products;
  let productHTML = "";
  for (let i = 0; i < myProducts.length; i++) {
    let totalPrice = myProducts[i].price * myProducts[i].count;
    productHTML += `
            <tr>
                <td>${myProducts[i].product_name}</td>
                <td>${myProducts[i].count}</td>
                <td>${myProducts[i].price}</</td>
                <td>${totalPrice}</td>
            </tr>
        `;
  }
  return productHTML;
}

// Search ===>
let searchMode = "name";

function getSearchMode(id) {
  let search = document.getElementById("search");
  search.focus();

  // Check ID
  if (id == "by-name") {
    searchMode = "name";
  } else {
    searchMode = "history";
  }

  // Sutup Search
  search.placeholder = `Search By ${searchMode}`;
  showInvoices();
  search.value = "";
}

function searchInvoice(value) {
  let invoicesContainer = "";
  for (let i = 0; i < invoices.length; i++) {
    let residual = invoices[i].total_price - invoices[i].paid;
    // Check searchMode
    if (searchMode == "name") {
      // Check Char in name or not
      if (invoices[i].name.toLowerCase().includes(value.toLowerCase())) {
        invoicesContainer += `
            <div class="invoices-item">
                <div class="logo">
                    <img src="Images/BIO_VET.jpg" alt="logo">
                    <h2>bio vet</h2>
                </div>
                <div class="invoice-customer">
                    <p id="invoice-date">${invoices[i].date}</p>
                    <h3 id="invoice-name">${invoices[i].name}</h3>
                </div>
                <table border="2">
                    <thead>
                        <tr>
                            <th>الصنف</th>
                            <th>العدد</th>
                            <th>السعر</th>
                            <th>الاجمالي</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${getProducts(invoices[i].name)}
                    </tbody>
                </table>
                <div class="monay">
                    <div id="total">${invoices[i].total_price}</div>
                    <div>
                        <div id="pay">${invoices[i].paid}</div>
                        <div id="residual">${residual}</div>
                    </div>
                </div>
            </div>
        `;
      }
    } else {
      // Check Char in date or not
      if (invoices[i].date.includes(value)) {
        invoicesContainer += `
            <div class="invoices-item">
                <div class="logo">
                    <img src="Images/BIO_VET.jpg" alt="logo">
                    <h2>bio vet</h2>
                </div>
                <div class="invoice-customer">
                    <p id="invoice-date">${invoices[i].date}</p>
                    <h3 id="invoice-name">${invoices[i].name}</h3>
                </div>
                <table border="2">
                    <thead>
                        <tr>
                            <th>الصنف</th>
                            <th>العدد</th>
                            <th>السعر</th>
                            <th>الاجمالي</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${getProducts(invoices[i].name)}
                    </tbody>
                </table>
                <div class="monay">
                    <div id="total">${invoices[i].total_price}</div>
                    <div>
                        <div id="pay">${invoices[i].paid}</div>
                        <div id="residual">${residual}</div>
                    </div>
                </div>
            </div>
        `;
      }
    }
    document.querySelector(".invoices").innerHTML = invoicesContainer;
  }
}

showInvoices();
