const collapsible = document.getElementsByClassName("collapsible");

for (let i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

// const numberOfTickets = document.getElementById("numberOfTickets");
// const decreaseButton = document.getElementById("decrease");
// const increaseButton = document.getElementById("increase");
// const itemTotal = document.getElementById("item-total");
// const cartTotal = document.getElementById("cart-total");

// decreaseButton.addEventListener("click", () => {
//   let currentNum = parseInt(numberOfTickets.textContent);
//   if (currentNum > 0) {
//     currentNum--;
//     numberOfTickets.textContent = currentNum;
//     itemTotal.textContent = "$" + currentNum * 10 + ".00";
//     cartTotal.textContent = itemTotal.textContent;
//   }
// });

// increaseButton.addEventListener("click", () => {
//   let currentNum = parseInt(numberOfTickets.textContent);
//   if (currentNum < 100) {
//     currentNum++;
//     numberOfTickets.textContent = currentNum;
//     itemTotal.textContent = "$" + currentNum * 10 + ".00";
//     cartTotal.textContent = itemTotal.textContent;
//   }
// });

const cartTable = document.querySelector(".cart-table");

const cartTotal = document.getElementById("cart-total");

const itemTotalCells = document.querySelectorAll("#item-total");

cartTable.addEventListener("click", function (event) {
  const target = event.target;
  if (target.id === "increase") {
    const num = target.parentNode.querySelector("#numberOfTickets");
    incrementNumber(num);
    let itemTotal = target.parentNode.nextElementSibling;
    let itemPrice = +num.textContent * 10;
    itemTotal.textContent = "$" + itemPrice + ".00";
  }
  if (target.id === "decrease") {
    const num = target.parentNode.querySelector("#numberOfTickets");
    decrementNumber(num);
    let itemTotal = target.parentNode.nextElementSibling;
    let itemPrice = +num.textContent * 10;
    itemTotal.textContent = "$" + itemPrice + ".00";
  }

  let dataArray = [];

  itemTotalCells.forEach(function (cell) {
    const data = parseInt(cell.textContent.slice(1));
    dataArray.push(data);
  });

  dataArray = dataArray.reduce((x, y) => x + y);

  cartTotal.textContent = "$" + dataArray + ".00";
});

function incrementNumber(element) {
  let number = parseInt(element.textContent);
  if (number < 100) {
    number++;
    element.textContent = number;
  }
}

function decrementNumber(element) {
  let number = parseInt(element.textContent);
  if (number > 0) {
    number--;
    element.textContent = number;
  }
}
