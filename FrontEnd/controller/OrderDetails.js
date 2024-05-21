

loadAllOrders();
loadAllOrderDetails();

function loadAllOrders() {
    $("#tblSale").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/orders/LoadOrders",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let oid = i.oid;
                let date = i.purchaseDate;
                let cus = i.customer;
                let paymentMethod = i.paymentMethod;
                let total = i.total;
                let cashier = i.cashier;

                let id = cus.code;
                let name = cus.name;

                let customer = `${id} - ${name}`;

                let row = "<tr>" +
                    "<td>" + oid + "</td>" +
                    "<td>" + date + "</td>" +
                    "<td>" + customer + "</td>" +
                    "<td>" + paymentMethod + "</td>" +
                    "<td>" + total + "</td>" +
                    "<td>" + cashier + "</td>" +
                    "</tr>";
                $("#tblSaleD").append(row);
            }
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}

function loadAllOrderDetails() {
    $("#tblSaleD").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/orders/LoadOrderDetails",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let oid = i.oid;
                let date = i.itemCode;
                let qty = i.qty;
                let uPrice = i.unitPrice;

                let row = "<tr>" +
                    "<td>" + oid + "</td>" +
                    "<td>" + date + "</td>" +
                    "<td>" + qty + "</td>" +
                    "<td>" + uPrice + "</td>" +
                    "</tr>";
                $("#tblSale").append(row);
            }
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}