$(document).ready(function () {
loadAllOrders();
});
function loadAllOrders() {
   
    $.ajax({
        url: SERVER + "order/status/3",
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               console.log(result);
               var html='';
               if(result) {
                  $.each(result, function(index,order){
                    var event = new Date(order.Created);
                      html += '<section><div class="wrapper"><div class="left-panel"><h2>Order ID #'+order.Id+'</h2>';
                      html += '<p>Order Amount, Rs. <span>'+order.GrandTotal+'</span></p><p>'+event.toLocaleTimeString('en-US')+', '+event.toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      }).replace(/ /g, '-')+'</p></div>';
                      html += '<div class="right-panel"><div class="order-status">New</div><a href="#">view detail</a>';
                      html += '</div></div></section>';         
                  }); 
                  $(".orders").html(html);
              }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}