let data = JSON.parse(localStorage.getItem("products")) || [
    // { id: 1, name: "Laptop", price: 50000, image: "https://via.placeholder.com/60" },
    // { id: 2, name: "Phone", price: 30000, image: "https://via.placeholder.com/60" },
    // { id: 3, name: "Tablet", price: 20000, image: "https://via.placeholder.com/60" }
];

function readALL(filteredData = data) {
    localStorage.setItem("products", JSON.stringify(data));

    var tabledata = document.querySelector(".data_table");
    tabledata.innerHTML = "";

    filteredData.forEach(record => {
        tabledata.innerHTML += `<tr>
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>${record.description}</td>
            <td>₹${record.price}</td>
            <td><img src="${record.image}" class="product-img"></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteItem(${record.id})">Delete</button>
                <button class="btn btn-warning btn-sm" onclick="edit(${record.id})">Edit</button>
            </td>
        </tr>`;
    });
}

document.addEventListener('DOMContentLoaded', readALL);  // we can also do this by adding onload="readALL" in body tag so that every time the table gets loadded when it gets opened


function create() {
    document.querySelector(".create_form").style.display = "block";
    document.querySelector(".add-btn").style.display = "none";
}

function cancelCreate() {
    document.querySelector(".create_form").style.display = "none";
    document.querySelector(".add-btn").style.display = "block";
}

function* idGenerator() {
    let id = Number(localStorage.getItem('id')) || 0; // Get saved ID or start at 0
    while (true) {
        id++; // Increment ID
        localStorage.setItem('id', id); // Save updated ID
        yield id; // Return new ID
    }
}
 
const gen = idGenerator(); // Keep generator outside the function to persist
 
function add() {
    var name = document.querySelector(".pname").value;
    var description = document.querySelector(".pdesc").value;
    var price = document.querySelector(".pprice").value;
    var image = document.querySelector(".pimage").value;
 
    var newObj = { id: gen.next().value, name,description, price: parseFloat(price), image };
    data.push(newObj);
 
    cancelCreate();
    readALL();
}