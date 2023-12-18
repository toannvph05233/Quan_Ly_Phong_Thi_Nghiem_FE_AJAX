document.getElementById("avatar_header").src = JSON.parse(localStorage.getItem("user")).avatar;
document.getElementById("username").innerText = JSON.parse(localStorage.getItem("user")).username;

function getAll(page) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/liquidates?page=" + page,
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
                    <td>${c.device.name}</td>
                    <td>${c.device.createDate}</td>
                    <td>${c.device.quantity}</td>
                    <td>${c.device.unit}</td>
                    <td>${c.device.status}</td>
                    <td style="color: rgba(218,47,34,0.43)">${c.device.endDate}</td>
                    <td>${c.device.describe}</td>
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

