var OrderId=localStorage.getItem("CurrentOrder");
$("#TotalBill").text("300");
$("#AmmountRec").text("300");
$("#Remain").text("0");
$(".order-id").text("Order # " +OrderId);
console.log(OrderId)
$("#txtAmount").on("change",function(){
    console.log("key press",$("#txtAmount").val());
    
    
    $("#AmmountRec").text($("#txtAmount").val());

   
    $("#Remain").text((parseFloat( $("#TotalBill").text())-parseFloat($("#AmmountRec").text())).toString());

});

$("#endOrder").on("click",function(){
    localStorage.removeItem("CurrentOrder");
    window.open("05. Dashboard.html","_self");
})