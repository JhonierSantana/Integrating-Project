import { displayCarrito } from "./carrito.js";
import { renderCartItems } from "./checkoutPayment.js";

const productDetailsContainer = document.querySelector(".main-container");

const agregarAlCarrito = (product, size, cantidad) => {
  let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const existingProductIndex = productosEnCarrito.findIndex(
    (p) => p.id === product.id && p.size === size
  );

  if (existingProductIndex >= 0) {
    productosEnCarrito[existingProductIndex].cantidad += cantidad;
  } else {
    const productoAdd = {
      ...product,
      size: size,
      cantidad: cantidad,
    };
    productosEnCarrito.push(productoAdd);
  }
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
  displayCarrito(productosEnCarrito);
  attachCartEventListeners();
};

const displayProductDetails = (product) => {
  const sizesHTML = Object.keys(product.cantidadEnStock.size)
    .map(
      (size) =>
        `<button class="size-button" data-size="${size}">${size}</button>`
    )
    .join("");

  productDetailsContainer.innerHTML = `
    <div class="product-nav">
      <a href="../index.html">Home</a>
      <i><img src="../assets/icons/flecha-productDetails.svg" alt="" /></i>
      <a href="../pages/producListing.html">Shop</a>
      <i><img src="../assets/icons/flecha-productDetails.svg" alt="" /></i>
      <a href="#">${product.nombre}</a>
    </div>

    <div class="product-container">
      <div class="thumbnail-container">
        <img class="thumbnail-active" src="${product.Imagenes}" alt=${product.nombre}" />
        <img  src="${product.Imagenes}" alt=${product.nombre}"  />
        <img  src="${product.Imagenes}" alt=${product.nombre}" />
        <img  src="${product.Imagenes}" alt=${product.nombre}" />
      </div>
      <div class="product-img">
        <img src="${product.Imagenes}" alt="${product.nombre}" />
      </div>
      <div class="product-details">
        <h1>${product.nombre}</h1>
        <p class="code">Code: ${product.codigo}</p>
        <p class="price">$${product.precioUnitario}</p>
        <div class="color-options">
          <p>Color - ${product.color}</p>
          <button class="color-option silver selected"></button>
          <button class="color-option rose"></button>
        </div>
        <div class="size-options">
          <div class="size-text">
            <p>Size</p>
            <a href="#">What is my size?</a>
          </div>
          <div class="sizes">
            ${sizesHTML}
          </div>
        </div>
        <div class="quantity">
          <p>Quantity</p>
          <button class="quantity-button" data-action="decrease">-</button>
          <input type="number" class="quantity-input" value="1" min="1" max="10" />
          <button class="quantity-button" data-action="increase">+</button>
        </div>
        <div class="buttons-product">
          <button class="add-to-bag">Add to bag</button>
          <button class="buy-now">Buy now</button>
        </div>
        <div class="extra-info">
          <div class="dropdown">
            <button class="dropbtn">
              Delivery
              <i><img src="../assets/icons/flechaAbajo-ProductDetails.svg" alt="" /></i>
            </button>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              Payment
              <i><img src="../assets/icons/flechaAbajo-ProductDetails.svg" alt="" /></i>
            </button>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              Warranty
              <i><img src="../assets/icons/flechaAbajo-ProductDetails.svg" alt="" /></i>
            </button>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              Care
              <i><img src="../assets/icons/flechaAbajo-ProductDetails.svg" alt="" /></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const addToBagButton = productDetailsContainer.querySelector(".add-to-bag");
  const sizeButtons = productDetailsContainer.querySelectorAll(".size-button");
  const quantityInput =
    productDetailsContainer.querySelector(".quantity-input");

  addToBagButton.addEventListener("click", () => {
    const selectedSize = productDetailsContainer.querySelector(
      ".sizes .size-button.active"
    );

    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const size = selectedSize.getAttribute("data-size");
    const cantidad = parseInt(quantityInput.value);

    agregarAlCarrito(product, size, cantidad);
  });

  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sizeButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  const quantityButtons =
    productDetailsContainer.querySelectorAll(".quantity-button");
  quantityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      let cantidad = parseInt(quantityInput.value);

      if (action === "decrease" && cantidad > 1) {
        cantidad--;
      } else if (action === "increase" && cantidad < 10) {
        cantidad++;
      }

      quantityInput.value = cantidad;
    });
  });

  const buyNowButton = productDetailsContainer.querySelector(".buy-now");
  buyNowButton.addEventListener("click", () => {
    const selectedSize = productDetailsContainer.querySelector(
      ".sizes .size-button.active"
    );

    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const size = selectedSize.getAttribute("data-size");
    const cantidad = parseInt(quantityInput.value);

    agregarAlCarrito(product, size, cantidad);

    window.location.href = "./checkoutPaymentMethod.html";
  });
};

const fetchProductDetailsContainer = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/productos/${productId}`
    );
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    const product = await response.json();
    if (product) {
      displayProductDetails(product);
    } else {
      console.error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener producto:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product");
  if (productId) {
    fetchProductDetailsContainer(productId);
  }

  const productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  displayCarrito(productosEnCarrito);
  attachCartEventListeners();
});

const attachCartEventListeners = () => {
  const cartButtonOpen = document.getElementById("cart-button-open");
  const cartButtonClose = document.getElementById("cart-button-close");
  const cartButtonContinue = document.getElementById("cart-button-continue");
  const cart = document.getElementById("cart");
  const overlay = document.querySelector(".cart-overlay");

  if (cartButtonOpen) {
    cartButtonOpen.addEventListener("click", function () {
      cart.classList.add("show");
      overlay.style.display = "block";
    });
  }

  if (cartButtonClose) {
    cartButtonClose.addEventListener("click", function () {
      cart.classList.remove("show");
      overlay.style.display = "none";
      console.log("Carrito cerrado");
    });
  }

  if (cartButtonContinue) {
    cartButtonContinue.addEventListener("click", function () {
      cart.classList.remove("show");
      overlay.style.display = "none";
    });
  }
};

export const attachDeleteEventListeners = (productosEnCarrito) => {
  const deleteButtons = document.querySelectorAll(".delete-item");

  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      console.log("Producto eliminado del carrito");

      productosEnCarrito.splice(index, 1);

      localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));

      displayCarrito(productosEnCarrito);
      renderCartItems();
      attachDeleteEventListeners(productosEnCarrito);
      attachCartEventListeners();
    });
  });
};
