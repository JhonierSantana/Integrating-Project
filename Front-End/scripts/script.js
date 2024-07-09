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

  const filtradoDeProductos = (productos, categoria) => {
    if (categoria === "All") {
      mostrarProducts(productos, categoria);
    } else {
      const filtracionProductos = productos.filter(
        (producto) => producto.tipoDeAccesorio === categoria
      );
      mostrarProducts(filtracionProductos, categoria);
    }
  };

  const obtenerProductos = async (categoria = "All") => {
    try {
      const response = await fetch("http://localhost:3000/productos");
      const productos = await response.json();
      filtradoDeProductos(productos, categoria);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  categorylinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const categoria = event.target.getAttribute("data-category");
      obtenerProductos(categoria);
    });
  });

  obtenerProductos();

  // filtrar por nombre
  searchInput.addEventListener("input", async function () {
    try {
      const response = await fetch("http://localhost:3000/productos");
      const productos = await response.json();
      const terminoDeBusqueda = searchInput.value.trim().toLowerCase();
      const busquedaAccesorios = productos.filter((accesorio) =>
        accesorio.nombre.toLowerCase().includes(terminoDeBusqueda)
      );
      mostrarProducts(busquedaAccesorios, "All");
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  });

  //filtrar por precio
  priceSort.addEventListener("change", async function () {
    try {
      const response = await fetch("http://localhost:3000/productos");
      const productos = await response.json();
      const selectOption = priceSort.value;

      let sortedProducts = [...productos];

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
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  });
});

// despliegue del carrito
