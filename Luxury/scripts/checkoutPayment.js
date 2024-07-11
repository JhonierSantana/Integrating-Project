import { attachDeleteEventListeners } from "./productDetails.js";

const renderCartItems = () => {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTotal = document.getElementById("cart-total");

  const productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!cartItemsContainer || !cartSubtotal || !cartTotal) {
    console.error(
      "No se encontraron todos los elementos del carrito en el DOM."
    );
    return;
  }

  cartItemsContainer.innerHTML = productosEnCarrito
    .map(
      (product) => `
          <div class="summary-item">
            <img src="${product.Imagenes}" alt="${product.nombre}" />
            <div class="summary-details">
              <div class="summary-text">
                <h2>${product.nombre}</h2>
                <p>Code: ${product.codigo}</p>
                <p>Size - ${product.size}</p>
                <p>x${product.cantidad}</p>
              </div>
              <p>$${(product.precioUnitario * product.cantidad).toFixed(2)}</p>
            </div>
            <button class="delete-item" data-id="${product.id}" data-size="${
        product.size
      }">
              <img src="../assets/icons/deleteIcon.svg" alt="" />
            </button>
          </div>`
    )
    .join("");

  const total = productosEnCarrito.reduce((sum, product) => {
    return sum + product.precioUnitario * product.cantidad;
  }, 0);

  cartSubtotal.textContent = `$${total.toFixed(2)}`;
  cartTotal.textContent = `$${total.toFixed(2)}`;
  attachDeleteEventListeners(productosEnCarrito);
};

document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
});

export { renderCartItems };
