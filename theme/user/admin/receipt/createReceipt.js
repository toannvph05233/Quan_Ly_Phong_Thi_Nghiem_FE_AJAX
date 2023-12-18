document.getElementById("avatar_header").src = JSON.parse(localStorage.getItem("user")).avatar;
document.getElementById("username").innerText = JSON.parse(localStorage.getItem("user")).username;

getReceiptDraft();
let receiptDraft = [];
getAllChemistry();
getAllDevices();

function getReceiptDraft() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/receipts/draft`,
        success: function (data) {
            console.log("draft")
            console.log(data)
            receiptDraft = data;
            ReceiptDraft(data);

        },
        error: function (err) {
            console.log(err);
        }
    })

}

function ReceiptDraft(arr) {
    let str = ""
    let strC = ""
    for (const c of arr.devices) {
        str += ` <tr>
                    <td>${c.name}</td>
                    <td>${c.createDate}</td>
                    <td>
                           <input type="number" value="0" onchange="checkQuantityDevice(${c.id}, this)">
                    </td>
                    <td>${c.unit}</td>
                    <td>${c.status}</td>
                    <td style="color: rgba(218,47,34,0.43)">${c.endDate}</td>
                    <td>${c.describe}</td>
                    <td><button onclick="deleteDeviceDraft(${c.id})" type="button" class="btn btn-danger">Delete</button></td>

                </tr>`
    }

    for (const c of arr.chemistry) {
        strC += ` <tr>
                     <td>${c.name}</td>
                    <td>${c.createDate}</td>
                    <td>
                           <input type="number" value="0" onchange="checkQuantityChemistry(${c.id}, this)">
                    </td>
                    <td style="color: rgba(218,47,34,0.43)">${c.endDate}</td>
                    <td>${c.describe}</td>
                    <td><button onclick="deleteChemistryDraft(${c.id})" type="button" class="btn btn-danger">Delete</button></td>
                </tr>`
    }

    document.getElementById("showD").innerHTML = str;
    document.getElementById("showC").innerHTML = strC;
}

function checkQuantityChemistry(id, _this) {
    if (_this.value < 1) {
        alert("quantity không thể nhỏ hơn 1")
        _this.value = 1;
        return;
    }
    for (const e of receiptDraft.chemistry) {
        if (e.id == id) {
            e.quantity = _this.value;
        }
    }
}

function checkQuantityDevice(id, _this) {
    if (_this.value < 1) {
        alert("quantity không thể nhỏ hơn 1")
        _this.value = 1;
        return;
    }
    for (const e of receiptDraft.devices) {
        if (e.id == id) {
                e.quantity = _this.value;
        }
    }
}

function deleteChemistryDraft(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/receipts/deleteCDraft/${id}`,
        success: function (data) {
            getReceiptDraft();
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function deleteDeviceDraft(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/receipts/deleteDDraft/${id}`,
        success: function (data) {
            getReceiptDraft();
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function createChemistryDraft() {
    let name = document.getElementById("name").value;
    let purpose = document.getElementById("purpose").value;
    // let endDate = document.getElementById("endDate").value;

    let obj = {name, purpose, "receiptDTO": receiptDraft}

    console.log("obj")
    console.log(obj)
    $.ajax({
        type: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/receipts/admin/create`,
        data: JSON.stringify(obj),
        success: function (data) {
            console.log(data)
            alert("Create thành công")
            location.href = "receipt.html";
        },
        error: function (err) {
            console.log(err);
        }
    })
}


// Hiển thị khi nhấn thêm hóa chất và công cụ.
function getAllChemistry() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/chemistry/admin/notDraft`,
        success: function (data) {
            console.log("getAllChemistry")
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
                    <td>${c.name}</td>
                    <td>${c.createDate}</td>
                    <td>${c.quantity}</td>
                    <td style="color: rgba(218,47,34,0.43)">${c.endDate}</td>
                    <td><button onclick="addChemistry(${c.id})" type="button" class="btn btn-primary">Add</button></td>

                </tr>`
    }
    document.getElementById("showChemistry").innerHTML = str;
}


function getAllDevices() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/devices/admin/notDraft`,
        success: function (data) {
            console.log("getAllDevices")
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
                    <td>${c.name}</td>
                    <td>${c.quantity}</td>
                    <td>${c.unit}</td>
                    <td>${c.status}</td>
                    <td style="color: rgba(218,47,34,0.43)">${c.endDate}</td>
                    <td><button onclick="addDevices(${c.id})" type="button" class="btn btn-primary">Add</button></td>
                </tr>`
    }
    document.getElementById("showDevice").innerHTML = str;
}

