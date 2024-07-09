//  EN PRODUCCION

// const carrito = document.getElementById("cart");

// export const displayCarrito = (productosEnCarrito) => {
//   carrito.innerHTML = `
//     <div class="cart-title">
//       <h2>Your cart</h2>
//       <button id="cart-button-close" class="button-close">
//         <img src="../assets/icons/iconoX.svg" alt="" />
//       </button>
//     </div>
//     <div class="cart-items">
//       ${productosEnCarrito
//         .map(
//           (product) => `
//         <div class="cart-item">
//           <img src="${product.Imagenes}" alt="${product.nombre}" />
//           <div class="cart-item-info">
//             <h4>${product.nombre}</h4>
//             <p>Code: ${product.codigo}</p>
//             <p>$${product.precioUnitario}</p>
//           </div>
//           <div class="cart-sub-info">
//             <button class="edit-item">✎</button>
//             <span class="item-quantity">x${countProduct(
//               productosEnCarrito,
//               product
//             )}</span>
//           </div>
//         </div>
//       `
//         )
//         .join("")}
//     </div>
//     <div class="total-y-button">
//       <div class="total">
//         <p>Total:</p>
//         <p>${calcularTotal(productosEnCarrito)}</p>
//       </div>
//       <button id="cart-button-continue">Continue to check out</button>
//     </div>
//   `;
// };

// const calcularTotal = (productosEnCarrito) => {
//   let total = 0;
//   productosEnCarrito.forEach((product) => {
//     total += parseFloat(product.precioUnitario);
//   });
//   return total.toFixed(2);
// };

// const countProduct = (productosEnCarrito, product) => {
//   return productosEnCarrito.filter((p) => p.id === product.id).length;
// };

// const agregarAlCarrito = async (productId) => {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/productos/${productId}`
//     );
//     if (!response.ok) {
//       throw new Error("HTTP error " + response.status);
//     }
//     const product = await response.json();
//     let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

//     const existingProduct = productosEnCarrito.find((p) => p.id === product.id);
//     if (existingProduct) {
//       existingProduct.quantity += 1;
//     } else {
//       product.quantity = 1;
//       productosEnCarrito.push(product);
//     }

//     localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
//     displayCarrito(productosEnCarrito);
//   } catch (error) {
//     console.error("Error al agregar producto al carrito:", error);
//   }
// };

// const fetchProductDetailsContainer = async (productId) => {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/productos/${productId}`
//     );
//     if (!response.ok) {
//       throw new Error("HTTP error " + response.status);
//     }
//     const product = await response.json();
//     if (product) {
//       displayProductDetails(product);
//       const addToBagButton = document.querySelector(".add-to-bag");
//       addToBagButton.addEventListener("click", () => {
//         agregarAlCarrito(productId);
//       });
//     } else {
//       console.error("Producto no encontrado");
//     }
//   } catch (error) {
//     console.error("Error al obtener productos:", error);
//   }
// };

// document.addEventListener("DOMContentLoaded", () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const productId = urlParams.get("product");
//   if (productId) {
//     fetchProductDetailsContainer(productId);
//   }
// });
