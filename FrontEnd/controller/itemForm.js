



loadAllItem();
loadAllSuppliers();
// Function to load all items
function loadAllItem() {
    $("#tblItem").empty(); // Clear the table before populating with new data
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            // Loop through the response data and populate the table rows
            for (let i of res.data) {
                let itemId = i.code;
                let itemName = i.name;
                let category = i.shoeType;
                let size = i.size;
                let qty = i.qty;
                let supplier_id = i.supplier;
                let supName = i.supName;
                let salePrice = i.salePrice;
                let buyPrice = i.buyPrice;
                let expectedProfit = i.expectedProfit;
                let profitMargin = i.profitMargin;
                let status = i.status;

                let supId = supplier_id.code;


                let row = "<tr>" +
                    "<td>" + itemId + "</td>" +
                    "<td>" + itemName + "</td>" +
                    "<td>" + category + "</td>" +
                    "<td>" + size + "</td>" +
                    "<td>" + qty + "</td>" +
                    "<td>" + supId + "</td>" +
                    "<td>" + supName + "</td>" +
                    "<td>" + salePrice + "</td>" +
                    "<td>" + buyPrice + "</td>" +
                    "<td>" + expectedProfit + "</td>" +
                    "<td>" + profitMargin + "</td>" +
                    "<td>" + status + "</td>" +
                    "</tr>";
                $("#tblItem").append(row);
            }
            console.log(res.message);
        },
        error: function (error) {
            // Handle errors with a message
            let message = JSON.parse(error.responseText).message;
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
            console.log(message);
        }
    });
}

// Function to load all suppliers
function loadAllSuppliers() {
    $("#supplier_id").empty(); // Clear the supplier dropdown before populating with new data
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            // Loop through the response data and populate the dropdown options
            for (let i of res.data) {
                let id = i.code;
                $("#supplier_id").append(`<option>${id}</option>`);
            }
            console.log(res.message);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}

// Event listener for supplier dropdown
$("#supplier_id").click(function () {
    var search = $("#supplier_id").val();
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier/searchSupplier?code=" + search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#supName").val(res.name);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
});

// Event listener for save item button
$("#btnSaveI").click(function () {

    var image = $("#imgItem");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../img/other/img.png') {
        alert("Error");
    }

    let formData = $("#itemForm").serializeArray();
    formData.push({name: "itemPicture", value: imageUrl});

    // Serialize form data
   /* let formData = $("#itemForm").serialize();*/

    console.log(formData);
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item",
        method: "POST",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            loadAllItem();

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

$('#itemPicture').change(function() {
    var fileInput = $('#itemPicture')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {

            //itmCaptureClear();
            $('#imgItem').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        // $("#itmClear").prop("disabled", false);
        $(this).val("");
    } else {
        //$('#itemImgFileError').text('Please upload an image or GIF.');
        //$('#itemImgFileError').css("border", "1px solid #ced4da");
    }

});


/*
loadAllItem();
function loadAllItem() {
    $("#tblItem").empty();
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let itemId = i.code;
                let itemName = i.name;
                let category = i.shoeType;
                let size = i.size;
                let qty = i.qty;
                let supplier_id = i.supplier_id;
                let supName =i.supName;
                let salePrice = i.salePrice;
                let buyPrice = i.buyPrice;
                let expectedProfit = i.expectedProfit;
                let profitMargin = i.profitMargin;
                let status = i.status;

                let row = "<tr><td>" + itemId + "</td><td>" + itemName + "</td><td>" + category + "</td><td>" + size + "</td><td>" + qty + "</td><td>" + supplier_id + "</td><td>" + supName + "</td><td>" + salePrice + "</td><td>" + buyPrice + "</td><td>" + expectedProfit + "</td><td>" + profitMargin + "</td><td>" + status + "</td></tr>";
                $("#tblItem").append(row);

            }
           /!* blindClickEventsI();
            setTextFieldValuesI("", "", "", "", "", "", "", "", "", "", "","","","","");*!/
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
            console.log(message);
        }

    });
}

$("#supplier_id").empty();
$.ajax({
    url:  "http://localhost:8080/backEnd/api/v1/supplier",
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log(res);

        for (let i of res.data) {
            let id = i.code;

            $("#supplier_id").append(`<option>${id}</option>`);
        }
        console.log(res.message);
    },
    error: function (error) {
        let message = JSON.parse(error.responseText).message;
        console.log(message);
    }

});

$("#supplier_id").click(function () {
    var search = $("#supplier_id").val();
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier/searchSupplier?code="+ search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#supName").val(res.name);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    })
});

$("#btnSaveI").click(function (){
    var image = $("#imgItem");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../img/other/img.png') {
        alert("Error");
        // swal("Error", "Take Employee Photo.!", "error");
    }
    let formData = $("#itemForm").serialize();

    console.log(formData);
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item",
        method: "POST",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            loadAllItem();

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

$('#itemPicture').change(function() {
    var fileInput = $('#itemPicture')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {

            //itmCaptureClear();
            $('#img').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        // $("#itmClear").prop("disabled", false);
        $(this).val("");
    } else {
        //$('#itemImgFileError').text('Please upload an image or GIF.');
        //$('#itemImgFileError').css("border", "1px solid #ced4da");
    }

});

function blindClickEventsI() {
    $("#tblItem>tr").on("click", function () {
        let empId = $(this).children().eq(0).text();
        let empName = $(this).children().eq(1).text();
        let empGender = $(this).children().eq(2).text();
        let status = $(this).children().eq(3).text();
        let designation = $(this).children().eq(4).text();
        let role = $(this).children().eq(5).text();
        let birth = $(this).children().eq(6).text();
        let startDate = $(this).children().eq(7).text();
        let branch = $(this).children().eq(8).text();
        let addressColumn = $(this).children().eq(9).text();
        let addressComponents = addressColumn.split(', ');
        let address1 = addressComponents[0] || '';
        let address2 = addressComponents[1] || '';
        let address3 = addressComponents[2] || '';

        let empContact = $(this).children().eq(10).text();
        let person = $(this).children().eq(11).text();
        let eContact = $(this).children().eq(12).text();
        let email = $(this).children().eq(13).text();


        $("#empId").val(empId);
        $("#empName").val(empName);
        $("#empGender").val(empGender);
        $("#status").val(status);
        $("#designation").val(designation);
        $("#email").val(email);
        $("#role").val(role);
        $("#branch").val(branch);
        $("#address1").val(address1);
        $("#address2").val(address2);
        $("#address3").val(address3);
        $("#empContact").val(empContact);
        $("#person").val(person);
        $("#birth").val(birth);
        $("#startDate").val(startDate);
        $("#eContact").val(eContact);

    });

}

$("#btnUpdate").click(function () {
    let formData = $("#itemForm").serialize();
    let itemId = $("#itemId").val();
    formData += "&code=" + itemId;
    console.log(formData);
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item",
        method: "PUT",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            loadAllItem();

            Swal.fire({
                icon: "success",
                title: "Successfully item updated",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            console("Employee", JSON.parse(error.responseText).message);
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

$("#btnDelete").click(function () {
    let id = $("#itemId").val();
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item?code=" + id + "",
        method: "DELETE",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            loadAllItem();

            Swal.fire({
                icon: "success",
                title: "Successfully item deleted",
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
*/
