var userData=JSON.parse(localStorage.getItem("Rider"));

$("#form-reset").validate({
    rules: {
        currentPassword: {
            required: function (element) {
                return $("#currentPassword").is(':blank');
            }
        },
        newPassword: {
            required: function (element) {
                return $("#newPassword").is(':blank');
            }
        },
        retypePassword: {
            required: function (element) {
                return $("#retypePassword").is(':blank');
            }
        }
    },

    messages: {
        currentPassword: {
            required: 'Current Password is Required'
        },
        newPassword: {
            required: 'New Password is Required'
        },
        retypePassword: {
            required: 'Password is not matched'
        }
    },
    errorElement: 'span',
    errorClass: "validate-has-error",
    validClass: '',
    highlight: function (element, errorClass, validClass) {
        console.log(element,errorClass);
        $(element).parents("div.form-group").addClass(errorClass).removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
        console.log(element,errorClass);
        $(element).parents("div.form-group").removeClass(errorClass).addClass(validClass);
    },
     //Form Processing via AJAX
    submitHandler: function (form) {
        if(!userData)
            {
                return false;
            }
         console.log($("#currentPassword").val());
        // console.log(userData.Password );
          if($("#currentPassword").val() !=userData.Password )
          {
              alert("Not Correct Password");
              $("#currentPassword").val("");
              return false;
          }
          var obj={
            Id:userData.Id,
            Name:userData.Name,
            MobileNo:userData.MobileNo,
            CNIC:userData.CNIC,
            Address:userData.Address,
            Password:$("#newPassword").val(),
            ProfileImage:userData.ProfileImage,
            Status:userData.Status,
            Rating:userData.Rating,
            CityId:userData.CityId,
            City:userData.City,
            RiderRatings:userData.RiderRatings
          }
          $.ajax({
            url: SERVER +"Rider/"+ userData.Id,
            type: "PUT",
            data: JSON.stringify(obj),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            beforeSend:function(){
                $('#loading').removeClass("d-none");
            },
            success: function (result) {
              
                localStorage.clear();
                window.open("01. welcome.html");
            },
            error:function(xhr, status, error)
            {
                console.log(xhr.responseText);
            }
           
        });
    }
});