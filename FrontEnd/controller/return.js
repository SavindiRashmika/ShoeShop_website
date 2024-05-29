

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

    $('#rDate').val(`${formattedDate} ${formattedTime}`);
}

updateDateTime();

setInterval(updateDateTime, 1000);


function getTodayPaymentTotal() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/admin/todayIncome",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            if (res && res.data !== undefined) {
                let total = res.data;
                console.log("Today's total payment: " + total);
                $("#totalPayment").text(total);
                $("#totalPayment").val(total);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.responseText); // Log the response for debugging
            alert("Failed to get today's total payment. Please check the console for details.");
        }
    });
}

$(document).ready(function() {
    getTodayPaymentTotal();
});

$(document).ready(function() {
    $("#returnBtn").click(function () {
        var orderOb = {
            oid: $("#rCode").val(),
            purchaseDate: $("#rDate").val(),
            total: $("#rPrice").val(),
            customer: {
                code: $("#cCode").val(),
                name: $("#cName").val()
            },
            saleDetails: [
                {
                    itemCode: $("#rId").val(),
                    qty: $("#rQty").val()
                }
            ]
        };

        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');

        $.ajax({
            url: "http://localhost:8080/backEnd/api/v1/orders/returnOrder",
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: JSON.stringify(orderOb),
            success: function (res) {
                Swal.fire({
                    icon: "success",
                    title: "Return Process Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error: function (error) {
                let message = JSON.parse(error.responseText).message;
                Swal.fire({
                    icon: "error",
                    title: "Failed to Return Process",
                    text: message,
                    showConfirmButton: true
                });
            }
        });
    });
});

$("#rCode").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#rCode").val();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/backEnd/api/v1/orders/searchOrder?code="+ search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (res) {
                console.log(res);
                $("#cCode").val(res.customer.code);
                $("#cName").val(res.customer.name);
                if (Array.isArray(res.saleDetails) && res.saleDetails.length > 0) {
                    const firstSaleDetail = res.saleDetails[0];
                    $("#rId").val(firstSaleDetail.itemCode);
                    $("#rQty").val(firstSaleDetail.qty);
                    //$("#rPrice").val(firstSaleDetail.unitPrice);
                }

            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Request failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

});

