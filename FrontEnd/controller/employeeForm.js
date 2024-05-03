


loadAllEmp();

function generateEmployeeID() {
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/employee/EmployeeIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);

            if (id === null) {
                $("#empId").val("E00-001");
            } else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#empId").val("E00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#empId").val("E00-0" + tempId);
                } else {
                    $("#empId").val("E00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {
            console.log(ob);
            console.log(statusText);
            console.log(error);
        }
    });
}

function loadAllEmp() {
    $("#tblEmployee").empty();
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/employee",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let empId = i.code;
                let name = i.name;
                let gender = i.gender
                let status = i.status
                let designation = i.designation;
                let role = i.role;
                let joinDate =i.joinDate;
                let dob = i.birth;
                let branch = i.branch;
                let address = i.address;
                let contact = i.contact;
                let person = i.person;
                let eContact = i.emgContact;
                let email = i.email;

                let ad1 = address.address1;
                let ad2 = address.address2;
                let ad3 = address.address3;

                let addressColumn = ad1 + ", " + ad2 + ", " + ad3;

                let row = "<tr><td>" + empId + "</td><td>" + name + "</td><td>" + gender + "</td><td>" + status + "</td><td>" + designation + "</td><td>" + role + "</td><td>" + joinDate + "</td><td>" + dob + "</td><td>" + branch + "</td><td>" + addressColumn + "</td><td>" + contact + "</td><td>" + person + "</td><td>" + eContact + "</td><td>" + email + "</td></tr>";
                $("#tblEmployee").append(row);

            }
            generateEmployeeID();
            blindClickEventsE();
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}

/*
$("#btnSave").click(function () {
    var image = $("#img");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../img/other/img.png') {
        alert("Error");
        swal("Error", "Take Employee Photo.!", "error");
    }

    let empId = $("#empId").val();
    let name = $("#empName").val();
    let status = $("#status").val();
    let designation = $("#designation").val();
    let gender = $("#empGender").val();
    let email = $("#email").val();
    let role = $("#role").val();
    let birth = $("#birth").val();
    let joinDate = $("#startDate").val();
    let branch = $("#branch").val();
    let address1 = $("#address1").val();
    let address2 = $("#address2").val();
    let address3 = $("#address3").val();
    let contact = $("#empContact").val();
    let person = $("#person").val();
    let eContact = $("#eContact").val();


    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/employee",
        method: "POST",
        data: JSON.stringify({
            "code": empId,
            "name": name,
            "designation":designation,
            "status": status,
            "gender": gender,
            "email":email,
            "role": role,
            "branch": branch,
            "address1": address1,
            address2:address2,
            address3: address3,
            contact: contact,
            EmgContact: eContact,
            person: person,
            birth: birth,
            joinDate: joinDate
        }), // Convert data to JSON string
        contentType: "application/json",
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                loadAllEmp();
                generateEmployeeID();
                alert("Succsesfully saved");
            } else {
                console.log(res)
                alert(res);
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
            console.log(textStatus);
            console.log(error);
        }
    });
});
*/

$("#btnSave").click(function (){
    var image = $("#img");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../img/other/img.png') {
        alert("Error");
       // swal("Error", "Take Employee Photo.!", "error");
    }
    let formData = $("#empForm").serialize();
    let empId = $("#empId").val();
    formData += "&code=" + empId;
    console.log(formData);
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/employee",
        method: "POST",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
                loadAllEmp();
                generateEmployeeID();

                Swal.fire({
                    position: "top-end",
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

$('#inputGroupFile02').change(function() {
    var fileInput = $('#inputGroupFile02')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {

            //itmCaptureClear();
            $('#img').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        // $("#itmClear").prop("disabled", false);
        $(this).val("");
    } else {
        //$('#itemImgFileError').text('Please upload an image or GIF.');
        //$('#itemImgFileError').css("border", "1px solid #ced4da");
    }

});

function blindClickEventsE() {
    $("#tblEmployee>tr").on("click", function () {
        let empId = $(this).children().eq(0).text();
        let empName = $(this).children().eq(1).text();
        let empGender = $(this).children().eq(2).text();
        let status = $(this).children().eq(3).text();
        let designation = $(this).children().eq(4).text();
        let role = $(this).children().eq(5).text();
        let birth = $(this).children().eq(6).text();
        let startDate = $(this).children().eq(7).text();
        let branch = $(this).children().eq(8).text();
        let addressColumn = $(this).children().eq(9).text();
        let addressComponents = addressColumn.split(', ');
        let address1 = addressComponents[0] || '';
        let address2 = addressComponents[1] || '';
        let address3 = addressComponents[2] || '';

        let empContact = $(this).children().eq(10).text();
        let person = $(this).children().eq(11).text();
        let eContact = $(this).children().eq(12).text();
        let email = $(this).children().eq(13).text();


        $("#empId").val(empId);
        $("#empName").val(empName);
        $("#empGender").val(empGender);
        $("#status").val(status);
        $("#designation").val(designation);
        $("#email").val(email);
        $("#role").val(role);
        $("#branch").val(branch);
        $("#address1").val(address1);
        $("#address2").val(address2);
        $("#address3").val(address3);
        $("#empContact").val(empContact);
        $("#person").val(person);
        $("#birth").val(birth);
        $("#startDate").val(startDate);
        $("#eContact").val(eContact);

    });

}

$("#btnUpdate").click(function () {
    let formData = $("#empForm").serialize();
    let empId = $("#empId").val();
    formData += "&code=" + empId;
    console.log(formData);
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/employee",
        method: "PUT",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            loadAllEmp();
            generateEmployeeID();

            Swal.fire({
                icon: "success",
                title: "Successfully employee updated",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            console("Employee", JSON.parse(error.responseText).message);
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

$("#btnDelete").click(function () {
    let id = $("#empId").val();
    $.ajax({
        url: "http://localhost:8080/backEnd/api/v1/employee?code=" + id + "",
        method: "DELETE",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            loadAllEmp();
            generateEmployeeID();

            Swal.fire({
                icon: "success",
                title: "Successfully employee deleted",
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

$("#search_Id").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#search_Id").val();
        $("#tblEmployee").empty();
        $.ajax({
            url: "http://localhost:8080/backEnd/api/v1/employee/searchEmployee?empId=" + search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                $("#empId").val(res.code);
                $("#empName").val(res.name);
                $("#empGender").val(res.gender);
                $("#status").val(res.status);
                $("#designation").val(res.designation);
                $("#email").val(res.email);
                $("#role").val(res.role);
                $("#branch").val(res.branch);
                $("#address1").val(res.address1);
                $("#address2").val(res.address2);
                $("#address3").val(res.address3);
                $("#empContact").val(res.contact);
                $("#person").val(res.person);
                $("#birth").val(res.birth);
                $("#startDate").val(res.joinDate);
                $("#eContact").val(res.emgContact);

                let row = "<tr><td>" + res.code + "</td><td>" + res.name + "</td><td>" + res.gender + "</td><td>" + res.status + "</td><td>" + res.designation + "</td><td>" + res.role + "</td><td>" + res.joinDate + "</td><td>" + res.dob + "</td><td>" + res.branch + "</td><td>" + addressColumn + "</td><td>" + res.contact + "</td><td>" + res.person + "</td><td>" + res.eContact + "</td><td>" + res.email + "</td></tr>";
                $("#tblEmployee").append(row);
            },
            error: function (error) {
                loadAllEmp();
                let message = JSON.parse(error.responseText).message;
                console.log(message);
            }
        })
    }

});

$("#searchCusId").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#searchCusId").val();
        $("#customerTable").empty();
        $.ajax({
            url: baseUrl + "customer/searchCusId/?id="+ search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                let row = "<tr><td>" + res.id + "</td><td>" + res.name + "</td><td>" + res.address + "</td><td>" + res.salary + "</td></tr>";
                $("#").append(row);
                blindClickEventsE();
            },
            error: function (error) {
                loadAllCustomer();
                let message = JSON.parse(error.responseText).message;
                emptyMassage(message);
            }
        })
    }

});




