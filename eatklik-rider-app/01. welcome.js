$(document).ready(function () {

    
});

function login() {
    obj = {
        "MobileNo": $("#Mobile").val(),
        "Password": $("#Password").val()
    }
    $.ajax({
        url: SERVER + "rider/login",
        type: "POST",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
          
               localStorage.setItem("Rider", JSON.stringify(result));
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
