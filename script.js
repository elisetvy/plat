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

const numberOfTickets = document.getElementById("numberOfTickets");
const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");
const itemTotal = document.getElementById("item-total");
const cartTotal = document.getElementById("cart-total");

decreaseButton.addEventListener("click", () => {
  let currentNum = parseInt(numberOfTickets.textContent);
  if (currentNum > 0) {
    currentNum--;
    numberOfTickets.textContent = currentNum;
    itemTotal.textContent = "$" + currentNum * 10 + ".00";
    cartTotal.textContent = itemTotal.textContent;
  }
});

increaseButton.addEventListener("click", () => {
  let currentNum = parseInt(numberOfTickets.textContent);
  if (currentNum < 100) {
    currentNum++;
    numberOfTickets.textContent = currentNum;
    itemTotal.textContent = "$" + currentNum * 10 + ".00";
    cartTotal.textContent = itemTotal.textContent;
  }
});
