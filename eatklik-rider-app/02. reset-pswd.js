function VerifyNumber()
{
var Number=$("#Contact").val()
    $.ajax({
        url: SERVER + "Rider/VerifyNumber/"+Number,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend:function(){
            $('#loading').removeClass("d-none");
        },
        success: function (result) {
          console.log(result);
          if(result)
          {
            localStorage.setItem("RiderId",result.Id);
            window.open("03. verify.html","_self");
          }
             
        },
        error: function (xhr, status, error) 
        {
            //var resp=JSON.parse(xhr.responseText);

           // alert(resp.message);
        alert("error")
        },
        complete:function()
        {
            $('#loading').addClass("d-none");
        }
 
    });
}