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
                   var count = result.length;
                   var amount = count * 40;
                   console.log(count);
                   console.log(amount);
                  $("#count").html(count);
                  $("#amount").html(amount);

              }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
