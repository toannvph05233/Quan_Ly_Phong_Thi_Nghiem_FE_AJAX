document.getElementById("avatar_header").src = JSON.parse(localStorage.getItem("user")).avatar;
document.getElementById("username").innerText = JSON.parse(localStorage.getItem("user")).username;

function getAll(page) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/devices/admin?page=" + page,
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
                    <td>${c.unit}</td>
                    <td>${c.subject.name}</td>
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


function create(data) {

    $.ajax({
        type: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')

        },
        url: "http://localhost:8080/devices/import",
        data: JSON.stringify(data),
        success: function (data) {
            alert("thành công")
            getAll(0);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

// document.getElementById('csvFileInput').addEventListener('change', handleFile);

function importCSV() {
    const file = document.getElementById('csvFileInput').files[0];
    if (!file) {
        console.error('No file selected');
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const csvContent = e.target.result;
        processData(csvContent);
    };
    reader.readAsText(file);
}

function processData(csvData) {
    const lines = csvData.split('\n');

    const devices = lines.map(line => {
        const values = line.split(',');

        return {
            createDate: values[0],
            describe: values[1],
            endDate: values[2],
            name: values[3],
            quantity: values[4],
            status: values[5],
            unit: values[6],
            subject: {id: values[7]},
        };
    });
    console.log("devices")
    console.log(devices)
    create(devices);
}

document.getElementById('deviceForm').addEventListener('submit', function(e){
    e.preventDefault();

    var data = {
        name: document.getElementById('deviceName').value,
        describe: document.getElementById('deviceDescribe').value,
        unit: document.getElementById('deviceUnit').value,
        status: document.getElementById('deviceStatus').value,
        quantity: document.getElementById('deviceQuantity').value,
        createDate: document.getElementById('deviceCreateDate').value,
        endDate: document.getElementById('deviceEndDate').value,
        subject: {id: parseInt(document.getElementById('subject').value)}
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/devices",
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')

        },
        dataType: "json",
        success: function(response){
            console.log(response);
            alert("thanh cong")

            // Handle response here
        },
        error: function(err){
            console.log(err);
            // Handle errors here
        }
    });
});

