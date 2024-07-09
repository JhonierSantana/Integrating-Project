const cartButtonOpen = document.getElementById("cart-button-open");
const cartButtonClose = document.getElementById("cart-button-close");
const cartButtonContinue = document.getElementById("cart-button-continue");
const cart = document.getElementById("cart");
const overlay = document.querySelector(".cart-overlay");

cartButtonOpen.addEventListener("click", function () {
  cart.classList.add("show");
  overlay.style.display = "block";
});

cartButtonClose.addEventListener("click", function () {
  cart.classList.remove("show");
  overlay.style.display = "none";
});

cartButtonContinue.addEventListener("click", function () {
  cart.classList.remove("show");
  overlay.style.display = "none";
});
