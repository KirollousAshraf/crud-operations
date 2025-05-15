"use strict"
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productImage = document.getElementById("productImage");
let productDescription = document.getElementById("productDescription");
let productContainer = []; // مخرن بتاعنا

// localStorage //
if (localStorage.getItem("productContainer") !== null) {
    productContainer = JSON.parse(localStorage.getItem("productContainer"));
    displayProducts();
}
// localStorage //



// AddProduct //
function addProduct() {
    // image //
    let staticImg = "1.jpg"
    if (productImage.files["0"] != undefined) {
        staticImg = productImage.files["0"].name;
    }
    // image //
    let regexError = validateInputs()
    if (regexError === true) {
        const Product = {
            name: productName.value,
            price: Number(productPrice.value),
            category: productCategory.value,
            image: staticImg,
            description: productDescription.value
        };
        productContainer.push(Product);
        clearInputs();
        displayProducts();
        // localStorage
        localStorage.setItem("productContainer", JSON.stringify(productContainer));
        // localStorage
    } else {
        alert(regexError)
    }
}
// AddProduct //

// clearInputs //
function clearInputs() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productImage.value = "";
    productDescription.value = "";
}
// clearInputs //

// displayProducts //
function displayProducts() {
    let productList = "";
    for (let i = 0; i < productContainer.length; i++) {
        productList += `        <div class="col-lg-3 col-md-6 col-sm-12">
          <div class="card mb-3 h-100">
            <div class="card-img">
              <img src="./Imgs/${productContainer[i].image}" alt="hard">
            </div>
            <div class="card-body">
              <h2>${productContainer[i].name}</h2>
              <hr>
              <h3>productPrice: ${productContainer[i].price}</h3>
              <hr>
              <h4>productCategory: ${productContainer[i].category}</h4>
              <hr>
              <p>productDescription: ${productContainer[i].description}</p>
            </div>
            <div class="card-buttons mt-2 text-center">
              <button class="btn btn-danger w-75 mb-2" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button>
              <button class="btn btn-warning w-75 mb-2" onclick="updateProduct(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
            </div>
          </div>
        </div>`
    }
    document.getElementById("list").innerHTML = productList;
}
// displayProducts //

// deleteAllProducts //
function deleteAllProducts() {
    if (confirm("Are you sure you want to delete all products?")) {
        productContainer.splice(0)
        displayProducts();
        // localStorage
        localStorage.setItem("productContainer", JSON.stringify(productContainer));
        // localStorage
    }

}
// deleteAllProducts //

// deleteOneProduct //
function deleteProduct(i) {
    if (confirm("Are you sure you want to delete this product?")) {
        productContainer.splice(i, 1);
        displayProducts();
        // localStorage
        localStorage.setItem("productContainer", JSON.stringify(productContainer));
        // localStorage
    }

}
// deleteOneProduct //

// updateProduct //
function updateProduct(i) {
    productName.value = productContainer[i].name;
    productPrice.value = productContainer[i].price;
    productCategory.value = productContainer[i].category;
    productDescription.value = productContainer[i].description;
    let oldImage = productContainer[i].image;

    let addProductBtn = document.getElementById("addProduct");
    addProductBtn.innerHTML = "Update Product";

    addProductBtn.onclick = function () {
        let updatedImage = productImage.files[0] ? productImage.files[0].name : oldImage;

        productContainer[i].name = productName.value;
        productContainer[i].price = Number(productPrice.value);
        productContainer[i].category = productCategory.value;
        productContainer[i].description = productDescription.value;
        productContainer[i].image = updatedImage;
        clearInputs();
        displayProducts();

        // localStorage
        localStorage.setItem("productContainer", JSON.stringify(productContainer));
        // localStorage

        // reset to defuelt //
        addProductBtn.innerHTML = "Add Product";
        addProductBtn.onclick = addProduct; // 
    };
}
// updateProduct //

// searchProduct //
// let searchelem = document.getElementById("search") // 1
function searchProduct(term) {
    // let term = searchelem.value; // 1
    let productList = "";
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.includes(term.toLowerCase())) {
            productList += `        <div class="col-lg-3 col-md-6 col-sm-12">
      <div class="card mb-3 h-100">
        <div class="card-img">
          <img src="./Imgs/${productContainer[i].image}" alt="hard">
        </div>
        <div class="card-body">
          <h2>${productContainer[i].name}</h2>
          <hr>
          <h3>productPrice: ${productContainer[i].price}</h3>
          <hr>
          <h4>productCategory: ${productContainer[i].category}</h4>
          <hr>
          <p>productDescription: ${productContainer[i].description}</p>
        </div>
        <div class="card-buttons mt-2 text-center">
          <button class="btn btn-danger w-75 mb-2" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button>
          <button class="btn btn-warning w-75 mb-2" onclick="updateProduct(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
      </div>
    </div>`
        }
    }
    document.getElementById("list").innerHTML = productList;

}
// searchProduct //

// validateInputs //
function validateInputs() {
    const productNameRegex = /^[A-Z][a-z]{3,7}$/;
    const productPriceRegex = /^(18|80|90|[1-9][0-9][0-9])$/;
    const productCategoryRegex = /^[a-z]{3,10}$/i;
    const productDescriptionRegex = /^[a-z]{3,10}$/i;

    if (productNameRegex.test(productName.value) === false) {
        return "Product name must start with a capital letter and be between 4 to 8 characters long.";
    } else if (productPriceRegex.test(productPrice.value) === false) {
        return "Product price must be 18, 80, 90, or any number from 100 and above.";
    } else if (productCategoryRegex.test(productCategory.value) === false) {
        return "Product category must be between 3 to 10 alphabetic characters.";
    } else if (productDescriptionRegex.test(productDescription.value) === false) {
        return "Product description must be between 3 to 10 alphabetic characters.";
    }

    return true;

}
// validateInputs //














