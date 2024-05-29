
loadAllCus();

function updateDateTime() {
    let currentDateTime = new Date();

    let year = currentDateTime.getFullYear();
    let month = currentDateTime.getMonth() + 1;
    let day = currentDateTime.getDate();

    let hours = currentDateTime.getHours();
    let minutes = currentDateTime.getMinutes();
    let seconds = currentDateTime.getSeconds();

    let formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    let formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    $('#recentPurchaseDate').val(`${formattedDate} ${formattedTime}`);
}

updateDateTime();

setInterval(updateDateTime, 1000);




function generateCustomerID() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/customer/cusIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);

            if (id === null) {
                $("#cusId").val("C00-001");
            } else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#cusId").val("C00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#cusId").val("C00-0" + tempId);
                } else {
                    $("#cusId").val("C00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {
            console.log(ob);
            console.log(statusText);
            console.log(error);
        }
    });
}

function loadAllCus() {
    $("#tblCustomer").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/customer",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let cusId = i.code;
                let name = i.name;
                let gender = i.gender
                let contact = i.loyaltyDate;
                let level = i.level;
                let points = i.loyaltyPoints;
                let dob = i.dob;
                let address = i.address;
                let time = i.contact;
                let email = i.email
                let joinDate =i.recentPurchaseDate;

                let ad1 = address.address1;
                let ad2 = address.address2;
                let ad3 = address.address3;

                let addressColumn = ad1 + ", " + ad2 + ", " + ad3;

                let row = "<tr><td>" + cusId + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + addressColumn + "</td>" +
                    "<td>" + gender + "</td>" +
                    "<td>" + joinDate + "</td>" +
                    "<td>" + level + "</td>" +
                    "<td>" + points + "</td>" +
                    "<td>" + dob + "</td>" +
                    "<td>" + contact + "</td>" +
                    "<td>" + time + "</td>" +
                    "<td>" + email + "</td>" +
                    "</tr>";
                $("#tblCustomer").append(row);

            }
            generateCustomerID();
            blindClickEventsC();
            setTextFieldValuesC("", "", "", "", "", "", "", "", "", "", "","");

            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}

$("#btnSaveC").click(function (){
    let formData = $("#cusForm").serialize();
    console.log(formData);
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/customer",
        method: "POST",
        data: formData,
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            loadAllCus();
            generateCustomerID();

            Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });

        }, error: function (error) {
            console.log(error);
        }
    });
});

function blindClickEventsC() {
    $("#tblCustomer>tr").on("click", function () {
        let cusId = $(this).children().eq(0).text();
        let cusName = $(this).children().eq(1).text();
        let dob = $(this).children().eq(7).text();
        let cusGender = $(this).children().eq(3).text();
        let recentPurchaseDate = $(this).children().eq(4).text();
        let cusLevel = $(this).children().eq(5).text();
        let loyaltyPoints = $(this).children().eq(6).text();
        let addressColumn = $(this).children().eq(2).text();
        let addressComponents = addressColumn.split(',');
        let address1 = addressComponents[0] || '';
        let address2 = addressComponents[1] || '';
        let address3 = addressComponents[2] || '';

        let loyaltyDate = $(this).children().eq(8).text();
        let contact = $(this).children().eq(9).text();
        let email = $(this).children().eq(10).text();


        $("#cusId").val(cusId);
        $("#cusName").val(cusName);
        $("#cusGender").val(cusGender);
        $("#contact").val(contact);
        $("#cusLevel").val(cusLevel);
        $("#loyaltyPoints").val(loyaltyPoints);
        $("#dob").val(dob);
        $("#loyaltyDate").val(loyaltyDate);
        $("#address1").val(address1);
        $("#address2").val(address2);
        $("#address3").val(address3);
        $("#recentPurchaseDate").val(recentPurchaseDate);
        $("#email").val(email);

    });

}

function setTextFieldValuesC(cusName, cusGender, contact, cusLevel, loyaltyPoints, dob,loyaltyDate, address1, address2, address3, recentPurchaseDate,email) {
    $("#cusName").val(cusName);
   /* $("#cusGender").val(cusGender);*/
    $("#contact").val(contact);
    $("#cusLevel").val(cusLevel);
    $("#loyaltyPoints").val(loyaltyPoints);
    $("#dob").val(dob);
    $("#loyaltyDate").val(loyaltyDate);
    $("#address1").val(address1);
    $("#address2").val(address2);
    $("#address3").val(address3);
    $("#email").val(email);

    $("#cusName").focus();
}

$("#btnUpdateC").click(function () {
    let formData = $("#cusForm").serialize();
    console.log(formData);
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/customer",
        method: "PUT",
        data: formData,
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            loadAllCus();
            generateCustomerID();

            Swal.fire({
                icon: "success",
                title: "Successfully customer updated",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            console("Customer", JSON.parse(error.responseText).message);
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

$("#btnDeleteC").click(function () {
    let id = $("#cusId").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/customer?code=" + id + "",
        method: "DELETE",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            console.log(resp);
            loadAllCus();
            generateCustomerID();

            Swal.fire({
                icon: "success",
                title: "Successfully customer deleted",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message)
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

$("#form1").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#form1").val();
        $("#tblCustomer").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');

        $.ajax({
            url: "http://localhost:8080/backEnd/api/v1/customer/searchCustomer",
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
                    let cusId = res.code;
                    let name = res.name;
                    let gender = res.gender
                    let contact = res.loyaltyDate
                    let level = res.level;
                    let points = res.loyaltyPoints;
                    let dob = res.dob;
                    let address = res.address || '';
                    let time = res.contact;
                    let email = res.email
                    let joinDate =res.recentPurchaseDate;

                    let ad1 = address.address1 || '';
                    let ad2 = address.address2 || '';
                    let ad3 = address.address3 || '';

                    let addressColumn = `${ad1}, ${ad2}, ${ad3}`;

                    let row = "<tr><td>" + cusId + "</td><td>" + name + "</td><td>" + addressColumn + "</td><td>" + gender + "</td><td>" + joinDate + "</td><td>" + level + "</td><td>" + points + "</td><td>" + dob + "</td><td>" + contact + "</td><td>" + time + "</td><td>" + email + "</td></tr>";
                    $("#tblCustomer").append(row);
                    blindClickEventsC();
                }
            },
            error: function (error) {
                loadAllCus();
                let message = JSON.parse(error.responseText).message;
                console.error("Error:", message);
            }
        });
    }
});

