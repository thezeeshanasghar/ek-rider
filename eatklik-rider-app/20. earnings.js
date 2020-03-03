var rider = getObjsFromLocalStorage("Rider");
$(document).ready(function () {
loadAllErnings(rider.Id);
});
function loadAllErnings(id) {
   
    $.ajax({
        url: SERVER + "order/rider/"+id,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               console.log(result);
               var html='';
               if(result) {
                   console.log(result);
                   var count = result.length;
                   var AllEarnings=0;
                   for(var i=0;i<result.length;i++)
                   {
                    AllEarnings+=parseFloat(result[i].GrandTotal) ;
                   }
                 $("#OrderDate").html(result[result.length-1].Created.split("T")[0])
                   console.log(count);
                   console.log(AllEarnings);
                  $("#count").html(count);
                  $("#amount").html(AllEarnings);

              }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
