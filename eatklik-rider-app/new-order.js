const tableContent = document.querySelector("#customers >tbody");
loadRankings();

function loadRankings() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "http://15.206.164.188:5002/api/order/15", "async");

  xhr.responseType = "json";

  xhr.onload = function() {
    try {
      const listOfPosts = xhr.response;

      const orderList = this.response.OrderItems;
      populateData(orderList);
      totalAmount(orderList);
    } catch (error) {
      alert(error);
    }
  };
  xhr.send();
}

function populateData(orderList) {
  console.log(orderList);
  // clears out existing table data
  while (tableContent.firstChild) {
    tableContent.removeChild(tableContent.firstChild);
  }

  orderList.forEach(row => {
    console.log(row);
    const tr = document.createElement("tr");
    const ordValues = Object.values(row);
    console.log(ordValues);
    const cell = ordValues.slice(1, 5);
    const x = cell[0] + "(".concat(cell[1]) + ")";
    cell.splice(0, 2, x);
    swap(cell, 1, 2);
    console.log(cell);

    cell.forEach(cdata => {
      const td = document.createElement("td");
      td.textContent = cdata;
      tr.appendChild(td);
    });

    tableContent.appendChild(tr);
  });
}

function swap(input, index_A, index_B) {
  let temp = input[index_A];

  input[index_A] = input[index_B];
  input[index_B] = temp;
  return input;
}

function totalAmount(cash) {
  const transformedArr = cash.map(obj => obj.Price);
  const amountArr = transformedArr.reduce((sumVal, curVal) => {
    return sumVal + curVal;
  }, 0);
  const sumEl = document.getElementById("sum-panel");
  sumEl.firstChild.textContent = "Rs." + amountArr;
  console.log(sumEl.firstChild);
  console.log(amountArr);
}
