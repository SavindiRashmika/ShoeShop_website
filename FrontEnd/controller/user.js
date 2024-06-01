

$("#uDelete").click(function () {
    let email= $("#Useremail").val()
    let value = {
        email: $("#Useremail").val(),
        password: $("#userpass").val(),
        role: $('#Userrole').val()
    }
            $.ajax({
                url: "http://localhost:8080/backEnd/api/v1/auth?email=" + email + "",
                method: "DELETE",
                contentType: "application/json",
                success: function (res) {
                    console.log(res);
                    Swal.fire({
                        icon: "success",
                        title: "user Delete Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });


                },
                error: function (error) {
                    console.log(error);
                    alert("Error Not Deleted")
                }
            });
});

$("#uName").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#uName").val();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');

        $.ajax({
            url: "http://localhost:8080/backEnd/api/v1/auth/searchUser",
            method: "GET",
            data: {
                name: search
            },
            contentType: "application/json",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (res) {
                console.log(res);
                $("#uName").val(res.email);
                $("#uRole").val(res.role);

            },
            error: function (error) {
               console.error("Error:", error);
            }
        });
    }
});


$("#btnDeleteC").click(function () {
    let id = $("#cusId").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/customer?code=" + id + "",
        method: "DELETE",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            console.log(resp);
            loadAllCus();
            generateCustomerID();

            Swal.fire({
                icon: "success",
                title: "Successfully customer deleted",
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