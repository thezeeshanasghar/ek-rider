var OrderId=localStorage.getItem("CurrentOrder");

$(".order-id").text("Order # " +OrderId);
console.log(OrderId)
$("#txtAmount").on("change",function(){
    console.log("key press",$("#txtAmount").val());
    
    
    $("#AmmountRec").text($("#txtAmount").val());

   
    $("#Remain").text((parseFloat( $("#TotalBill").text())-parseFloat($("#AmmountRec").text())).toString());

});

$("#endOrder").on("click",function(){
    if(   $("#Remain").text() !="0"){
        return false;
    }
    // localStorage.removeItem("CurrentOrder");
    // window.open("05. Dashboard.html","_self");
    OrderStatus();
})

getOrder();
function getOrder(){
    $.ajax({
      Type:"GET",
      dataType:"json",
      url: SERVER + "order/"+ OrderId,
      
      success:function(response)
      {
          
        $("#TotalBill").text(response.GrandTotal);
        $("#AmmountRec").text(response.GrandTotal);
        $("#Remain").text("0");
          
      },
      error:function(response)
      {
          console.log(response);
      }
  
  })  
  }

  
function OrderStatus(){

    $.ajax({
      
        dataType:"json",
        method:"PUT",
        url:SERVER+"Order/"+OrderId+"/order-status/"+3,
        success:function(response)
        {
            localStorage.removeItem("CurrentOrder");
            window.open("05. Dashboard.html","_self");
        },
        error:function(response)
        {
            console.log("error",response);
        }
        
    })

};
