var rider = JSON.parse(localStorage.getItem("Rider"));
$(document).ready(function () {
    PaymentPending(rider.Id);
});
function PaymentPending(id) {
   
    $.ajax({
        url: SERVER + "order/rider/"+id+'/pending',
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               console.log(result);
            var html="";
            var Payment=0;
            for(var i=0;i<result.length;i++)
            {
               html+="<section>"
			   html+=" <div class=\"wrapper\">"
               html+="<div class=\"pending-id\">"
               html+="Order ID #"+result[i].Id
               html+=" </div>"
               html+="<div class=\"left-panel\">"
               html+="<p>Order Amount, Rs."+result[i].GrandTotal+"</p>"
               html+="<p>"+result[i].Created.split("T")[0]+"</p>"
               html+="</div>"
               html+="<div class=\"right-panel\">"
               html+="<img src=\"img/eye.png\" onclick=\"GetOrderDetail("+result[i].Id+")\">"
            //    html+="<p class=\"gray\">Wallet Rs. 550</p>"
               html+="</div>"
               html+="</div>"
               html+="</section>" 
               Payment+=parseFloat(result[i].GrandTotal);
            }
               $(".payment-pending").html(html);
            $("#Payment").html(Payment);
            $("#OrderDate").html(result[result.length-1].Created.split("T")[0])
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
function GetOrderDetail(Id)
{
    window.open("16. order-detail.html?id="+Id,"_self");
}