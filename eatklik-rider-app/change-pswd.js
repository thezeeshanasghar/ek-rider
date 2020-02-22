const currentPswdEl = document.getElementById("current-pswd");
const newPswdEl = document.getElementById("new-pswd");
const rePswdEl = document.getElementById("re-pswd");
const updateEl = document.querySelector(".submit");

// loadRankings("GET", "http://15.206.164.188:5002/api/rider/1");

function loadRankings(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = "json";

    xhr.onload = function() {
      resolve(xhr.response);
    };

    xhr.send(data);
  });
  return promise;
}

async function fetchPosts() {
  console.log(newPswdEl.value);
  const responseData = await loadRankings(
    "GET",
    "http://15.206.164.188:5002/api/rider/1",
    ""
  );

  const pData = responseData;

  validatePswd(pData.Password);
}

async function validatePswd(idata) {
  if (currentPswdEl.value == idata) {
    console.log("Password matched!");
    const postData = await sendHttpRequest(newPswdEl.value);

    try {
      this.Password = postData;
    } catch (error) {
      alert(error.message);
    }
    return true;
  } else {
    return false;
  }
}

function sendHttpRequest(data) {
  const promise = new Promise((resolve, reject) => {
    // console.log(data);
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://15.206.164.188:5002/api/rider/1", "async");

    xhr.responseType = "json";

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);

        // this.
      } else {
        reject(new Error("Something went wrong!"));
        console.log("server not found");
      }
    };

    xhr.onerror = function() {
      reject(new Error("Failed to send request!"));
    };

    xhr.send(JSON.stringify(data));
  });
}

updateEl.addEventListener("click", fetchPosts);
