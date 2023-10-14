// ========== Selectors ==========
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");

let mood = "create";
let searchMode = "title";

let global;
// ========== Function Get Total ==========
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
  } else {
    total.innerHTML = "";
  }
}

// ========== Function Create ==========
// Data Array
let dataPro = [];

//   Check If LocalStorage Not Empty
if (localStorage.getItem("product")) {
  dataPro = JSON.parse(window.localStorage.getItem("product"));
}
// ========== Function Create And Add To LocalStorage ==========
// Button Create
submit.onclick = function () {
  //  Data Object
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value.toLowerCase(),
    total: total.innerHTML,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count <= 100
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[global] = newPro;

      count.style.display = "block";
      submit.innerHTML = "Create";
      mood = "create";
    }
    clearData();
  }

  // Add To LocalStorage
  window.localStorage.setItem("product", JSON.stringify(dataPro));

  // Clear Data

  // Show Data
  showData();
};
// Show Data
showData();

// ========== Function Clear ==========

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// ========== Function Show Data ==========
function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick = " updateData(${i}) " class="btn-hover" id="update">update</button></td>
    <td><button onclick = " deleteData(${i}) " class="btn-hover" id="delete">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  // Button Delete All
  let btnDeleteAll = document.getElementById("deleteAll");

  if (dataPro.length > 0) {
    btnDeleteAll.innerHTML = `<button class = "delete-all btn-hover" onclick = "deleteAll()">Delete All (${dataPro.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = ``;
  }
}

// ========== Function Delete Data ==========
function deleteData(i) {
  dataPro.splice(i, 1);

  localStorage.product = JSON.stringify(dataPro);

  showData();
}

// ========== Function Delete All ==========
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// ========== Function Delete All ==========
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "UPDATE";
  mood = "update";
  global = i;

  scroll({
    behavior: "smooth",
    top: "0",
  });
}

// ========== Function Get Search ==========
function getSearch(id) {
  const search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = "Search By " + searchMode;
  search.value = "";
  showData();
}

// ========== Function Search Data ==========
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMode === "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = " updateData(${i}) " class="btn-hover" id="update">update</button></td>
        <td><button onclick = " deleteData(${i}) " class="btn-hover" id="delete">delete</button></td>
        </tr>
        `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = " updateData(${i}) " class="btn-hover" id="update">update</button></td>
        <td><button onclick = " deleteData(${i}) " class="btn-hover" id="delete">delete</button></td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
