const productDetailsContainer = document.querySelector(".main-container");

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
        <img class="thumbnail-active" src="${product.Imagenes}" alt="${product.nombre}" />
        <!-- Aquí van las demás imágenes del producto -->
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
          <!-- Aquí van los botones de opciones de color -->
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
          <button class="add-to-bag">
            Add to bag
          </button>
          <button class="buy-now" onclick="window.location.href = './checkoutPaymentMethod.html'">
            Buy now
          </button>
        </div>
      </div>
    </div>
  `;

  //   const addToBagButton = productDetailsContainer.querySelector(".add-to-bag");
  //   const sizeButtons = productDetailsContainer.querySelectorAll(".size-button");
  //   const quantityInput =
  //     productDetailsContainer.querySelector(".quantity-input");

  //   // Manejar el clic en "Add to bag"
  //   addToBagButton.addEventListener("click", () => {
  //     const selectedSize = productDetailsContainer.querySelector(
  //       ".sizes .size-button.selected"
  //     );

  //     // Verificar si se ha seleccionado un tamaño
  //     if (!selectedSize) {
  //       alert("Please select a size.");
  //       return;
  //     }

  //     const size = selectedSize.getAttribute("data-size");
  //     const cantidad = parseInt(quantityInput.value);

  //     // Agregar al carrito
  //     agregarAlCarrito(product, size, cantidad);
  //   });

  //   // Agregar eventos a los botones de tamaño
  //   sizeButtons.forEach((button) => {
  //     button.addEventListener("click", () => {
  //       sizeButtons.forEach((btn) => btn.classList.remove("selected"));
  //       button.classList.add("selected");
  //     });
  //   });

  //   // Agregar eventos a los botones de cantidad
  //   const quantityButtons =
  //     productDetailsContainer.querySelectorAll(".quantity-button");
  //   quantityButtons.forEach((button) => {
  //     button.addEventListener("click", () => {
  //       const action = button.getAttribute("data-action");
  //       let cantidad = parseInt(quantityInput.value);

  //       if (action === "decrease" && cantidad > 1) {
  //         cantidad--;
  //       } else if (action === "increase" && cantidad < 10) {
  //         cantidad++;
  //       }

  //       quantityInput.value = cantidad;
  //     });
  //   });
  // };

  // const agregarAlCarrito = (product, size, cantidad) => {

  //   let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  //   const productToAdd = {
  //     ...product,
  //     size: size,
  //     cantidad: cantidad,
  //   };
  //   productosEnCarrito.push(productToAdd);

  //   localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));

  //   displayCarrito(productosEnCarrito);
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
});
