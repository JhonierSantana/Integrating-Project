//Filtrar accesorios
import { productsDetails } from "../modules/arrayProductDetails.js";
document.addEventListener("DOMContentLoaded", () => {
  const categorylinks = document.querySelectorAll(".categoria-link");
  const productosContainer = document.getElementById("products-container");
  const searchInput = document.querySelector(".search-input");
  const priceSort = document.querySelector(".price");

  const mostrarProducts = (productos, categoria) => {
    productosContainer.innerHTML = "";
    productos.forEach((producto) => {
      const isTimelessEleganceRing =
        producto.nombre === "Timeless Elegance Ring";
      const shouldAddLargeClass = isTimelessEleganceRing && categoria === "All";
      const productCard = `
        <article class="card ${shouldAddLargeClass ? "large" : ""}">
          <figure>
            <a href="./productDetails.html?product=${producto.id}">
              <img src="${producto.Imagenes}" alt="${producto.nombre}" />
            </a>
          </figure>
          <div>
            <h2>${producto.nombre}</h2>
            <p>$${producto.precioUnitario}</p>
          </div>
        </article>
      `;
      productosContainer.innerHTML += productCard;
    });
  };

  const filtradoDeProductos = (categoria) => {
    if (categoria === "All") {
      mostrarProducts(productsDetails, categoria);
    } else {
      const filtracionProductos = productsDetails.filter(
        (producto) => producto.tipoDeAccesorio === categoria
      );
      mostrarProducts(filtracionProductos, categoria);
    }
  };

  categorylinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const categoria = event.target.getAttribute("data-category");
      filtradoDeProductos(categoria);
    });
  });

  mostrarProducts(productsDetails, "All");

  // filtrar por nombre
  searchInput.addEventListener("input", function () {
    if (searchInput) {
      const terminoDeBusqueda = searchInput.value.trim().toLowerCase();
      const busquedaAccesorios = productsDetails.filter((accesorio) =>
        accesorio.nombre.toLowerCase().includes(terminoDeBusqueda)
      );
      mostrarProducts(busquedaAccesorios, "All");
    }
  });

  //filtrar por precio
  priceSort.addEventListener("change", function () {
    const selectOption = priceSort.value;

    let sortedProducts = [...productsDetails];

    switch (selectOption) {
      case "all":
        break;
      case "ascending":
        sortedProducts.sort((a, b) => a.precioUnitario - b.precioUnitario);
        break;
      case "descending":
        sortedProducts.sort((a, b) => b.precioUnitario - a.precioUnitario);
        break;
      default:
        return;
    }

    mostrarProducts(sortedProducts, "All");
  });
});

// despliegue del carrito
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
