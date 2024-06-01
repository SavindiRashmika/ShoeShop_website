
loadAllCust();


$(document).ready(function() {
    generateOrderID();

});

function generateOrderID() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/orders/OrderIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function(resp) {
            let id = resp.value;
            console.log("id: " + id);

            if (id === null) {
                $("#oid").val("O00-001");
            } else {
                let tempId = parseInt(id.split("-")[1]);
                tempId++;
                let newId = "O00-" + tempId.toString().padStart(3, "0");
                $("#oid").val(newId);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            alert("Failed to generate Order ID");
        }
    });
}

function loadAllCust() {
    $("#customId").empty();
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
                let id = i.code;
                $("#customId").append(`<option>${id}</option>`);
            }
            console.log(res.message);
        },
        error: function (error) {
            //let message = JSON.parse(error.responseText).message;
           // console.log(message);
        }
    });
}

$("#customId").click(function () {
    var search = $("#customId").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/customer/searchCus?code="+ search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            $("#custName").val(res.name);
            $("#tPoint").val(res.loyaltyPoints);
            $("#cusLevel").val(res.level);
        },
        error: function (error) {
            //let message = JSON.parse(error.responseText).message;
            //console.log(message);
        }
    })
});

function loadAllIte() {
    $("#itemId").empty();
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
            for (let i of res.data) {
                let id = i.code;
                $("#itemId").append(`<option>${id}</option>`);
            }
            console.log(res.message);
        },
        error: function (error) {
           // let message = JSON.parse(error.responseText).message;
           // console.log(message);
        }
    });
}


$("#itemName").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#itemName").val();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/backEnd/api/v1/item/searchItem",
            method: "GET",
            data: {
                code: search,
                name: search
            },
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                $("#itemId").val(res.code);
                $("#itemName").val(res.name);
                $("#qprice").val(res.salePrice);
                $("#qtyH").val(res.qty);
            },
            error: function (error) {
                loadAllItem();
                let message = JSON.parse(error.responseText).message;
                console.error("Error:", message);
            }
        });
    }
});

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

    $('#oDate').val(`${formattedDate} ${formattedTime}`);
}

updateDateTime();

setInterval(updateDateTime, 1000);

let tableRow = [];
$("#BTN").on("click", function () {

    let duplicate = false;
    for (let i = 0; i < $("#tblOrder tr").length; i++) {
        if ($("#itemId option:selected").text() === $("#tblOrder tr").children(':nth-child(1)')[i].innerText) {
            duplicate = true;

        }
    }
    if (duplicate !== true) {

        loadCartTableDetail();
        reduceQty($("#qty").val());
        calcTotal($("#qty").val() * $("#qprice").val());
        $('#itemId,#itemName,#qprice,#qtyH,#qty').val("");
        $("#tblOrder").attr('disabled', true);
    } else if (duplicate === true) {

        manageQtyOnHand(tableRow.children(':nth-child(4)').text(), $("#qty").val());
        $(tableRow).children(':nth-child(4)').text($("#qty").val());

        manageTotal(tableRow.children(':nth-child(5)').text(), $("#qty").val() * $("#qprice").val());
        $(tableRow).children(':nth-child(5)').text($("#qty").val() * $("#qprice").val());

    }
    $("#tblOrder>tr").click('click', function () {

        tableRow = $(this);
        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let unitPrice = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();
        let total = $(this).children(":eq(4)").text();

        $("#itemId").val(itemCode);
        $("#itemName").val(itemName);
        $("#qprice").val(unitPrice);
        $("#qty").val(qty);
        $("#amount").val(total);

    });
});


let total = 0;
let discount = 0;
let amount = 0;
function calcTotal(amountt) {
    amount += amountt;
    $("#amount").val(amount.toFixed(2));
}

function reduceQty(orderQty) {
    let minQty = parseInt(orderQty);
    let reduceQty = parseInt($("#qtyH").val());
    reduceQty = reduceQty - minQty;
    $("#qtyH").val(reduceQty);
}

function manageQtyOnHand(preQty, nowQty) {
    var preQty = parseInt(preQty);
    var nowQty = parseInt(nowQty);
    let avaQty = parseInt($("#qtyH").val());

    avaQty = avaQty + preQty;
    avaQty = avaQty - nowQty;

    $("#qtyH").val(avaQty);
}

function manageTotal(preTotal, nowTotal) {
    amount -= preTotal;
    amount += nowTotal;

    $("#amount").val(amount.toFixed(2));
}

$("#tblOrder").empty();
function loadCartTableDetail() {

    let itemCode = $("#itemId").val();
    let itemName = $("#itemName").val();
    let itemPrice = $("#qprice").val();
    let itemOrderQty = $("#qty").val();

    let total = itemPrice * itemOrderQty;
    let row = "<tr>" +
        "<td>" + itemCode + "</td>" +
        "<td>" + itemName + "</td>" +
        "<td>" + itemPrice + "</td>" +
        "<td>" + itemOrderQty + "</td>" +
        "<td>" + total + "</td>" +
        "</tr>";
    $("#tblOrder").append(row);
}

$(document).on("change keyup blur", "#discount", function () {
    discount = $("#discount").val();
    discount = (amount / 100) * discount;
    total = amount - discount;

    $("#total").val(total);
});

$(document).on("change keyup blur", "#cash", function () {
    let cash = $("#cash").val();
    let balance = cash - total;
    $("#balance").val(balance);
    if (balance < 0) {
        $("#lblCheck").parent().children('strong').text(balance + " : plz enter valid Balance");
        $("#placeBtn").attr('disabled', true);
    } else {
        $("#lblCheck").parent().children('strong').text("");
        $("#placeBtn").attr('disabled', false);
    }
});

generateOrderID();


$("#placeBtn").click(function () {
    placeOrder();
});
$("#placeBtnC").click(function () {
    placeOrder();
});

function placeOrder(){
    var orderDetails = [];
    $("#tblOrder tr").each(function (i, row) {
        var detailOb = {
            oid: $("#oid").val(),
            itemCode: $(row).find('td:eq(0)').text(),
            qty: $(row).find('td:eq(3)').text(),
            unitPrice: $(row).find('td:eq(2)').text()
        };
        orderDetails.push(detailOb);
    });

    var orderId = $("#oid").val();
    if (!orderId) {
        alert("Order ID must not be null");
        return;
    }

    var customerCode = $("#customId").val();
    var customerName = $("#custName").val();
    var totalPoints = $("#tPoint").val();
    var cashier = $("#cashierName").val();
    var payment = $("#payM").val();
    var total = $("#total").val();


    if (!customerCode || !customerName) {
        alert("Customer information must not be null");
        return;
    }

    var date = $("#oDate").val();

    var orderOb = {
        oid: orderId,
        purchaseDate: date,
        total: total,
        paymentMethod:payment,
        cashier: cashier,
        totalPoints:totalPoints,
        customer: {
            code: customerCode,
            name: customerName,
            point: totalPoints
        },
        saleDetails: orderDetails
    };
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');

    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/orders",
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
                title: "Order placed successfully",
                showConfirmButton: false,
                timer: 1500
            });
            generateOrderID();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert("Failed to place order: " + message);
        }
    });

    clearForm();
    $("#tblOrder").empty();
}


function clearForm() {
    $('#customId, #custName, #itemId, #itemName, #qprice, #qtyH, #qty, #discount, #total, #amount, #cash, #balance').val("");
    $("#tblOrder").empty();
}

function getStockStatus(currentQuantity, originalQuantity) {
    if (currentQuantity <= 0) {
        return "not available";
    } else if (currentQuantity <= 10) {
        return "low";
    } else {
        return "available";
    }
}

$(document).on("change keyup blur", "#qty, #qtyH", function () {
    let orderQty = parseFloat($("#qty").val()) || 0;
    let originalQuantity = parseFloat($("#qtyH").val()) || 0;
    let currentQuantity = originalQuantity - orderQty;

    let stockStatus = getStockStatus(currentQuantity, originalQuantity);
    $("#status").val(stockStatus);
});
