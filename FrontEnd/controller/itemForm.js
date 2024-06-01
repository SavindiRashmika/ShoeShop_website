



loadAllItem();
loadAllSuppliers();
profitMargin();

function loadAllItem() {
    $("#tblItem").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
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
            blindClickEventsI();
        },
        error: function (error) {
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

function loadAllSuppliers() {
    $("#supplier_id").empty();
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

$("#supplier_id").click(function () {
    var search = $("#supplier_id").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/supplier/searchSup?code=" + search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
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

$("#btnSaveI").click(function () {

    var image = $("#imgItem");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../img/other/img.png') {
        alert("Error");
    }

    let formData = $("#itemForm").serializeArray();
    formData.push({name: "itemPicture", value: imageUrl});
    console.log(formData);
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item",
        method: "POST",
        data: formData,
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
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

$("#btnUpdateI").click(function () {
    var image = $("#imgItem");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../img/other/img.png') {
        //alert("Error");
    }

    let formData = $("#itemForm").serializeArray();
    formData.push({name: "itemPicture", value: imageUrl});
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(formData);
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item",
        method: "PUT",
        data: formData,
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
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
            console.log("Item", JSON.parse(error.responseText).message);
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

$("#btnDeleteI").click(function () {
    let id = $("#itemId").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item?code=" + id + "",
        method: "DELETE",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
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


function profitMargin() {
    let salePrice = parseFloat($("#salePrice").val());
    let buyPrice = parseFloat($("#buyPrice").val());

    if (!isNaN(salePrice) && !isNaN(buyPrice)) {
        let profit = salePrice - buyPrice;
        let profitMargin = Math.round((profit / salePrice) * 100);
        profitMargin = profitMargin.toFixed(1);
        $("#expectedProfit").val(profit);
        $("#profitMargin").val(profitMargin);
    } else {
        $("#expectedProfit").val('');
        $("#profitMargin").val('');
    }
}


$("#salePrice").on("input", function() {
    profitMargin();
});




function blindClickEventsI() {
    $("#tblItem>tr").on("click", function () {
        let itemId = $(this).children().eq(0).text();
        let itemName = $(this).children().eq(1).text();
        let category = $(this).children().eq(2).text();
        let size = $(this).children().eq(3).text();
        let qty = $(this).children().eq(4).text();
        let supplierId = $(this).children().eq(5).text();
        let supName = $(this).children().eq(6).text();
        let salePrice = $(this).children().eq(7).text();
        let buyPrice = $(this).children().eq(8).text();
        let expectedProfit = $(this).children().eq(9).text();
        let profitMargin = $(this).children().eq(10).text();
        let status = $(this).children().eq(11).text();

        $("#itemId").val(itemId);
        $("#itemName").val(itemName);
        $("#category").val(category);
        $("#size").val(size);
        $("#qty").val(qty);
        $("#supplier_id").val(supplierId);
        $("#supName").val(supName);
        $("#salePrice").val(salePrice);
        $("#buyPrice").val(buyPrice);
        $("#expectedProfit").val(expectedProfit);
        $("#profitMargin").val(profitMargin);
        $("#status").val(status);
    });
}

$("#form1").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#form1").val();
        $("#tblItem").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/backEnd/api/v1/item/searchItem",
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
                    let itemId = res.code;
                    let itemName = res.name;
                    let category = res.shoeType;
                    let size = res.size;
                    let qty = res.qty;
                    let supplier_id = res.supplier;
                    let supName = res.supName;
                    let salePrice = res.salePrice;
                    let buyPrice = res.buyPrice;
                    let expectedProfit = res.expectedProfit;
                    let profitMargin = res.profitMargin;
                    let status = res.status;

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
                    blindClickEventsI();
                }
            },
            error: function (error) {
                loadAllItem();
                let message = JSON.parse(error.responseText).message;
                console.error("Error:", message);
            }
        });
    }
});





