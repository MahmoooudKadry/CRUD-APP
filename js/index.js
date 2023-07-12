var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var productList = [];
var currentIndex;

if (localStorage.getItem("products") != null) {
    productList = JSON.parse(localStorage.getItem("products"));
    displayProduct(productList);
}

function addProduct() {
    if (validateByName() != true) {
        document.getElementById('validateName').classList.remove("d-none")
    } else if(validateByPrice() != true) {
        document.getElementById('validatePrice').classList.remove("d-none")
    } else {
        var product =
        {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        productList.push(product);
        localStorage.setItem("products", JSON.stringify(productList))
        clearForm()
        displayProduct(productList)
        document.getElementById('validateName').classList.add("d-none")
        document.getElementById('validatePrice').classList.add("d-none")
    }


}

function displayProduct(array) {
    var box = "";
    for (var i = 0; i < array.length; i++) {
        box += `                <tr>
        <td>${i}</td>
        <td>${array[i].newName ? array[i].newName : array[i].name}</td>
        <td>${array[i].price}</td>
        <td>${array[i].category}</td>
        <td>${array[i].desc}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-sm btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-sm btn-danger">Delete</button></td>
    </tr>`

    }
    document.getElementById("tbody").innerHTML = box;
}

function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productList))
    displayProduct(productList);
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function updateProduct(index) {
    currentIndex = index;
    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
    productNameInput.value = productList[index].name;
    productPriceInput.value = productList[index].price;
    productCategoryInput.value = productList[index].category;
    productDescInput.value = productList[index].desc;
}

function updateForm() {
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
    productList.fill(product, currentIndex, currentIndex + 1)
    localStorage.setItem("products", JSON.stringify(productList))
    displayProduct(productList);
    addBtn.classList.replace("d-none", "d-block")
    updateBtn.classList.add("d-none")
    clearForm()
}

function search(term) {
    var foundedItems = [];
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`)
            foundedItems.push(productList[i])
        }

    }
    displayProduct(foundedItems);
    console.log("helloo");
}

function validateByName() {
    var regex = /^[A-Z][a-z]{3,8}$/
    return regex.test(productNameInput.value)
}

function validateByPrice() {
    var regex = /^[1-9][0-9]{3,7}$/
    return regex.test(productPriceInput.value)
}