

getDayOrderQty();
getTodayOrders();
getTopSellItem();

function getDayOrderQty() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/orders/todayOrderQ",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            if (res && res.data !== undefined) {
                let expectProfit = res.data;
                console.log("Today's expect Profit: " + expectProfit);
                $("#expectProfit").text(expectProfit);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.responseText);
            alert("Failed to get today's expect Profit. Please check the console for details.");
        }
    });
}


function getTodayOrders() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/orders/todayOrders",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            if (res && res.data !== undefined) {
                let order = res.data;
                console.log("Today's total orders: " + order);
                $("#orders").text(order);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.responseText);
            alert("Failed to get today's expect Profit. Please check the console for details.");
        }
    });
}

function getTopSellItem() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/orders/topItems",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            if (res && res[0] !== undefined && res[0].length === 2) {
                const itemName = res[0][0];
                const quantity = res[0][1];
                $("#mostSaleN").text(`${itemName}`);
                $("#mostSaleQ").text(`${quantity}`);

            } else {
                $("#mostSale").text('No data available.');
            }
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.responseText);
            alert("Failed to get today's expect Profit. Please check the console for details.");
        }
    });
}