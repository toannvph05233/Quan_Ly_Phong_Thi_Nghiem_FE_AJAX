document.getElementById("avatar_header").src = JSON.parse(localStorage.getItem("user")).avatar;
document.getElementById("username").innerText = JSON.parse(localStorage.getItem("user")).username;


function getAll(page) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/chemistry/admin?page=" + page,
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


function create(data) {

    $.ajax({
        type: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')

        },
        url: "http://localhost:8080/chemistry/import",
        data: JSON.stringify(data),
        success: function (data) {
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

    const arr = lines.map(line => {
        const values = line.split(',');

        return {
            createDate: values[0],
            describe: values[1],
            endDate: values[2],
            name: values[3],
            quantity: values[4],
            subject: {id: values[5]},
        };
    });
    console.log("arr")
    console.log(arr)
    create(arr);
    alert("thành công")


}

document.getElementById('chemistryForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var data = {
        name: document.getElementById('name').value,
        describe: document.getElementById('describe').value,
        quantity: document.getElementById('quantity').value,
        createDate: document.getElementById('createDate').value,
        endDate: document.getElementById('endDate').value,
        subject: {id: parseInt(document.getElementById('subject').value)}
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/chemistry", // đường dẫn tới API hoặc Controller xử lý dữ liệu
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')

        },
        dataType: "json",
        success: function (response) {
            console.log(response);
            alert("thanh cong")
            // Handle response here
        },
        error: function (err) {
            console.log(err);
            // Handle errors here
        }
    });
});
