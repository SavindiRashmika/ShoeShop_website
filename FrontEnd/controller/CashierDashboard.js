
getCustomerCount();
getEmpCount();
getItemCount();
getItemQty();

function getCustomerCount() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/customer/cusCount",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            if (res) {
                let cusCount = res.count;
                console.log("count: " + cusCount);
                $("#cusCount").text(cusCount);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.responseText);
            }
    });
}

function getItemCount() {
    //performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item/itemCount",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            if (res) {
                let itemCount = res.count;
                console.log("count: " + itemCount);
                $("#itemCount").text(itemCount);
            }
        },
        error: function(xhr, status, error) {
            console.log("Error:", xhr.responseText);
        }
    });
}

function getItemQty() {
    //performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/item/itemQty",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            if (res) {
                let itemCount = res.count;
                console.log("count: " + itemCount);
                $("#itemQty").text(itemCount);
            }
        },
        error: function(xhr, status, error) {
            console.log("Error:", xhr.responseText);
        }
    });
}

function getEmpCount() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/employee/empCount",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            if (res) {
                let empCount = res.count;
                console.log("emp count: " + empCount);
                $("#empCount").text(empCount);
            }
        },
        error: function(xhr, status, error) {
            console.log("Error:", xhr.responseText);
        }
    });
}