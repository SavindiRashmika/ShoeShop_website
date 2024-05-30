

$("#btnSingUp").click(function() {
    let value = {
        email: $("#upUser_Name").val(),
        password: $("#upPassword").val(),
        role: $('#role_Type').val()
    }
    console.log(value);
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/auth/signup",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res) {
            localStorage.setItem('accessToken', res.token);
            Swal.fire({
                icon: "success",
                title: "user added successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (ob, textStatus, error) {
            alert("Error User Not Added");
        }
    });
});

$("#btnLogin").click(function() {
    let email = $("#user_Name").val();
    let password = $("#password").val();

    if(!email || !password){
        Swal.fire({
            icon: "error",
            title: "UserName or Password must not be empty",
            showConfirmButton: true
        });
        return;
    }

    let value = {
        email: email,
        password: password,
    }
    /*console.log(value);*/
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/auth/signIn",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res) {
            localStorage.setItem('email', value.email);
            localStorage.setItem('password', value.password);
            localStorage.setItem('accessToken', res.token);
            console.log("User SignIn Successfully "+res.token);
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');

            $.ajax({
                url: "http://localhost:8080/backEnd/api/v1/auth/search/" + value.email,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                dataType: "json",
                success: function (res) {
                    localStorage.setItem('role', res.role);
                    localStorage.setItem('cashier', value.email);
                    if (res.role === "ADMIN") {
                        window.location.href = "dashboardAdmin.html";
                    } else if(res.role === "USER"){
                        window.location.href = "cashierDashboard.html";
                    }
                },
                error: function (ob, textStatus, error) {
                     swal("Error","Error Sign in", "error");
                }
            });

        },
        error: function (ob, textStatus, error) {
            Swal.fire({
            icon: "error",
            title: "Error Sign in, check the userName and password ",
            showConfirmButton: true
        });

        }
    });
 });

$(document).ready(function() {
    var username = localStorage.getItem('email');
    $("#greeting").text("Welcome, " + username);
    $("#cashierName").val(username);
});

function isTokenExpired(token) {
            const jwtPayload = JSON.parse(atob(token.split('.')[1]));
            const expiryTime = jwtPayload.exp * 1000;
            return Date.now() >= expiryTime;
        }
function performAuthenticatedRequest() {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken || isTokenExpired(accessToken)) {
                $.ajax({
                    url: "http://localhost:8080/backEnd/api/v1/auth/signIn",
                    method: "POST",
                    data: JSON.stringify({
                        email: localStorage.getItem('email'),
                        password: localStorage.getItem('password'),
                    }),
                    contentType: "application/json",
                    success: function (res, textStatus, jsXH) {
                        localStorage.setItem('accessToken', res.token);
                        console.log("sign in Successfully "+res.token);
                    },
                    error: function (ob, textStatus, error) {
                        console.log("token renew sign in error "+accessToken);
                    }
                });
            }
        }
