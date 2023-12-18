document.getElementById("avatar_header").src = JSON.parse(localStorage.getItem("user")).avatar;
document.getElementById("username").innerText = JSON.parse(localStorage.getItem("user")).username;

function getAllReceipt(page) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/receipts?page=" + page,
        success: function (data) {
            console.log(data)
            showReceipt(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function showReceipt(arr) {
    let str = ""
    for (const c of arr.content) {
        str += ` <tr>
                    <td style="color: #0d4dff;" data-toggle="modal" data-target="#myModal" onclick="showReceiptDetail(${c.id})">${c.name}</td>
                    <td>${c.createDate}</td>                 
                    <td style="color: #00CBA0">${c.status}</td>
                    <td style="color: rgba(218,47,34,0.43)">${c.endDate}</td>
                    <td>${c.purpose}</td>
                    <td>${c.receiptType.name}</td>
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

getAllReceipt(0);


function showReceiptDetail(id) {
    getAllChemistry(id);
    getAllDevices(id);
}


function getAllChemistry(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/receipt_chemistry/" + id,
        success: function (data) {
            console.log(data)
            showChemistry(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function showChemistry(arr) {
    let str = ""
    for (const c of arr) {
        str += ` <tr>
                    <td>${c.chemistry.name}</td>
                    <td>${c.chemistry.createDate}</td>
                    <td>${c.quantity} ml</td>
                    <td style="color: rgba(218,47,34,0.43)">${c.chemistry.endDate}</td>
                </tr>`
    }
    document.getElementById("showChemistry").innerHTML = str;
}

function getAllDevices(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/receipt_device/" + id,
        success: function (data) {
            console.log(data)
            showDevices(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function showDevices(arr) {
    let str = ""
    for (const c of arr) {
        str += ` <tr>
                    <td>${c.device.name}</td>
                    <td>${c.quantity}</td>
                    <td>${c.device.unit}</td>
                    <td>${c.device.status}</td>
                    <td style="color: rgba(218,47,34,0.43)">${c.device.endDate}</td>
                    <td>${c.device.describe}</td>
                </tr>`
    }
    document.getElementById("showReceipt").innerHTML = str;
}
