function addChemistry(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/chemistry/add/${id}`,
        success: function (data) {
            console.log(data)
            alert("add thành công")
            getReceiptDraft();
            getAllChemistry();


        },
        error: function (err) {
            console.log(err);
        }
    })
}

function addDevices(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/devices/add/${id}`,
        success: function (data) {
            console.log(data)
            alert("add thành công")
            getReceiptDraft();
            getAllDevices();


        },
        error: function (err) {
            console.log(err);
        }
    })
}
