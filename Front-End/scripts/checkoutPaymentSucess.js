document.addEventListener("DOMContentLoaded", () => {
  const formData = JSON.parse(localStorage.getItem("formData"));
  const productosComprados = JSON.parse(localStorage.getItem("carrito")) || [];

  if (formData) {
    const dateElement = document.getElementById("date");
    const customerElement = document.getElementById("customer");
    const paymentMethodElement = document.getElementById("paymentMethod");
    const currentDate = new Date();

    let orderNumber = parseInt(localStorage.getItem("orderNumber")) || 0;
    orderNumber++;
    localStorage.setItem("orderNumber", orderNumber);
    const orderNumberElement = document.getElementById("orderNumber");
    if (orderNumberElement) {
      orderNumberElement.textContent = orderNumber;
    }

    // Calcular y mostrar el total de la compra
    const totalContainer = document.querySelector(".order-item.total-border");
    if (totalContainer) {
      const total = productosComprados.reduce((sum, product) => {
        return sum + product.precioUnitario * product.cantidad;
      }, 0);
      totalContainer.textContent = `$${total.toFixed(2)}`;
    }

    const formattedDate = `${String(currentDate.getDate()).padStart(
      2,
      "0"
    )}/${String(currentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}/${currentDate.getFullYear()}`;
    dateElement.textContent = formattedDate;
    customerElement.textContent = formData.nombre;
    paymentMethodElement.innerHTML =
      '<img src="../assets/images/visa.png" alt="Visa logo" />';
    localStorage.removeItem("formData");
  }

  const orderLineContainer = document.querySelector(".order-line");
  if (!orderLineContainer) {
    console.error(
      "No se encontró el contenedor para la línea de pedido en el DOM."
    );
    return;
  }

  orderLineContainer.innerHTML = productosComprados
    .map(
      (product) => `
        <div class="product-item">
          <img src="${product.Imagenes}" alt="Product image" />
          <div class="product-details">
            <div class="product-text">
              <p>${product.nombre}</p>
              <p>Code: ${product.codigo}</p>
              <p>Size - ${product.size}</p>
              <p>x${product.cantidad}</p>
            </div>
            <p class="product-price">$${(
              product.precioUnitario * product.cantidad
            ).toFixed(2)}</p>
          </div>
        </div>
      `
    )
    .join("");

  localStorage.removeItem("formData");
  localStorage.removeItem("productosComprados");
});

document.addEventListener("DOMContentLoaded", () => {
  const continueShoppingButton = document.querySelector(".continue-shopping");

  continueShoppingButton.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    window.location.href = "./producListing.html";
  });
});
