document.getElementById("avatar_header").src = JSON.parse(localStorage.getItem("user")).avatar;
document.getElementById("username").innerText = JSON.parse(localStorage.getItem("user")).username;

function getAll(page) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/chemistry?page=" + page,
        success: function (data) {
            console.log(data)
            showProduct(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function showProduct(arr) {
    let str = ""
    for (const c of arr.content) {
        str += ` <tr>
                    <td>${c.name}</td>
                    <td>${c.createDate}</td>
                    <td>${c.quantity}</td>
                    <td style="color: rgba(218,47,34,0.43)">${c.endDate}</td>
                    <td>${c.describe}</td>
                </tr>`
    }
    for (let i = 0; i < arr.totalPages; i++) {
        if (i == arr.number) {
            str += `<button class="btn btn-secondary" onclick="getAll(${i})" > ${i + 1}  </button>`
        } else
            str += `<button class="btn btn-light" onclick="getAll(${i})" > ${i + 1}  </button>`

    }
    document.getElementById("show").innerHTML = str;
}

getAll(0);


function create() {
    let name = $("#name").val();
    let price = $("#price").val();
    let img = $("#img").val();
    let category = $("#category").val();

    let product = {
        name: name,
        price: price,
        img: img,
        category: {
            id: category
        }
    }
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/products",
        data: JSON.stringify(product),
        success: function (data) {
            getAll();
        },
        error: function (err) {
            console.log(err);
        }
    })
}
