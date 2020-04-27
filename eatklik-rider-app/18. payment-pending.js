
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
var rider = JSON.parse(localStorage.getItem("Rider"));
$(document).ready(function () {
    PaymentPending(rider.Id);
});
var SearchBy = getUrlParameter('SearchBy');
console.log(SearchBy);
function PaymentPending(id) {
   var URL="";
  SearchBy=="All"?URL=(SERVER+"Order/Rider/"+id+"/Pending"):URL=(SERVER+"Order/Rider/"+id+"/OrderBydate/"+SearchBy)
  
    $.ajax({
        url:URL ,
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
