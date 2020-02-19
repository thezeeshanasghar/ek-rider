   var id = parseInt(getParameterByName("id")) || 0;
   var rider = getObjsFromLocalStorage("Rider");
$(document).ready(function () {
loadNewOrder(id);
});
function loadNewOrder(id) {
   
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

function AcceptOrder()
{
    console.log(rider.Id);
    $.ajax({
        url: SERVER + "order/"+ id +"/order-status/6",
        type: "PUT",
        dataType: "json",
      //  data: {'RiderId':2},
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               window.location.href = '05. Dashboard.html';
             
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

}

function RejectOrder()
{
    console.log(rider.Id);
    $.ajax({
        url: SERVER + "order/"+ id +"/order-status/7",
        type: "PUT",
        dataType: "json",
      //  data: {'RiderId':2},
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               window.location.href = '05. Dashboard.html';
             
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

}