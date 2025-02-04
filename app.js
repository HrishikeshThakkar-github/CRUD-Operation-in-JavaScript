let data = JSON.parse(localStorage.getItem("products")) || [
    // { id: 1, name: "Laptop", price: 50000, image: "https://via.placeholder.com/60", description: "High-performance laptop" },
    // { id: 2, name: "Phone", price: 30000, image: "https://via.placeholder.com/60", description: "Latest smartphone" },
    // { id: 3, name: "Tablet", price: 20000, image: "https://via.placeholder.com/60", description: "Portable tablet device" }
];

function readALL(filteredData = data) {
    localStorage.setItem("products", JSON.stringify(data));

    var tabledata = document.querySelector(".data_table");
    tabledata.innerHTML = "";

    filteredData.forEach(record => {
        tabledata.innerHTML += `<tr>
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>₹${record.price}</td>
            <td><img src="${record.image}" class="product-img" onerror="this.src='https://via.placeholder.com/60'"></td>
            <td>${record.description}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteItem(${record.id})">Delete</button>
                <button class="btn btn-warning btn-sm" onclick="edit(${record.id})">Edit</button>
            </td>
        </tr>`;
    });

    // filteredData.forEach(
    //     const row = document.createElement('tr');
    //     tabledata.appendChild()
    // )
}

document.addEventListener('DOMContentLoaded', readALL);

function create() {
    document.querySelector(".create_form").style.display = "block";
    document.querySelector(".add-btn").style.display = "none";
}

function cancelCreate() {
    document.querySelector(".create_form").style.display = "none";
    document.querySelector(".add-btn").style.display = "block";
}

function add() {
    var name = document.querySelector(".pname").value;
    var price = document.querySelector(".pprice").value;
    var description = document.querySelector(".pdesc").value;
    var imageInput = document.querySelector(".pimage").files[0];


console.log("add");
readALL();
    if (!imageInput) {
        alert("Please select an image.");
        return;
    }

    if (imageInput.size > 1024 * 1024) { 
        alert("Image size exceeds 5MB!");
        return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(imageInput);
    reader.onload = function (event) {
        var image = event.target.result;

        var newObj = {
            id: Date.now(),
            name,
            price: parseFloat(price),
            image,
            description
        };

        data.push(newObj);
        cancelCreate();
        readALL();
    };

}

function edit(id) {
    document.querySelector(".update_form").style.display = "block";

    var obj = data.find(rec => rec.id === id);
    document.querySelector(".pid").value = obj.id;
    document.querySelector(".upname").value = obj.name;
    document.querySelector(".upprice").value = obj.price;
    document.querySelector(".updesc").value = obj.description;
    document.querySelector(".upimage").value = obj.image;
    document.querySelector(".updesc").value = obj.description;
}

function cancelUpdate() {
    document.querySelector(".update_form").style.display = "none";
}

function update() {
    var id = parseInt(document.querySelector(".pid").value);
    var name = document.querySelector(".upname").value;
    var price = document.querySelector(".upprice").value;
    var description = document.querySelector(".updesc").value;
    var imageInput = document.querySelector(".upimage").files[0];
    var image = data.find(rec => rec.id === id).image; // Default to old image
    var description = document.querySelector(".updesc").value;
    if (imageInput) {
        if (imageInput.size > 5 * 1024 * 1024) {
            alert("Image size exceeds 5MB!");
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(imageInput);
        reader.onload = function (event) {
            image = event.target.result;
            saveUpdatedProduct(id, name, price, image, description);
        };
    } else {
        saveUpdatedProduct(id, name, price, image, description);
    }

    function saveUpdatedProduct(id, name, price, image, description) {
        var index = data.findIndex(rec => rec.id === id);
        data[index] = { id, name, price: parseFloat(price), image, description };

        cancelUpdate();
        readALL();
    }

    

    var index = data.findIndex(rec => rec.id === id);
    data[index] = { id, name, price: parseFloat(price), image, description };

    cancelUpdate();
    readALL();
}

function deleteItem(id) {
    data = data.filter(rec => rec.id !== id);
    readALL();
}

function search() {
    var searchValue = document.querySelector(".search-box").value.toLowerCase();
    var filteredData = data.filter(record =>
        record.name.toLowerCase().includes(searchValue) ||
        record.description.toLowerCase().includes(searchValue) ||
        record.price.toString().includes(searchValue)
    );

    readALL(filteredData);
}

let sortOrder = { name: 'asc', price: 'asc' };

function sortTable(field) {
    if (sortOrder[field] === 'asc') {
        data.sort((a, b) => (a[field] > b[field] ? 1 : -1));
        sortOrder[field] = 'desc';
        if (field === 'name')
            document.querySelector("#sortn").innerHTML = " sort by name ↑"
        if (field === 'price')
            document.querySelector("#sortp").innerHTML = " sort by price ↑"
    } else {
        data.sort((a, b) => (a[field] < b[field] ? 1 : -1));
        sortOrder[field] = 'asc';
        if (field === 'name')
            document.querySelector("#sortn").innerHTML = " sort by name ↓"
        if (field === 'price')
            document.querySelector("#sortp").innerHTML = " sort by price ↓"
    }

    readALL();
}