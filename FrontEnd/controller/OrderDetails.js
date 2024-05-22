

loadAllOrders();
loadAllOrderDetails();

function loadAllOrders() {
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
    $("#tblSale").empty();
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
                let itemCode = i.itemCode;
                let orderQty = i.qty;
                let uPrice = i.unitPrice;

                let row = "<tr>" +
                    "<td>" + oid + "</td>" +
                    "<td>" + itemCode + "</td>" +
                    "<td>" + orderQty + "</td>" +
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