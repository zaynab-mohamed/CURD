var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productcategoriesInput = document.getElementById('productcategories');
var productDescInput = document.getElementById('productDesc');
var productImageInput = document.getElementById('productImage');
// console.log(productNameInput , productPriceInput ,productcategoriesInput , productDescInput , productImageInput)
var productsContainer = [];
if (localStorage.getItem("productsContainer") !== null) {
  productsContainer = JSON.parse(localStorage.getItem("productsContainer"));
  displayProducts()
}

var btnAdd = document.getElementById("btnAdd")
var btnUpdate = document.getElementById("btnUpdate")

// displayProducts();
// }
function addproduct() {
  if (validname() && validprice() && validImage()) {
    var product = {
      code: productNameInput.value.trim(),
      price: productPriceInput.value,
      category: productcategoriesInput.value.trim(),
      desc: productDescInput.value.trim(),
      image: productImageInput.files[0] ? `image/${productImageInput.files[0]?.name}` : "image/1.jpg",
    }

    productsContainer.push(product);
    localStorage.setItem("productsContainer", JSON.stringify(productsContainer));
    displayProducts();
    clearform()
  }
}
function clearform() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productcategoriesInput.value = null;
  productDescInput.value = null;
  productImageInput.value = null;
  productNameInput.classList.remove('is-valid')
  productPriceInput.classList.remove('is-valid')
  productImageInput.classList.remove('is-valid')



}
function displayProducts() {
  var cartona = "";
  for (var i = 0; i < productsContainer.length; i++) {
    cartona += createCols(i);
  }
  document.getElementById('rowData').innerHTML = cartona;
}



function deleteItem(index) {
  productsContainer.splice(index, 1);
  console.log(productsContainer)
  localStorage.setItem("productsContainer", JSON.stringify(productsContainer));
  displayProducts()
}
function searchData() {
  var term = searchinput.value;
  var cartona = "";
  for (var i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].code.toLowerCase().includes(term.toLowerCase())) {
      cartona += createCols(i)
    }

  }
  document.getElementById('rowData').innerHTML = cartona;
}
function createCols(i) {
  return `
        <div class="col">
      <div class="card">
        <img src="${productsContainer[i].image}" class="card-img-top" alt="${productsContainer[i].code}">
        <div class="card-body">
          <h5 class="card-title">${productsContainer[i].code}</h5>
           <h3 class="h5"><span class="fw-bolder">${productsContainer[i].price}</span></h3>
          <h3 class="h5"><span class="fw-bolder">${productsContainer[i].category}</span></h3>
          <p class="card-text">${productsContainer[i].desc}</p>
             <div class="card-footer text-center">
<button onclick="deleteItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
<button class="btn btn-outline-warning btn-sm" onclick='setUpdateInfo(${i})'>Update</button>

</div>
         

        </div>
      </div>
    </div>`;
}

function setUpdateInfo(index) {
  currentIndex = index;
  productNameInput.value = productsContainer[index].code;
  productPriceInput.value = productsContainer[index].price;
  productcategoriesInput.value = productsContainer[index].category;
  productDescInput.value = productsContainer[index].desc;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none")
}
function UpdateProduct() {
  var product = {
    code: productNameInput.value,
    price: productPriceInput.value,
    category: productcategoriesInput.value,
    desc: productDescInput.value,
    image: productImageInput.files[0] ? `image/${productImageInput.files[0]?.code}` : "image/1.jpg",
  };
  productsContainer.splice(currentIndex, 1, product);
  localStorage.setItem("productsContainer", JSON.stringify(productsContainer));
  displayProducts()
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none")
  clearform()
}
/////////////////validation basic/////////////////
function validname() {
  var regex = /^[a-zA-Z][a-zA-z0-9]{3,19}$/;
  var text = productNameInput.value;
  var msgName = document.getElementById("msgName");

  if (regex.test(text)) {
    // console.log("match")
    productNameInput.classList.add("is-valid")
    productNameInput.classList.remove("is-invalid")
    msgName.classList.add("d-none")

    return true;
  } else {
    // console.log("no match")
    productNameInput.classList.add("is-invalid")
    productNameInput.classList.remove("is-valid")
    msgName.classList.remove("d-none")

    return false;

  }
}


function validprice() {
  var regex = /^\d{1,10}(\.\d{1,2})?$/;

  var text = productPriceInput.value;
  var msgPrice = document.getElementById("msgPrice");

  if (regex.test(text)) {
    // console.log("match")
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    msgPrice.classList.add("d-none");

    return true;
  } else {
    // console.log("no match")
    productPriceInput.classList.add("is-invalid")
    productPriceInput.classList.remove("is-valid")
    msgPrice.classList.remove("d-none")

    return false;

  }
}

function validImage() {
  var regex = /^.{1,}\.(jpg|png|jpeg|svg)$/;

  var text = productImageInput.value;
  var msgImage = document.getElementById("msgImage");

  if (regex.test(text)) {
    // console.log("match")
    productImageInput.classList.add("is-valid");
    productImageInput.classList.remove("is-invalid");
    msgImage.classList.add("d-none");

    return true;
  } else {
    // console.log("no match")
    productImageInput.classList.add("is-invalid")
    productImageInput.classList.remove("is-valid")
    msgImage.classList.remove("d-none")

    return false;

  }
}



/////////////////validation Advanced////////////////

