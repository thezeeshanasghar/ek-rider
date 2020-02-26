var CurrentOrder=localStorage.getItem("CurrentOrder");
var cust_latitude=0,cust_longitude=0;
var coordinatesId=0;
GetCustomerLocation();
      var map, infoWindow;
     var Id=1; //Order ID
     console.log("location");
        
     
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
           
            
        
            //Customer Location
            var cust_pos = {
              lat: cust_latitude,//33.700605 ,//position.coords.latitude,
              lng:cust_longitude//72.943093// position.coords.longitude
            };
             
            var  yourlocation = new google.maps.Marker({
            position: pos,
            map:      map,
            title:    "Rider",
            info:     "Rider"
          });
            var  marker_cust = new google.maps.Marker({
            position: cust_pos,
            map:      map,
            title:    "Customer Location",
            info:     "Customer Location"
          });
          infoWindow.open(marker_cust,yourlocation);

          UpdateCoordinates(pos.lat+","+pos.lng,cust_pos.lat+","+cust_pos.lng,CurrentOrder)

}


      
     
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    
            infoWindow.open(map);
     
      }
    }
   
     
    getOrder();
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
            $("#Delivery_Address").html(response.Address);
          },
          error:function(response)
          {
              console.log(response);
          }
      
      })  
      }
      $(".order-pick-deliver-btn").on("click",function(){
        
          window.open("10. order-deliverd.html","_self");
      })
   
function GetCustomerLocation()
{
  $.ajax({
    Type:"GET",
    dataType:"json",
    url:SERVER+"coordinates/"+CurrentOrder,
    success:function(response)
    {
      console.log(response);
      coordinatesId=response.Id;
      cust_latitude= parseFloat(response.customerCoordinates.split(",")[0]);
      cust_longitude=parseFloat(response.customerCoordinates.split(",")[1]);
    },
    error:function(response)
    {
      console.log(response);
    }
  })
}
function UpdateCoordinates(driver_Coordinates,customer_Coordinates,order_Id)
{

    var obj={
        Id:coordinatesId,
        driverCoordinates:driver_Coordinates,
        customerCoordinates:customer_Coordinates,
        orderId:order_Id
    }
    console.log(obj);
$.ajax({
    type:"PUT",
    url:SERVER+"Coordinates/"+coordinatesId,
    data:JSON.stringify(obj),
    dataType:"json",
    contentType: "application/json;charset=utf-8",
    success:function(response)
    {
        console.log("")
    },error:function(response)
    {
        console.log("error",response);
    }
})
}