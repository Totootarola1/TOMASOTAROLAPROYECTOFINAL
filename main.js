//array que va a contener el json local
let paquetes = [];
//llamado del json local
fetch("./json/data.json")
  .then(response => response.json())
  .then(data => {
    paquetes = data;
    cargarInfo(paquetes);
  })
//llamado de botones y divs
const btn = document.querySelectorAll(".btn-header")
const btnBuy = document.querySelector("#btn-res")
const inicio = document.querySelector("#all")
const btnDown = document.querySelector("#btn-down")
const input = document.getElementById("input").value;
let reserva = document.querySelectorAll(".reserva")
let comprar = document.querySelectorAll(".comprar")
let content = document.querySelector("#content-pro")
//agregando eventos
btnDown.addEventListener("click", btnD)
inicio.addEventListener("click", ini)
//funciones correspondientes
//cargar productos al content inicial
function cargarInfo(allPack) {
  content.innerHTML = "";
  allPack.forEach(e => {
    const div = document.createElement("div");
    div.innerHTML = ` <section class="trip">
        <div class="section__container trip__container">
          <h2 class="section__title">${e.pais + " ," + e.ciudad}.</h2>
          <p class="section__subtitle">
          </p>
          <div class="trip__grid">
            <div class="trip__card">
              <img class="trip__img" src="${e.foto}" alt="trip" /><br>
              <div class="trip__details">
                <p>${e.info}</p>
                <div class="rating"><i class="ri-star-fill"></i>${e.puntacion}</div>
                <div class="rating"> Paquete all inclusive 4 personas</div>
                <div class="booking__price">
                  <div class="price"><span>Desde $</span>${e.precio} usd.</div>
                  <button class="reserva" id="${e.id}" >Reserva ahora!</button>
                </div>
              </div>
            </div>
    `;
    content.append(div);

  });
  actBtn();

}
// recorrer y darle funcion a cada boton del nav
btn.forEach(boton => {
  boton.addEventListener("click", (e) => {
    e.currentTarget.classList.add("active");
    if (e.currentTarget.id != "all") {
      const productosBoton = paquetes.filter(producto => producto.titulo === e.currentTarget.id);
      cargarInfo(productosBoton);
    } else {
      titulo.innerText = "Todos los paises";
      cargarInfo(paquetes);
    }

  })

});
function ini() {
  content.innerHTML = "";
  cargarInfo(paquetes);
}
//obtener mail y guardarlo
function btnD() {
  var mails = [];
  var inputs = document.getElementById("input").value;
  mails = inputs;
  localStorage.setItem("Mails", JSON.stringify(inputs));

}
//llamamos a nuestro boton de reserva desde la clase
function actBtn() {
  reserva = document.querySelectorAll(".reserva")
  reserva.forEach(e => {
    e.addEventListener("click", newRes);
  });
}
//array para reservas
const nuevasReservas = [];
//agregar reservas
function newRes(e) {
  Toastify({
    text: "Reservado!",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "var(--primary-color)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem"
    },
    offset: {
      x: '1.5rem',
      y: '1.5rem'
    },
    onClick: function () { }
  }).showToast();

  const id = e.currentTarget.id;
  const reservaNueva = paquetes.find(e => e.id === id);
  nuevasReservas.push(reservaNueva);
  if (nuevasReservas.some(e => e.id === id)) {
    const index = nuevasReservas.findIndex(e => e.id === id);
    nuevasReservas[index].cantidad++;
  } else {
    reservaNueva.cantidad = 1;
    nuevasReservas.push(reservaNueva);
  }

  localStorage.setItem("Reservas", JSON.stringify(nuevasReservas));
}
