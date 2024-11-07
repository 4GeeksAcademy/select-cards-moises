/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const btnGenerar = document.getElementById("btnGenerar");
const btnOrdenar = document.getElementById("btnOrdenar");
const cartasContainer = document.getElementById("cartasContainer");
const registroContainer = document.getElementById("registroContainer");
const inputNumCartas = document.getElementById("numCartas");

const palos = ["♦", "♥", "♠", "♣"];
const valores = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];

const generarCartas = cantidad => {
  const cartas = [];
  for (let i = 0; i < cantidad; i++) {
    const valor = valores[Math.floor(Math.random() * valores.length)];
    const palo = palos[Math.floor(Math.random() * palos.length)];
    cartas.push({ valor, palo });
  }
  return cartas;
};

const mostrarCartas = (cartas, container) => {
  container.innerHTML = "";
  cartas.forEach(carta => {
    const cartaDiv = document.createElement("div");
    cartaDiv.classList.add("carta");

    const simboloArriba = document.createElement("div");
    simboloArriba.classList.add("simbTop");
    simboloArriba.innerText = carta.palo;

    const simboloAbajo = document.createElement("div");
    simboloAbajo.classList.add("simbBottom");
    simboloAbajo.innerText = carta.palo;

    if (carta.palo === "♦" || carta.palo === "♥") {
      simboloArriba.classList.add("rojo");
      simboloAbajo.classList.add("rojo");
    } else {
      simboloArriba.classList.add("negro");
      simboloAbajo.classList.add("negro");
    }

    const valorDiv = document.createElement("div");
    valorDiv.classList.add("valor");
    valorDiv.innerText = carta.valor;

    cartaDiv.appendChild(simboloArriba);
    cartaDiv.appendChild(valorDiv);
    cartaDiv.appendChild(simboloAbajo);
    container.appendChild(cartaDiv);
  });
};

const selectSort = arr => {
  const registroCambios = [];

  for (let min = 0; min < arr.length - 1; min++) {
    let minIndex = min;
    for (let i = min + 1; i < arr.length; i++) {
      if (
        valores.indexOf(arr[i].valor) < valores.indexOf(arr[minIndex].valor)
      ) {
        minIndex = i;
      }
    }
    if (minIndex !== min) {
      let aux = arr[min];
      arr[min] = arr[minIndex];
      arr[minIndex] = aux;

      const estadoActual = JSON.parse(JSON.stringify(arr));
      registroCambios.push(estadoActual);
    }
  }

  mostrarRegistroCambios(registroCambios);
};

const mostrarRegistroCambios = registro => {
  registroContainer.innerHTML = "";
  registro.forEach((cambio, index) => {
    const registroDiv = document.createElement("div");
    registroDiv.classList.add("registroCambio");

    const cambioNumero = document.createElement("div");
    cambioNumero.classList.add("cambioNumero");
    cambioNumero.innerText = `#${index + 1}`;

    const registroCartas = document.createElement("div");
    registroCartas.classList.add("registroCartas");
    mostrarCartas(cambio, registroCartas);

    registroDiv.appendChild(cambioNumero);
    registroDiv.appendChild(registroCartas);
    registroContainer.appendChild(registroDiv);
  });
};

let cartas = [];

btnGenerar.addEventListener("click", () => {
  const cantidad = parseInt(inputNumCartas.value) || 0;
  if (cantidad < 1 || cantidad > 12) {
    alert("Por favor, ingrese un número entre 1 y 12");
    return;
  }
  cartas = generarCartas(cantidad);
  mostrarCartas(cartas, cartasContainer);
});

btnOrdenar.addEventListener("click", () => {
  const cartasOrdenadas = JSON.parse(JSON.stringify(cartas));
  selectSort(cartasOrdenadas);
});
