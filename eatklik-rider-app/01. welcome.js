$(document).ready(function() {});

function login() {
  console.log("working");
  obj = {
    MobileNo: $("#Mobile").val(),
    Password: $("#Password").val()
  };
  $.ajax({
    url: SERVER + "rider/login",
    type: "POST",
    data: JSON.stringify(obj),
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    success: function(result) {
      localStorage.setItem("Rider", JSON.stringify(result));
    },
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
}

const signInBtn = document.getElementById("signInBtn");
const d1 = document.getElementById("Mobile");
const d2 = document.getElementById("Password");

function checkForm(input) {
  const f = d1.value;
  const g = d2.value;
  // const x = Array.from(d1.value);

  d1.onkeydown = function(e) {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode == 8
      )
    ) {
      return false;
    }
  };

  if (f === "" || g === "") {
    signInBtn.disabled = true;
  } else {
    signInBtn.disabled = false;
  }
}
signInBtn.addEventListener("click", checkMobile);

function checkMobile() {
  const mobEl = document.querySelector(".input-panel");
  const spanMobEl = mobEl.lastElementChild;

  if (Array.from(d1.value).length > 11) {
    spanMobEl.innerHTML = "Mobile Number exceeded by 11 characters";
  } else if (Array.from(d1.value).length < 11) {
    spanMobEl.innerHTML = "Invalid Mobile Number";
  } else {
    spanMobEl.innerHTML = "";
  }
}
