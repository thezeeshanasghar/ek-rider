var rider = getObjsFromLocalStorage("Rider");
$(document).ready(function () {
loadAllOrders(rider.Id);
});
function loadAllOrders(id) {
   
    $.ajax({
        url: SERVER + "order/rider-complete/"+id,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               console.log(result);
               var html='';
               if(result) {
               
                  $.each(result, function(index,order){
                    var event = new Date(order.Created);
                      html += '<div class="payment-pending"><section><div class="wrapper"><div class="pending-id">Order ID #'+order.Id+'</div><div class="left-panel">';
                      html += '<p>Order Amount, Rs. '+order.GrandTotal+'</p><p>'+event.toLocaleTimeString('en-US')+', '+event.toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      }).replace(/ /g, '-')+'</p></div><div class="right-panel">';
                     html += '<img src="img/eye.png" onclick=\"viewDetail('+order.Id+')"\"></div></div></section></div>';    
                  }); 
                  $(".ordersall").html(html);    
              }
             
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
function viewDetail(id)
{
  window.open("16. order-detail.html?id="+id,"_self");
}
