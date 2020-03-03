var rider = getObjsFromLocalStorage("Rider");
$(document).ready(function () {
loadAllOrders(rider.Id);
});
function loadAllOrders(id) {
   
    $.ajax({
        url: SERVER + "order/rider/"+id,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               console.log(result);
               var html='';
               if(result) {
                 
                  $.each(result, function(index,order){
                    var event = new Date(order.Created);
                    
	 html+="<section>"
   html+="<div class=\"wrapper\">"   
   html+="<div class=\"left-panel\">"
   html+="<h2>Order ID #"+order.Id+"</h2>"
   html+=" <p>Order Amount, Rs. <span>"+order.GrandTotal+"</span></p>"
   html+= " <p>"+event.toLocaleTimeString('en-US')+', '+event.toLocaleDateString('en-GB', {   day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')+"</p>"
   html+="  </div>"
   html+="<div class=\"right-panel\">"
   html+=" <div class=\"order-status\">complete</div>"
   html+="<a href=\"16. order-detail.html?id="+order.Id+"\">view detail</a>"
   html+="</div>"
   html+=" </div>"
  html+="</section>"
       
                  }); 
                  $(".orders").html(html);
              }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
