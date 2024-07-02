//Filtrar accesorios
import { productsDetails } from "../modules/arrayProductDetails.js";
document.addEventListener("DOMContentLoaded", () => {
  const categorylinks = document.querySelectorAll(".categoria-link");
  const productosContainer = document.getElementById("products-container");

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
});

const cart = document.getElementById("cart");
const cartButtonOpen = document.getElementById("cart-button-open");
const cartButtonClose = document.getElementById("cart-button-close");

// mostrar desplegable carrito
cartButtonOpen.addEventListener("click", () => {
  cart.classList.add("show");
});

cartButtonClose.addEventListener("click", () => {
  cart.classList.remove("show");
});

// En proceso
// function busquedaPorNombre(accesorios, terminoDeBusqueda) {
//   const busquedaAccesorios = accesorios.filter((accesorios) =>
//     accesorios.nombre.toLowerCase().includes(terminoDeBusqueda.toLowerCase())
//   );
//   return busquedaAccesorios;
// }
// const terminoDeBusqueda = busquedaPorNombre(productsDetails, "Glimme");
// console.log("Busqueda por nombre");
// console.log(terminoDeBusqueda);

// // 4. Ordenar los precios de forma ascendente y descendente
// const ordenarPorPrecio = (productos, orden) => {
//   if (orden === "ascendente") {
//     return productos.sort((a, b) => a.precioUnitario - b.precioUnitario);
//   } else if (orden === "descendente") {
//     return productos.sort((a, b) => b.precioUnitario - a.precioUnitario);
//   } else {
//     console.error('El orden debe ser "ascendente" o "descendente"');
//   }
// };

// console.log(
//   "Orden de precio ascendente: ",
//   ordenarPorPrecio(productsDetails, "ascendente")
// );

// console.log(
//   "Orden de precio descendente: ",
//   ordenarPorPrecio(productsDetails, "descendente")
// );

// //5 total de compra
// const carrito = [
//   {
//     id: 1,
//     idProducto: 4,
//     talla: "s",
//     color: "oro",
//     cantidad: 2,
//     precioUnitario: 150000,
//   },
//   {
//     id: 1,
//     idProducto: 10,
//     talla: "s",
//     color: "plata",
//     cantidad: 1,
//     precioUnitario: 250000,
//   },
// ];

// function totalAPagar(listaProductos) {
//   const totalAPagar = listaProductos.reduce(
//     (total, producto) => total + producto.cantidad * producto.precioUnitario,
//     0
//   );
//   return totalAPagar;
// }

// const total = totalAPagar(carrito);
// console.log(total);
