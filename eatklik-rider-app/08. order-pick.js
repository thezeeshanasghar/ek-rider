var CurrentOrder=localStorage.getItem("CurrentOrder");
var rest_longitude,rest_latitude;
getOrder();
$("div .header-heading").html("Order#"+CurrentOrder);


      var map, infoWindow;
     
     console.log("location");
           function initMap() {
      var  map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 15
        });

        infoWindow = new google.maps.InfoWindow;
        // Try HTML5 geolocation.
        setInterval(function(){
        navigator.geolocation.getCurrentPosition(showPosition);
      },10000)
        function showPosition(position) {
          console.log(position.coords.latitude,position.coords.longitude)
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          
            infoWindow.setContent("Rider")
           
            
        
            //Resturent Location
            var rest_pos = {
              lat: rest_latitude,//33.700606 ,//position.coords.latitude,
              lng:rest_longitude//72.943094// position.coords.longitude
            };
             
            var  yourlocation = new google.maps.Marker({
            position: pos,
            map:      map,
            title:    "Rider",
            info:     "Rider"
          });
            var  marker_rest = new google.maps.Marker({
            position: rest_pos,
            map:      map,
            title:    "rest",
            info:     "rest"
          });
          infoWindow.open(marker_rest,yourlocation);
           

}


      
     
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    
            infoWindow.open(map);
     
      }
    }
   



function getOrder(){
  $.ajax({
    Type:"GET",
    dataType:"json",
    url: SERVER + "order/"+ CurrentOrder,
    
    success:function(response)
    {
        
        console.log(response);
        $("#Amount").html(response.GrandTotal);
        $("#Method").html(response.PayMethod==0?"Cash":response.PayMethod==1?"Other":response.PayMethod==2?"Other":response.PayMethod==3?"Other":"");
        GetResturent(response.RestaurantId);
    },
    error:function(response)
    {
        console.log(response);
    }

})  
}
function  GetResturent(RestaurantId)
{
    $.ajax({
       Type:"GET",
       dataType:"json",
       url:SERVER+ "RestaurantLocation/Restaurant/"+RestaurantId,
       success:function(response)
       {
           
          $(".pick-deliver-add p").text(response.Address);
          rest_latitude=response.Latitude;
          rest_longitude=response.Longitude;
          console.log(response);
       },
       error:function(response)
       {
           console.log(response);
       }
    })
}

$(".order-pick-deliver-btn").on("click",function(){

    $.ajax({
      
        dataType:"json",
        method:"PUT",
        url:SERVER+"Order/"+CurrentOrder+"/order-status/"+2,
        success:function(response)
        {
         console.log(response);
         window.open("09. order-deliver.html","_self");
        },
        error:function(response)
        {
            console.log("error",response);
        }
        
    })

});

