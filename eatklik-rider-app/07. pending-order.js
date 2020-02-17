$(document).ready(function () {
loadNewOrder();

});
   var id = parseInt(getParameterByName("id")) || 0;

function loadNewOrder() {
   
    $.ajax({
        url: SERVER + "order/"+ id,
        url: SERVER + "order/15",
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               console.log(result);
               var html='';
               if(result) {
                  $.each(result.OrderItems, function(index,item){
                      html += '<section><div class="left-panel">'+ item.Name + '('+item.Size+')'+'</div><div class="right-panel">';
                      html += '<div class="qty">'+item.Quantity+'</div><div class="price">RS '+item.Total+'</div></div></section>'; 
                  }); 
                  $("#orderitems").html(html);
                  $("#instructions").html(result.Instruction);
                  $("#paymethod").html(result.PayMethod);
                  $("#grandtotal").html('Rs '+result.GrandTotal);

              }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
