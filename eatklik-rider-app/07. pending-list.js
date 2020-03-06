var rider = getObjsFromLocalStorage("Rider");
$(document).ready(function () {
loadNewOrders();
//window.setInterval("loadNewOrders()", 30000);

$(".burger").click(function(){
  
    $(".edit-full-wrapper").fadeIn();

});

$(".edit-full-wrapper").click(function(){

    $(this).fadeOut();

});
});
function loadNewOrders() {
   
    $.ajax({
        url: SERVER + "order/rider/"+rider.Id+"/pending",
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               console.log(result);
               var html='';
               if(result) {
                  $.each(result, function(index,order){
                    var event = new Date(order.Created);
                    var today= new Date();
                      html += '<section><div class="left-panel"><h4>Order #'+order.Id+'</h4></div>';
                      html += '<div class="right-panel"><span>'+(Date.dateDiff('n', event, today)>60?'more the an hour':Date.dateDiff('n', event, today)+' min.')+'</span></div>';
                      html += '<ul><li><img src="img/clock.png">'+ event.toLocaleTimeString('en-US')+'</li><li><img src="img/spoon-fork.png"> '+order.Restaurant.RestaurantLocations[0].Address+'</li>';
                      html +='<li><img src="img/marker.png">'+order.Address+'</li></ul>';
                      //html += '<div class="right-panel"><a href="#" onclick="OrderPIck('+order.Id+')"><img class="view" src="img/PickOrder.png"></a></div></section>';
                      html += '<div class="right-panel"><a href="07. pending-order.html?id='+order.Id+'"><img class="view" src="img/eye.png"></a></div></section>';
                  }); 
                  if (result.length > 0)
                  $(".all-orders").html(html);
              }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
// function OrderPIck(OrderPIck)
// {
//     localStorage.setItem("CurrentOrder",OrderPIck);
//     window.open("08. order-pick.html","_self");
// }
Date.dateDiff = function(datepart, fromdate, todate) {	
    datepart = datepart.toLowerCase();	
    var diff = todate - fromdate;	
    var divideBy = { w:604800000, 
                     d:86400000, 
                     h:3600000, 
                     n:60000, 
                     s:1000 };	
    
    return Math.floor( diff/divideBy[datepart]);
  }
  function  Session_logout()
  {
    localStorage.clear();
    window.open("01. welcome.html","_self");
  }