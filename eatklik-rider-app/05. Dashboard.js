var rider = getObjsFromLocalStorage("Rider");
function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good; 
    img.onerror = bad;
    img.src = imageSrc;
}


$(document).ready(function () {
<<<<<<< HEAD
    //$(".edit-header img").attr("src",rider.ProfileImage);
    checkImage(rider.ProfileImage, function(){ 
        $(".edit-header img").attr("src",rider.ProfileImage);
     }, function(){ 
        
        } );
    $(".edit-header h2").text(rider.Name);
    
=======


  $(".burger").click(function(){

      $(".edit-full-wrapper").fadeIn();

  });

  $(".edit-full-wrapper").click(function(){

      $(this).fadeOut();

  });

  
>>>>>>> 2e6b3cbf08f23c56718d7a55ff418e5f80e5fe9e
loadNewOrders();
window.setInterval("loadNewOrders()", 30000);
});
function loadNewOrders() {
   
    $.ajax({
        url: SERVER + "order/rider/"+rider.Id+"/new",
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               console.log(result);
               var html='';
               if(result) {
                  $.each(result, function(index,order){
                    var event = new Date(order.Created);
                      html += '<section><div class="left-panel"><h4>Order #'+order.Id+'</h4></div>';
                      html += '<div class="right-panel"><span>'+0+'</span></div>';
                      html += '<ul><li><img src="img/clock.png">'+ event.toLocaleTimeString('en-US')+'</li><li><img src="img/spoon-fork.png"> Dera Tasty, Chowk Churatha. DGKhan</li>';
                      html +='<li><img src="img/marker.png"> Khayaban-e-sarwar, DGKhan</li></ul>';
                      html += '<div class="right-panel"><a href="06. new-order.html?id='+order.Id+'"><img class="view" src="img/eye.png"></a></div></section>';
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
<<<<<<< HEAD
$(".burger").on("click",function(){
    $(".edit-full-wrapper").fadeIn(300)
})
$(".edit-full-wrapper").on("click",function(){
    $(".edit-full-wrapper").css("display","none");
})

function logout(){
    localStorage.clear();
    window.open("01. welcome.html","_self");
}
=======


$(document).ready(function(){

  $(".burger").click(function(){

      $(".edit-full-wrapper").fadeIn();

  });

  $(".edit-full-wrapper").click(function(){

      $(this).fadeOut();

  });

});
>>>>>>> 2e6b3cbf08f23c56718d7a55ff418e5f80e5fe9e
