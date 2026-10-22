/*
  REGOLE
  - Solo const/let, mai var.
  - DOM con querySelector / querySelectorAll.
  - Eventi con addEventListener (mai onclick inline nell'HTML).
*/

/* SCRIVI QUI LE TUE FUNZIONI E I TUOI LISTENER:
   1. rendiTabellone()  — crea 90 div, evidenzia i numeri usciti
   2. estrai()          — pesca un numero casuale tra i non usciti
   3. rendiCronologia() — mostra gli ultimi 10 estratti
   4. Listener click su #estrai e #reset
   EXTRA: conteggio, animazione di estrazione, localStorage
*/

let usciti = []; // array dei numeri già estratti

const tabellone = document.querySelector(`#tabellone`)


function rendiTabellone() {
  for (let i = 1; i <= 90; i++) {     //Il ciclo parte da 1, perchè in tombola i numeri partono da 1

    const divNumber = document.createElement(`div`);    //creo i div che compariranno nella griglia del tabellone
    divNumber.classList.add(`numero`);
    divNumber.textContent = i;
    tabellone.appendChild(divNumber);
  }
}

console.log(rendiTabellone());



const estrai = () => {
  const disponibili = [];
  for (let i = 1; i <= 90; i++) {
    if (!usciti.includes(i)) {
      disponibili.push(i)
    }
  }
  if (disponibili.length === 0) {
    console.log(`Tutti i numeri sono stati estratti`)
    return
  }
  const index = Math.floor(Math.random() * disponibili.length)
  const numero = disponibili[index];

  usciti.push(numero)
  return numero
}

console.log(estrai());

const rendiCronologia = () => {

  const lastTen = document.querySelector(`#cronologia`)

  const cronologia = usciti.slice(-10);

  if (cronologia.length === 0) {
    lastTen.textContent = "Nessun numero è stato estratto"
    return
  }
  else {
    lastTen.textContent = cronologia.join(`, `);
  }
}

const estraiNum = document.querySelector(`#estrai`);
const reset = document.querySelector(`#reset`);
const lastNumber = document.querySelector(`#ultimo-numero`)

function evidenziaNumero(numero) {
  const cella = document.querySelectorAll(`.numero`)[numero - 1];
  cella.classList.add(`uscito`); 
}

estraiNum.addEventListener(`click`, (e) => {
    const numero = estrai();
  lastNumber.textContent = numero;
  evidenziaNumero(numero);
  rendiCronologia();
})

