// traemos las reservas
let reserva = localStorage.getItem("Reservas");
reserva = JSON.parse(reserva);
// Llamamos elementos de html 
const contentReserva = document.querySelector("#carrito-vacio");
const contentInfo = document.querySelector("#carrito-productos");
const contentFuncionalidad = document.querySelector("#carrito-acciones");
const contentComprado = document.querySelector("#carrito-comprado");
let btnEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const btnVacio = document.querySelector("#carrito-acciones-vaciar");
const contentAll = document.querySelector("#total");
const btnComprar = document.querySelector("#carrito-acciones-comprar");
// Funcion para cargar archivos al dom
function cargarReserva() {
    if (reserva && reserva.length > 0) {
        contentReserva.classList.add("disabled");
        contentInfo.classList.remove("disabled");
        contentFuncionalidad.classList.remove("disabled");
        contentComprado.classList.add("disabled");
        contentInfo.innerHTML = "";
    
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
    
            contentInfo.append(div);
        })
    
    actualizarbtnEliminar();
	
    } else {
        contentReserva.classList.remove("disabled");
        contentInfo.classList.add("disabled");
        contentFuncionalidad.classList.add("disabled");
        contentComprado.classList.add("disabled");
    }

}
// llamamos a la funcion
cargarReserva();
// funcion para que se actualizen los botones eliminar en cada pag nueva
function actualizarbtnEliminar() {
    btnEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    btnEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}
// funcion para eliminar productos
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
    cargarReserva();

    reserva.length = 0;
    localStorage.setItem("Reservas", JSON.stringify(reserva));
    cargarReserva();


}

btnVacio.addEventListener("click", vaciarCarrito);
// funcion para vaciar carrito
function vaciarCarrito() {

reserva.length = 0;
localStorage.setItem("Reservas", JSON.stringify(reserva));
cargarReserva();
}


btnComprar.addEventListener("click", sumarReserva);
// funcion para realizar compra
function sumarReserva() {
    
    contentReserva.classList.add("disabled");
    contentInfo.classList.add("disabled");
    contentFuncionalidad.classList.add("disabled");
    contentComprado.classList.remove("disabled");

    reserva.length = 0;
    localStorage.setItem("Reservas", JSON.stringify(reserva));
    
}
// llamamos y damos evento al input
const btnDown = document.querySelector("#btn-down")
btnDown.addEventListener("click", btnD)
function btnD() {
    var inputs = document.getElementById("input").value;
    mails = inputs;
    localStorage.setItem("Mails", JSON.stringify(inputs));
    cargarReserva();
  
  }
