var rider = getObjsFromLocalStorage("Rider");
//$("#output").attr("src",rider[0].ProfileImage)
console.log(rider);
var img = new Image();
img.onload = function(){
    document.getElementById("output").src=RESOURCEURL+rider.ProfileImage

}; 
img.onerror = function()
{

};
img.src =RESOURCEURL+ rider.ProfileImage;

$(document).ready(function () {  
});
var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
}
const myForm = document.getElementById('myForm');
const inpFile = document.getElementById('file-input');
myForm.addEventListener("submit" , e=> {
    e.preventDefault();
    const endpoint = SERVER + "upload";
    const formData = new FormData();
    formData.append("inpFile" , inpFile.files[0]);
    fetch(endpoint , {
        method: "POST",
        body : formData  
    }).then(response => response.json())
    .then(data => {
        rider.ProfileImage = data.dbPath;
      console.log(rider) // Prints result from `response.json()` in getRequest
    }).catch(console.error);
   
});

function UpdateRiderPhoto() {
     
    $.ajax({
        url: SERVER + "Rider/" + rider.Id,
        type: "PUT",
        dataType: "JSON",
        data: JSON.stringify(rider),
        contentType: "application/json;charset=utf-8",
        success: function (result) {
        setTimeout(function()
        {
 localStorage.setItem("Rider" , JSON.stringify(rider));
        },0)
           
            window.location.href="11. edit-profile.html"; 
            
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}