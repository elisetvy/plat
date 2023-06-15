// console.log(new Date().getMonth() + 1 + "/" + new Date().getDate());

// const imdbApiKey = "k_j6or1n6q";
// const movieIds = ["tt10168670", "tt14444726", "tt13833688"];
// const movieRatings = [];
// const imdb = document.getElementsByClassName("imdb");

// fetch(`https://imdb-api.com/en/API/UserRatings/${imdbApiKey}/${movieIds[0]}`)
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("Error: Failed to retrieve movie rating.");
//     }
//   })
//   .then((data) => {
//     let rating = data.totalRating;
//     imdb[0].textContent = rating;
//     console.log(imdb[0].textContent);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// fetch(`https://imdb-api.com/en/API/UserRatings/${imdbApiKey}/${movieIds[1]}`)
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("Error: Failed to retrieve movie rating.");
//     }
//   })
//   .then((data) => {
//     let rating = data.totalRating;
//     imdb[1].textContent = rating;
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// fetch(`https://imdb-api.com/en/API/UserRatings/${imdbApiKey}/${movieIds[2]}`)
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("Error: Failed to retrieve movie rating.");
//     }
//   })
//   .then((data) => {
//     let rating = data.totalRating;
//     imdb[2].textContent = rating;
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Collapse movie description

const movieTitles = document.querySelectorAll(".movie-title");

movieTitles.forEach(function (movieTitle) {
  movieTitle.addEventListener("click", function () {
    let collapsible = this.closest(".movie").querySelector(".collapsible");
    if (collapsible.style.maxHeight) {
      collapsible.style.maxHeight = null;
    } else {
      collapsible.style.maxHeight = collapsible.scrollHeight + "px";
    }
  });
});

const cartTable = document.querySelector(".cart-table");

const cartTotalContainer = document.getElementById("cart-total-container");

const cartTotal = document.getElementById("cart-total");

const emptyCart = document.getElementById("empty-cart-message");

const addToCartButtons = document.getElementsByClassName("add-to-cart");

const purchase = document.getElementById("purchase");

// Add event listener to each add-to-cart button

for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
}

cartTable.addEventListener("click", updateCart);

// Increase or decrease item quantities - return updated subtotals and cart total

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

// Create array of subtotals - return cart total

function calculateCartTotal() {
  let itemTotalCells = document.querySelectorAll("#item-total");

  let dataArray = [];

  itemTotalCells.forEach(function (cell) {
    const data = parseInt(cell.textContent.slice(1));
    dataArray.push(data);
  });

  if (dataArray.length !== 0) {
    dataArray = dataArray.reduce((x, y) => x + y);
    cartTable.classList.remove("hide");
    cartTotalContainer.classList.remove("hide");
    emptyCart.style.display = "none";
    purchase.classList.remove("hide");
    cartTotal.textContent = "$" + dataArray + ".00";
  } else {
    cartTable.classList.add("hide");
    emptyCart.style.display = "block";
    purchase.classList.add("hide");
    cartTotalContainer.classList.add("hide");
  }
}

function incrementNumber(element) {
  let number = parseInt(element.textContent);
  if (number < 99) {
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

// Click add-to-cart button - collect movie title and showing day/date/time info

function addToCartClicked(event) {
  let button = event.target;
  let title = button.parentElement.querySelector(".movie-name").textContent;
  let day = button.parentElement.querySelector(".movie-day").textContent;
  let date = button.parentElement.querySelector(".movie-date").textContent;
  let time = button.parentElement.querySelector(".movie-time").textContent;
  addToCart(title, day, date, time);
  updateCart();
}

// Create new row in cart table

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
      alert("This item is already in your cart! ;)");
      return;
    }
  }

  let userInput = prompt(
    "How many tickets would you like to add to your cart?"
  );
  let numberOfTickets = parseInt(userInput);
  let itemSubtotal = "$" + (numberOfTickets * 10).toString() + ".00";

  if (numberOfTickets > 0 && numberOfTickets < 100) {
    if (numberOfTickets === 1) {
      alert(
        `1 ticket for ${title} on ${day} ${date} at ${time} has been added to your cart!`
      );
    } else if (numberOfTickets > 1) {
      alert(
        `${numberOfTickets} tickets for ${title} on ${day} ${date} at ${time} have been added to your cart!`
      );
    }

    let cartRowContent = `
    <tr class="cart-row">
    <td class="cart-info">
      <strong class="item-title">${title}</strong><br />
      <small class="item-day">${day} ${date} <span class="cart-time">${time}</span></small>
    </td>
    <td class="cart-info">
      <button id="decrease">-</button>
      <span id="numberOfTickets">${numberOfTickets}</span>
      <button id="increase">+</button>
    </td>
    <td class="cart-info" id="item-total">${itemSubtotal}</td>
    </tr>`;
    cartRow.innerHTML = cartRowContent;
    cartItem.prepend(cartRow);
    calculateCartTotal();
  } else {
    alert("Please enter a number between 0 and 100.");
  }
}

// Click purchase button - return alert and clear cart

purchase.addEventListener("click", completePurchase);

function completePurchase(event) {
  alert("Thanks for supporting The Art!");
  cartTable.remove();
}
