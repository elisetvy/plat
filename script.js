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

const cartTable = document.querySelector(".cart-table");

const cartTotalContainer = document.getElementById("cart-total-container");

const cartTotal = document.getElementById("cart-total");

const emptyCart = document.getElementById("empty-cart-message");

const addToCartButtons = document.getElementsByClassName("add-to-cart");

const purchase = document.getElementById("purchase");

for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
}

cartTable.addEventListener("click", updateCart);

function updateCart(event) {
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
    if (num.textContent === "0") {
      num.parentElement.parentElement.remove();
    }
    let itemTotal = target.parentNode.nextElementSibling;
    let itemPrice = +num.textContent * 10;
    itemTotal.textContent = "$" + itemPrice + ".00";
  }
  calculateCartTotal();
}

function calculateCartTotal() {
  let itemTotalCells = document.querySelectorAll("#item-total");

  let dataArray = [];

  itemTotalCells.forEach(function (cell) {
    const data = parseInt(cell.textContent.slice(1));
    dataArray.push(data);
  });

  if (dataArray.length !== 0) {
    dataArray = dataArray.reduce((x, y) => x + y);
    cartTotalContainer.classList.remove("hide");
    emptyCart.style.display = "none";
    purchase.style.display = "block";
    cartTotal.textContent = "$" + dataArray + ".00";
  } else {
    emptyCart.style.display = "block";
    purchase.style.display = "none";
    cartTotalContainer.classList.add("hide");
  }
}

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

function addToCartClicked(event) {
  let button = event.target;
  let title = button.parentElement.querySelector(".movie-name").textContent;
  let day = button.parentElement.querySelector(".movie-day").textContent;
  let date = button.parentElement.querySelector(".movie-date").textContent;
  let time = button.parentElement.querySelector(".movie-time").textContent;
  addToCart(title, day, date, time);
  updateCart();
}

function addToCart(title, day, date, time) {
  let cartRow = document.createElement("tr");
  cartRow.classList.add("cart-row");
  let cartItem = document.getElementsByClassName("cart-table")[0];
  let cartItemNames = document.getElementsByClassName("item-title");
  let cartItemDays = document.getElementsByClassName("item-day");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (
      cartItemNames[i].textContent === title &&
      cartItemDays[i].textContent.split(" ")[0] === day
    ) {
      alert(
        "This item is already in your cart!  You can update ticket quantities in your cart ;)"
      );
      return;
    }
  }

  let cartRowContent = `
  <tr class="cart-row">
  <td class="cart-info">
    <strong class="item-title">${title}</strong><br />
    <small class="item-day">${day} ${date} <span class="cart-time">${time}</span></small>
  </td>
  <td class="cart-info">
    <button id="decrease">-</button>
    <span id="numberOfTickets">1</span>
    <button id="increase">+</button>
  </td>
  <td class="cart-info" id="item-total">$10.00</td>
  </tr>`;
  cartRow.innerHTML = cartRowContent;
  cartItem.prepend(cartRow);
  calculateCartTotal();
  alert(
    `1 ticket for ${title} on ${day} ${date} at ${time} has been added to your cart!`
  );
}

purchase.addEventListener("click", completePurchase);

function completePurchase(event) {
  alert("Thanks for supporting The Art!");
  let cartItems = document.getElementsByClassName("cart-row")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
}
