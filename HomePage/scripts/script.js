//1.Creacion array lista de productos y objetos
const productsDetails = [
  {
    id: 1,
    nombre: "Luxury Gems Necklace",
    codigo: "N001",
    precioUnitario: 168.76,
    tipoDeAccesorio: "Necklaces",
    Imagenes: ["assets/images/image25 (2)"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      plateado: {
        unidad: 10,
      },
    },
  },
  {
    id: 2,
    nombre: "Aurora Rings",
    codigo: "R001",
    precioUnitario: 125.28,
    tipoDeAccesorio: "Rings",
    Imagenes: ["assets/images/image23"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      dorado: {
        unidad: 10,
      },
    },
  },
  {
    id: 3,
    nombre: "Reflections Necklace",
    codigo: "N002",
    precioUnitario: 620.73,
    tipoDeAccesorio: "Necklaces",
    Imagenes: ["assets/images/image24 (2)"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      rojo: {
        unidad: 10,
      },
    },
  },
  {
    id: 4,
    nombre: "Dreamy Infinity Ring",
    codigo: "R002",
    precioUnitario: 327.71,
    tipoDeAccesorio: "Rings",
    Imagenes: ["assets/images/image26 (2)"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      rojo: {
        unidad: 10,
      },
    },
  },
  {
    id: 5,
    nombre: "Opulent Jewels Ring",
    codigo: "R004",
    precioUnitario: 168.76,
    tipoDeAccesorio: "Rings",
    Imagenes: ["assets/images/image30"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      plateado: {
        unidad: 10,
      },
    },
  },
  {
    id: 6,
    nombre: "Serene Solitaire Earrings",
    codigo: "E001",
    precioUnitario: 125.28,
    tipoDeAccesorio: "Earrings",
    Imagenes: ["assets/images/image27 (2)"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      azul: {
        unidad: 10,
      },
    },
  },
  {
    id: 7,
    nombre: "Timeless Halo Earrings",
    codigo: "E002",
    precioUnitario: 620.73,
    tipoDeAccesorio: "Earrings",
    Imagenes: ["assets/images/image28"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      plateado: {
        unidad: 10,
      },
    },
  },
  {
    id: 8,
    nombre: "Exquisite Earrings",
    codigo: "E003",
    precioUnitario: 327.71,
    tipoDeAccesorio: "Earrings",
    Imagenes: ["assets/images/image29"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      azul: {
        unidad: 10,
      },
    },
  },
  {
    id: 9,
    nombre: "Timeless Elegance Ring",
    codigo: "R003",
    precioUnitario: 168.76,
    tipoDeAccesorio: "Rings",
    Imagenes: ["assets/images/image31 (2)"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      dorado: {
        unidad: 10,
      },
    },
  },
  {
    id: 10,
    nombre: "Luxury Charms Rings",
    codigo: "78205",
    precioUnitario: 620.73,
    tipoDeAccesorio: "Rings",
    Imagenes: [
      "assets/images/image26 (2)",
      "assets/images/miniatura-productDetails1.jpg",
      "assets/images/miniatura-productDetails2.jpg",
      "assets/images/miniatura-productDetails3.jpg",
      "assets/images/miniatura-productDetails4.jpg",
    ],
    descripcion:
      "Discover the elegance and style of our Gold Ring with Carnelian. This ring features a central carnelian stone in a charming orange hue, cut in a square shape with gently rounded edges. The ring is adorned with a delicate beaded chain, adding a unique and sophisticated touch to its design. Perfect for any occasion, this ring flawlessly combines classic beauty with modern style. Make it yours and add a touch of distinction to your jewelry collection!",
    cantidadEnStock: {
      Rose_Gold: {
        unidad: 10,
      },
    },
  },
  {
    id: 11,
    nombre: "Blissful Bloom Ring",
    codigo: "R004",
    precioUnitario: 620.73,
    tipoDeAccesorio: "Rings",
    Imagenes: ["assets/images/image33 (2)"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      dorado: {
        unidad: 10,
      },
    },
  },
  {
    id: 12,
    nombre: "Sparkling Ring",
    codigo: "R005",
    precioUnitario: 620.73,
    tipoDeAccesorio: "Rings",
    Imagenes: ["assets/images/image35 (2)"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      plateado: {
        unidad: 10,
      },
    },
  },
  {
    id: 13,
    nombre: "Glimmerin Ring",
    codigo: "R006",
    precioUnitario: 620.73,
    tipoDeAccesorio: "Rings",
    Imagenes: ["assets/images/image34 (2)"],
    descripcion: "descripcion producto",
    cantidadEnStock: {
      dorado: {
        unidad: 10,
      },
    },
  },
];

// 2 filtrar elementos de un array
function filtrarAccesorios(accesorios, tipoDeAccesorio) {
  const accesoriosFiltrados = accesorios.filter(
    (accesorios) => accesorios.tipoDeAccesorio === tipoDeAccesorio
  );
  return accesoriosFiltrados;
}

const filtroDeaccesorios = filtrarAccesorios(productsDetails, "Rings");
console.log("Filtrar accesorios");
console.log(filtroDeaccesorios);

//3.busqueda por nombre en un array
function busquedaPorNombre(accesorios, terminoDeBusqueda) {
  const busquedaAccesorios = accesorios.filter((accesorios) =>
    accesorios.nombre.toLowerCase().includes(terminoDeBusqueda.toLowerCase())
  );
  return busquedaAccesorios;
}
const terminoDeBusqueda = busquedaPorNombre(productsDetails, "Glimme");
console.log("Busqueda por nombre");
console.log(terminoDeBusqueda);

// 4. Ordenar los precios de forma ascendente y descendente
const ordenarPorPrecio = (productos, orden) => {
  if (orden === "ascendente") {
    return productos.sort((a, b) => a.precioUnitario - b.precioUnitario);
  } else if (orden === "descendente") {
    return productos.sort((a, b) => b.precioUnitario - a.precioUnitario);
  } else {
    console.error('El orden debe ser "ascendente" o "descendente"');
  }
};

console.log(
  "Orden de precio ascendente: ",
  ordenarPorPrecio(productsDetails, "ascendente")
);

console.log(
  "Orden de precio descendente: ",
  ordenarPorPrecio(productsDetails, "descendente")
);

//5 total de compra
function solicitarCompra() {
  const input = prompt("Ingrese ID del producto:");
  const producto = productsDetails.find((p) => p.id.toString() === input);

  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  const cantidadInput = prompt("Ingrese la cantidad de unidades a comprar:");
  const cantidad = parseFloat(cantidadInput);

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Cantidad inválida");
  } else {
    const total = calcularTotal(producto, cantidad);
    console.log(`Total a pagar: ${total.toFixed(2)} USD`);
  }
}

const calcularTotal = (producto, cantidad) => {
  return producto.precioUnitario * cantidad;
};

solicitarCompra();
