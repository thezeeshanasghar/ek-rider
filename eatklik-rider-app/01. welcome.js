$(document).ready(function () {

  var Record=  localStorage.getItem("Rider");
  console.log(Record);
  if(Record)
  {
    window.location.href = "05. Dashboard.html";
  }
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
               window.location.href = "05. Dashboard.html";
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
