$(document).ready(function () {
loadNewOrder();
});
function loadNewOrder() {
   
    $.ajax({
        url: SERVER + "order/15",
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (order) {
               console.log(order);
               var html='';
               var event = new Date(order.Created);
               if(order) {
                  $.each(order.OrderItems, function(index,item){
                      html += '<section><div class="left-panel">'+ item.Name + '('+item.Size+')'+'</div><div class="right-panel">';
                      html += '<div class="qty">'+item.Quantity+'</div><div class="price">RS '+item.Total+'</div></div></section>'; 
                  }); 
                  $("#time").html(event.toLocaleTimeString('en-US'));
                  $("#date").html(event.toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  }).replace(/ /g, '-'));
                  $("#orderitems").html(html);
                  $("#paymethod").html(order.PayMethod);
                  $("#grandtotal").html(order.GrandTotal);

              }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
