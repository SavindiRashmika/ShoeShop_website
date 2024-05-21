
loadAllItemV();

function loadAllItemV() {
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
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: "application/json",
            dataType: "json",
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
                    /*blindClickEventsI();*/
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