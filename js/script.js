let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.querySelector(".submit");
let mood = "create";
let temp; // i will put i in here

let proData;
if (localStorage.product != null) {
  proData = JSON.parse(localStorage.product); //put the value of product key (old array of obj) in prodata
} else {
  proData = [];
}

///
//
///

function getTotal() {
  if (price.value != "" && price.value != 0) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
  } else {
    total.innerHTML = "";
  }
}

//
//
//
function create() {
  let obj = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // count
  if (title.value != "" && price.value != "" && count.value < 10000) {
    if (mood == "create") {
      if (obj.count > 1) {
        for (let i = 1; i <= obj.count; i++) {
          proData.push(obj);
        }
      } else {
        proData.push(obj);
      }
      clearData();
    } else {
      // update
      proData[temp] = obj;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "inline-block";
    }
  }

  // proData.push(obj);
  // save to local storage
  localStorage.setItem("product", JSON.stringify(proData));

  readData();
  clearData();
  getTotal();
}

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
function readData() {
  getTotal();
  let table = "";
  for (var i = 0; i < proData.length; i++) {
    table += ` 
        <tr>
        <td>${i + 1}</td>
        <td >${proData[i].title}</td>
        <td>${proData[i].price}</td>
        <td>${proData[i].taxes}</td>
        <td>${proData[i].ads}</td>
        <td>${proData[i].discount}</td>
        <td>${proData[i].category}</td>
        <td>${proData[i].total}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteItem(${i})">delete</button></td>
      </tr> `;
  }
  document.querySelector(".aa").innerHTML = table;

  if (proData[0] != null) {
    document.getElementById(
      "deleteAll"
    ).innerHTML = `Delete All (${proData.length})`;

    document.getElementById("deleteAll").style.display = "inline-block";
  } else {
    document.getElementById("deleteAll").style.display = "none";
  }
}
readData();

function deleteItem(i) {
  proData.splice(i, 1); // delete that product(obj) from the array
  localStorage.product = JSON.stringify(proData);
  // if u delete element from array it still be there in local storage so u need to update the locla storage (put the new array in it)
  readData();
}

function delAll() {
  proData = [];
  localStorage.product = JSON.stringify(proData);
  readData();
}

function updateData(i) {
  title.value = proData[i].title;
  price.value = proData[i].price;
  ads.value = proData[i].ads;
  taxes.value = proData[i].taxes;
  discount.value = proData[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = proData[i].category;
  submit.innerHTML = "update";
  mood = "update";
  temp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMode = "title";
let btnSearch = document.getElementById("search");
function getSearchMode(id) {
  if (id == "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  btnSearch.placeholder = "Search By " + searchMode;
  btnSearch.focus();
  btnSearch.value = "";
  readData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < proData.length; i++) {
    if (searchMode == "title") {
      if (proData[i].title.includes(value.toLowerCase())) {
        table += ` 
          <tr>
          <td>${i + 1}</td>
          <td>${proData[i].title}</td>
          <td>${proData[i].price}</td>
          <td>${proData[i].taxes}</td>
          <td>${proData[i].ads}</td>
          <td>${proData[i].discount}</td>
          <td>${proData[i].category}</td>
          <td>${proData[i].total}</td>
          <td><button id="update" onclick="updateData(${i})">update</button></td>
          <td><button id="delete" onclick="deleteItem(${i})">delete</button></td>
        </tr> `;
      }
    } else {
      if (proData[i].category.includes(value.toLowerCase())) {
        table += ` 
          <tr>
          <td>${i + 1}</td>
          <td>${proData[i].title}</td>
          <td>${proData[i].price}</td>
          <td>${proData[i].taxes}</td>
          <td>${proData[i].ads}</td>
          <td>${proData[i].discount}</td>
          <td>${proData[i].category}</td>
          <td>${proData[i].total}</td>
          <td><button id="update" onclick="updateData(${i})">update</button></td>
          <td><button id="delete" onclick="deleteItem(${i})">delete</button></td>
        </tr> `;
      }
    }
  }
  document.querySelector(".aa").innerHTML = table;
}
var icon = document.getElementById("night");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
};
