let reserva = localStorage.getItem("Reservas");
reserva = JSON.parse(reserva);
let mail = localStorage.getItem("Mails");
mail = JSON.parse(mail);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (reserva && reserva.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        reserva.forEach( e => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${e.foto}" alt="">
                <div class="carrito-producto-titulo">
                    <small>Destino</small>
                    <h3>${e.pais + ", " + e.ciudad + "."}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Paquete</small>
                    <p>All inclusive</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${e.precio + "usd"}</p>
                </div>
            
                <button class="carrito-producto-eliminar" id="${e.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Reserva eliminada",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true,
        style: {
          background:  "var(--primary-color)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' //
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = reserva.findIndex(producto => producto.id === idBoton);
    
    reserva.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(reserva));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

reserva.length = 0;
            localStorage.setItem("Reservas", JSON.stringify(reserva));
            cargarProductosCarrito();
}


botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    reserva.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(reserva));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}
