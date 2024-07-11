import { attachDeleteEventListeners } from "./productDetails.js";

export const displayCarrito = (productosEnCarrito) => {
  const carrito = document.querySelector(".cart");
  if (!carrito) {
    console.error("El contenedor del carrito no se encuentra en el DOM.");
    return;
  }

  carrito.innerHTML = `
      <div class="cart-title">
        <h2>Your cart</h2>
        <button id="cart-button-close" class="button-close">
            <img src="/Luxury/assets/icons/iconoX.svg" alt="" />
        </button>
      </div>
      <div class="cart-items">
        ${productosEnCarrito
          .map(
            (product) => `
            <div class="cart-item">
              <img src="${product.Imagenes}" alt="${product.nombre}" />
              <div class="cart-item-info">
                <h4>${product.nombre}</h4>      
                <p>Size - ${product.size}</p>
                <p>Code: ${product.codigo}</p>
                <p>$${(product.precioUnitario * product.cantidad).toFixed(
                  2
                )}</p>
              </div>
              <div class="cart-sub-info">
                <button class="edit-item">✎</button>
                <p>x${product.cantidad}</p>
                <button class="delete-item">🗑️</button>
              </div>
            </div>`
          )
          .join("")}
      </div>
      <div class="total-y-button">
        <div class="total">
          <p>Total:</p>
          <p>$${calcularTotal(productosEnCarrito)}</p>
        </div>
        <button id="cart-button-continue">Continue to check out</button>
      </div>
    `;

  attachDeleteEventListeners(productosEnCarrito);
};

const calcularTotal = (productosEnCarrito) => {
  return productosEnCarrito
    .reduce((total, product) => {
      return total + product.precioUnitario * product.cantidad;
    }, 0)
    .toFixed(2);
};

document.addEventListener("DOMContentLoaded", () => {
  const productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  displayCarrito(productosEnCarrito);
});
