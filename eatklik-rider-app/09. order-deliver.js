var CurrentOrder=localStorage.getItem("CurrentOrder");
var cust_latitude=0,cust_longitude=0;
var rest_latitude=0,rest_longitude=0;
$('#loading').removeClass("d-none");
var coordinatesId=0;

GetCustomerLocation();
      var map, infoWindow;
     var Id=1; //Order ID
     console.log("location");
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
            GetResturent(response.RestaurantId);
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
      cust_latitude= parseFloat(response.CustomerCoordinates.split(",")[0]);
      cust_longitude=parseFloat(response.CustomerCoordinates.split(",")[1]);
    },
    error:function(response)
    {
      console.log(response);
    }
  })
}
function UpdateCoordinates(driver_Coordinates,customer_Coordinates,order_Id)
{

    var coordinates={
        Id:coordinatesId,
        RiderCoordinates:driver_Coordinates,
        CustomerCoordinates:customer_Coordinates,
        OrderId:order_Id
    }
    console.log(coordinates);
$.ajax({
    method:"PUT",
    dataType:"json",
    url:SERVER+"Coordinates/"+coordinatesId,
    data:JSON.stringify(coordinates),
   
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


//MyChanges

var latitude,longitude;
navigator.geolocation.getCurrentPosition(function(position) {
 
latitude=position.coords.latitude;
longitude=position.coords.longitude;

 
 function mapLocation() {
  var directionsDisplay;
  var directionsDisplay_2;
  var directionsService = new google.maps.DirectionsService();
  var directionsService_2 = new google.maps.DirectionsService();
  var map;

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    directionsDisplay_2 = new google.maps.DirectionsRenderer({ suppressMarkers: true });
   
    
    var mapOptions = {
      zoom: 7,
      center: new google.maps.LatLng(30.3753, 69.3451)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay_2.setMap(map);
     calcRoute();
  }

  function calcRoute() {
    var start = new google.maps.LatLng(latitude, longitude);
   
    //var end = new google.maps.LatLng(38.334818, -181.884886);
    var end = new google.maps.LatLng(rest_latitude, rest_longitude);
    var StartingPoint = new google.maps.Marker({icon: "img/starting_point.ico", map: map, position: start});
    var Rest = new google.maps.Marker({icon: "img/rest.ico", map: map, position: end});
    var Customer = new google.maps.Marker({icon: "img/user.ico", map: map, position: new google.maps.LatLng(cust_latitude,cust_longitude)});
    var request = {
      origin: new google.maps.LatLng(rest_latitude, rest_longitude),
      destination: new google.maps.LatLng(cust_latitude,cust_longitude),
      travelMode: google.maps.TravelMode.DRIVING
    };
    marker = new google.maps.Marker();
    setInterval(function(){
      // navigator.geolocation.getCurrentPosition(function(position) {
      //    marker = new google.maps.Marker({
      //     position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
      //     map: map,
      // });
      marker.setPosition( new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
      marker.setMap(map);
      UpdateCoordinates(position.coords.latitude+","+position.coords.longitude,cust_latitude+","+cust_longitude,CurrentOrder)
      
      
    },10000)
   
    var request_1 = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);
      } else {
        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      }
    });
    directionsService_2.route(request_1, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay_2.setDirections(response);
        directionsDisplay_2.setMap(map);
      } else {
        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      }
    });
  }
  initialize();
}
mapLocation();
$('#loading').addClass("d-none");   

});

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