
loadAllSup();

function generateSupplierID() {
    $("#supId").val("S00-001");
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier/SupplierIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function(resp) {
            let id = resp.value;
            console.log("id" + id);

            if (id === null) {
                $("#supId").val("S00-001");
            } else {
                let tempId = parseInt(id.split("-")[1]) + 1;
                let newId = "S00-" + ("000" + tempId).slice(-3);
                $("#supId").val(newId);
            }
        },
        error: function(ob, statusText, error) {
            console.error(error);
        }
    });
}

/*function generateSupplierID() {
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier/SupplierIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);

            if (id === null) {
                $("#supId").val("S00-002");
            } else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#supId").val("S00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#supId").val("S00-0" + tempId);
                } else {
                    $("#supId").val("S00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {
            console.log(ob);
            console.log(statusText);
            console.log(error);
        }
    });
}*/

function loadAllSup() {
    $("#tblSupplier").empty(); // Clearing the correct table
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier",
        method: "GET",
        dataType: "json",
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

function setTextFieldValuesS(supName, category, address1, address2, address3, contact1,contact2,supEmail) {
    $("#supName").val(supName);
    $("#category").val(category);
    $("#address1").val(address1);
    $("#address2").val(address2);
    $("#address3").val(address3);
    $("#contact1").val(contact1);
    $("#contact2").val(contact2);
    $("#email").val(supEmail);

    $("#supName").focus();
}

$("#btnSaveS").click(function (){

    let formData = $("#supForm").serialize();

    console.log(formData);
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier",
        method: "POST",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            loadAllSup();
            generateSupplierID();

            Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });

        }, error: function (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

function blindClickEventsS() {
    // Use event delegation to bind click events to dynamically added rows
    $("#tblSupplier").on("click", "tr", function () {
        let supId = $(this).children().eq(0).text();
        let supName = $(this).children().eq(1).text();
        let supAddress = $(this).children().eq(2).text();
        let addressComponents = supAddress.split(', ');
        let address1 = addressComponents[0] || '';
        let address2 = addressComponents[1] || '';
        let address3 = addressComponents[2] || '';
        let category = $(this).children().eq(3).text();
        let contact1 = $(this).children().eq(4).text();
        let contact2 = $(this).children().eq(5).text();
        let supEmail = $(this).children().eq(6).text();


        $("#supId").val(supId);
        $("#supName").val(supName);
        $("#category").val(category);
        $("#address1").val(address1);
        $("#address2").val(address2);
        $("#address3").val(address3);
        $("#contact1").val(contact1);
        $("#contact2").val(contact2);
        $("#email").val(supEmail);
    });
}

$("#btnUpdateS").click(function () {
    let formData = $("#supForm").serialize();
    /*let empId = $("#empId").val();
    formData += "&code=" + empId;*/
    console.log(formData);
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier",
        method: "PUT",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            loadAllSup();
            generateSupplierID();

            Swal.fire({
                icon: "success",
                title: "Successfully supplier updated",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            console("Supplier", JSON.parse(error.responseText).message);
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

$("#btnDeleteS").click(function () {
    let id = $("#supId").val();
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier?code=" + id + "",
        method: "DELETE",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            loadAllSup();
            generateSupplierID();

            Swal.fire({
                icon: "success",
                title: "Successfully supplier deleted",
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

$("#supSearch").on("keypress", function (event) {
    if (event.which === 13) { // Check if Enter key is pressed
        var search = $("#supSearch").val(); // Get the value from the input field
        $("#tblSupplier").empty(); // Clear previous search results

        $.ajax({
            url: "http://localhost:8080/backEnd/api/v1/supplier/searchSupplier?code=" + search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                // Loop through each item in the response data
                for (let i of res.data) {
                    let supId = i.code;
                    let supName = i.name;
                    let category = i.category;
                    let address = i.address;
                    let contact1 = i.contact1;
                    let contact2 = i.contact2;
                    let email = i.email;

                    // Concatenate address fields
                    let addressColumn = `${address.address1}, ${address.address2}, ${address.address3}`;

                    // Construct table row HTML
                    let row = `<tr><td>${supId}</td><td>${supName}</td><td>${addressColumn}</td><td>${category}</td><td>${contact1}</td><td>${contact2}</td><td>${email}</td></tr>`;
                    $("#tblSupplier").append(row); // Append row to table

                    // Attach click event listeners
                    bindClickEventsS();
                }
            },
            error: function (error) {
                loadAllSup(); // Reload all suppliers
                let message = JSON.parse(error.responseText).message;
                // Display error message
                console.error("Error:", message);
                // You can show the error message to the user if needed
            }
        });
    }
});
