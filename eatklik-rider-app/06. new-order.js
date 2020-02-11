   var id = parseInt(getParameterByName("id")) || 0;



$(document).ready(function () {
loadNewOrder();
});
function loadNewOrder() {
   
    $.ajax({
        url: SERVER + "order/"+ id,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               console.log(result);
               var html='';
               var emp = '<h3 id="no-found">No Data Found</h3>';
               if(result) {
                  $.each(result.OrderItems, function(index,item){
                      html += '<section><div class="left-panel">'+ item.Name + '('+item.Size+')'+'</div><div class="right-panel">';
                      html += '<div class="qty">'+item.Quantity+'</div><div class="price">RS '+item.Total+'</div></div></section>'; 
                  }); 

                  if(result.OrderItems == 0) {

                    $("#act-order").html(emp);

                  }
                  

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
