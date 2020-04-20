$(document).ready(function () {

  var Record=  JSON.parse(localStorage.getItem("Rider"));
  var CurrentOrder=localStorage.getItem("CurrentOrder");
  console.log(Record);
  if(Record)
  {
    if(CurrentOrder)
    {
     // window.location.href = "09. order-deliver.html";
     $.ajax({
       type:"Get",
       dataType:"json",
       url: SERVER + "order/"+ CurrentOrder,
       success:function(response)
       {
          console.log(response);
          if(response.OrderStatus==2)
          {
            window.location.href = "09. order-deliver.html";
          }else{
            window.location.href="08. order-pick.html";
          }
       },
       error:function(response)
       {

       }
     })
    }else{
          window.location.href = "05. Dashboard.html";
    }

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
          if(result)
          {
            if(result.IsVerified==1)
            {
              localStorage.setItem("Rider", JSON.stringify(result));
              window.location.href = "05. Dashboard.html";
            }else{

                localStorage.setItem("RiderId", result.Id);
                window.location.href = "03. verify.html";
            }
          }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
