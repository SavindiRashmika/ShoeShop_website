

loadAllSupV();

function loadAllSupV() {
    $("#tblSupplier").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let supId = i.code;
                let supName = i.name;
                let category = i.category
                let address = i.address;
                let contact1 = i.contact1;
                let contact2 = i.contact2;
                let email = i.email;

                let ad1 = address.address1;
                let ad2 = address.address2;
                let ad3 = address.address3;

                let addressColumn = ad1 + ", " + ad2 + ", " + ad3;

                let row = "<tr><td>" + supId + "</td><td>" + supName + "</td><td>" + addressColumn + "</td><td>" + category + "</td><td>" + contact1 + "</td><td>" + contact2 + "</td><td>" + email + "</td></tr>";
                $("#tblSupplier").append(row); // Append rows to #tblSupplier

            }
            generateSupplierID();
            blindClickEventsS();
            setTextFieldValuesS("", "", "", "", "", "", "", "");
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
        }

    });
}

$("#form1").on("input", function (){
    var search = $("#form1").val();
    $("#tblSupplier").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier/searchSupplier?code=" + search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            if (res) {
                let code = res.code;
                let name = res.name;
                let category = res.category;
                let address = res.address || '';
                let contact1 = res.contact1;
                let contact2 = res.contact2;
                let email = res.email;

                let ad1 = address.address1 || '';
                let ad2 = address.address2 || '';
                let ad3 = address.address3 || '';

                let addressColumn = `${ad1}, ${ad2}, ${ad3}`;

                let row = "<tr><td>" + code + "</td><td>" + name + "</td><td>" + category + "</td><td>" + addressColumn + "</td><td>" + contact1 + "</td><td>" + contact2 + "</td><td>" + email + "</td></tr>";
                $("#tblSupplier").append(row);
                blindClickEventsS();
            }
        },
        error: function (error) {
            loadAllSup();
            let message = JSON.parse(error.responseText).message;
            console.error("Error:", message);
        }
    });
});

$("#form1").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#form1").val();
        $("#tblSupplier").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/backEnd/api/v1/supplier/searchSupplier",
            method: "GET",
            data: {
                code: search,
                name: search
            },
            contentType: "application/json",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (res) {
                console.log(res);
                if (res) {
                    let code = res.code;
                    let name = res.name;
                    let category = res.category;
                    let address = res.address || '';
                    let contact1 = res.contact1;
                    let contact2 = res.contact2;
                    let email = res.email;

                    let ad1 = address.address1 || '';
                    let ad2 = address.address2 || '';
                    let ad3 = address.address3 || '';

                    let addressColumn = `${ad1}, ${ad2}, ${ad3}`;

                    let row = "<tr><td>" + code + "</td><td>" + name + "</td><td>" + category + "</td><td>" + addressColumn + "</td><td>" + contact1 + "</td><td>" + contact2 + "</td><td>" + email + "</td></tr>";
                    $("#tblSupplier").append(row);
                    blindClickEventsS();
                }
            },
            error: function (error) {
                loadAllSup();
                let message = JSON.parse(error.responseText).message;
                console.error("Error:", message);
            }
        });
    }
});
