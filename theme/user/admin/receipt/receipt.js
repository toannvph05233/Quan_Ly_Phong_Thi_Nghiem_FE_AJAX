document.getElementById("avatar_header").src = JSON.parse(localStorage.getItem("user")).avatar;
document.getElementById("username").innerText = JSON.parse(localStorage.getItem("user")).username;

function getAllReceipt(page, status) {
    if (!status || status == "All") {
        status = "";
    }
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/receipts/all?page=${page}&status=${status}`,
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
                    <td>${c.createDate}</td>`

        if (c.status === "chờ xác nhận") {
            str += `<td style="color: #1A5099">chờ xác nhận</td>`
        } else if (c.status === "đợi trả đồ") {
            str += `<td style="color: #5f5e4e">đợi trả đồ</td>`
        } else if (c.status === "đã xong") {
            str += `<td style="color: #0E9A00">đã xong</td>`
        } else {
            str += `<td style="color: red">đã hủy</td>`
        }


        str += `<td style="color: #00CBA0">${c.status}</td>
                    <td style="color: rgba(218,47,34,0.43)">${c.endDate}</td>
                    <td>${c.purpose}</td>
                    <td>${c.receiptType.name}</td>`;


        if (c.status === "chờ xác nhận") {
            str += `<td><button onclick="changeStatusReceipt(${c.id})" type="button" class="btn btn-success">Xác nhận</button>`
            str += `<button onclick="changeCancelReceipt(${c.id})" type="button" class="btn btn-danger">Hủy</button></td>`
        } else if (c.status === "đợi trả đồ") {
            str += `<td><button data-toggle="modal" data-target="#myModalReturn" onclick="showReceiptDetailReturn(${c.id})" type="button" class="btn btn-info">Trả đồ</button>`
            str += `<button onclick="changeCancelReceipt(${c.id})" type="button" class="btn btn-danger">Hủy</button></td>`
        } else if (c.status === "đã xong") {
            str += `<td style="color: #0E9A00">Đã xong</td>`
        } else {
            str += `<td style="color: red">Đã hủy</td>`
        }

        str += "</tr>";
    }
    for (let i = 0; i < arr.totalPages; i++) {
        if (i == arr.number) {
            str += `<button class="btn btn-secondary" onclick="getAllReceipt(${i})" > ${i + 1}  </button>`
        } else
            str += `<button class="btn btn-light" onclick="getAllReceipt(${i})" > ${i + 1}  </button>`

    }
    document.getElementById("show").innerHTML = str;
}

getAllReceipt(0);

function changeStatusReceipt(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/receipts/changeStatus/" + id,
        success: function (data) {
            console.log(data)
            getAllReceipt(0);
        },
        error: function (err) {
            console.log(err);
        }
    })
}



function changeCancelReceipt(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/receipts/cancel/" + id,
        success: function (data) {
            console.log(data)
            getAllReceipt(0);
        },
        error: function (err) {
            console.log(err);
        }
    })
}


// show Return;
function showReceiptDetailReturn(id) {
    getAllChemistryReturn(id);
    getAllDevicesReturn(id);
}


function getAllChemistryReturn(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/receipt_chemistry/status/" + id,
        success: function (data) {
            console.log(data)
            showChemistryReturn(data, id);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function showChemistryReturn(arr, idR) {
    let str = ""
    for (const c of arr) {
        str += ` <tr>
                    <td style="width: 150px">${c.chemistry.name}</td>
                    <td>
                           <input style="width: 50px" type="number" value="1" onChange="checkQuantityChemistry(${c.id}, this, ${c.quantity})">
                           <p style="color: rgba(218,47,34,0.43)">Max : ${c.quantity}  ML</p>
                    </td> 
                    <td>
                                        <button type="button" class="btn btn-success" onclick="chemistryReturn(${c.id},${idR})">Trả đồ</button>
                   
                    </td>
                </tr>`
    }
    document.getElementById("showChemistryReturn").innerHTML = str;
}

function getAllDevicesReturn(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/receipt_device/status/" + id,
        success: function (data) {
            console.log(data)
            showDevicesReturn(data, id);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function showDevicesReturn(arr, idR) {
    let str = ""
    for (const c of arr) {
        str += ` <tr>
                    <td style="width: 150px">${c.device.name}</td>
                    <td>
                           <p style="color: rgba(218,47,34,0.43)"> ${c.quantity}  ${c.device.unit}</p>
                    </td>
                    <td>${c.device.describe}</td>
                    <td>
                          <button type="button" class="btn btn-success" onclick="devicesReturn(${c.id},${idR})">Trả đồ</button>
                          <button type="button" class="btn btn-warning" onclick="createLiquidate(${c.id},${idR})">Thanh lý</button>
                    </td>
                </tr>`
    }
    document.getElementById("showReceiptReturn").innerHTML = str;
}

let quantityChemistryReturn = 1;
function checkQuantityChemistry(id, _this, quantity) {
    if (_this.value < 0) {
        alert("quantity không thể nhỏ hơn 0")
        _this.value = 0;
        return;
    }
    if (quantity < _this.value) {
        alert("quá quantity");
        _this.value = quantity;
        return;
    } else {
        quantityChemistryReturn = _this.value;
    }
}


function chemistryReturn(id,idR) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/receipt_chemistry/return/" + id,
        success: function (data) {
            alert("thành công")
            showReceiptDetailReturn(idR);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function createLiquidate(id,idR) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/liquidates/" + id,
        success: function (data) {
            alert("thành công")
            showReceiptDetailReturn(idR);

        },
        error: function (err) {
            console.log(err);
        }
    })
}

function devicesReturn(id,idR) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/receipt_device/return/" + id,
        success: function (data) {
            alert("thành công")
            showReceiptDetailReturn(idR);
        },
        error: function (err) {
            console.log(err);
        }
    })
}









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
    let username = "";
    let str = ""
    for (const c of arr) {
        username = c.receipt.account.username;
        str += ` <tr>
                    <td>${c.chemistry.name}</td>
                    <td>${c.chemistry.createDate}</td>
                    <td>${c.quantity} ml</td>
                    <td style="color: rgba(218,47,34,0.43)">${c.chemistry.endDate}</td>
                </tr>`
    }
    document.getElementById("showChemistry").innerHTML = str;
    document.getElementById("nameUser").innerHTML = username;
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
    let username = "";
    let str = ""
    for (const c of arr) {
        username = c.receipt.account.username;
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
    document.getElementById("nameUser").innerText = username;

}
