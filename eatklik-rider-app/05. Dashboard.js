fetchPosts();
function loadRankings(method, url) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = "json";

    xhr.onload = function() {
      resolve(xhr.response);
    };

    xhr.send();
  });
  return promise;
}

async function fetchPosts() {
  const responseData = await loadRankings(
    "GET",
    "http://15.206.164.188:5002/api/rider/1",
    ""
  );
  console.log(responseData);
  localStorage.setItem("Mobile No", responseData.MobileNo);
}

const logOutBtn = document.getElementById("logOut");
console.log(logOutBtn);

logOutBtn.addEventListener("click", () => {
  return localStorage.clear();
});

var rider = getObjsFromLocalStorage("Rider");
$(document).ready(function() {
  $(".burger").click(function() {
    $(".edit-full-wrapper").fadeIn();
  });

  $(".edit-full-wrapper").click(function() {
    $(this).fadeOut();
  });

  loadNewOrders();
  window.setInterval("loadNewOrders()", 30000);
});
function loadNewOrders() {
  $.ajax({
    url: SERVER + "order/rider/" + rider.Id + "/new",
    type: "GET",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    success: function(result) {
      console.log(result);
      var html = "";
      if (result) {
        $.each(result, function(index, order) {
          var event = new Date(order.Created);
          html +=
            '<section><div class="left-panel"><h4>Order #' +
            order.Id +
            "</h4></div>";
          html += '<div class="right-panel"><span>1 minute ago</span></div>';
          html +=
            '<ul><li><img src="img/clock.png">' +
            event.toLocaleTimeString("en-US") +
            '</li><li><img src="img/spoon-fork.png"> Dera Tasty, Chowk Churatha. DGKhan</li>';
          html +=
            '<li><img src="img/marker.png"> Khayaban-e-sarwar, DGKhan</li></ul>';
          html +=
            '<div class="right-panel"><a href="06. new-order.html?id=' +
            order.Id +
            '"><img class="view" src="img/eye.png"></a></div></section>';
        });
        if (result.length > 0) $(".all-orders").html(html);
      }
    },
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
}

$(document).ready(function() {
  $(".burger").click(function() {
    $(".edit-full-wrapper").fadeIn();
  });

  $(".edit-full-wrapper").click(function() {
    $(this).fadeOut();
  });
});

let KeyValueStorage = localStorage.getItem("Mobile No");

console.log(KeyValueStorage);
