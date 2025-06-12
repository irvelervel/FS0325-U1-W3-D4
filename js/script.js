// come prima cosa, cercheremo di riempire l'h1 del documento con il NOME del mese
// corrente (es. "Giugno")
// per farlo, sfrutteremo un Oggetto integrato nel linguaggio JS chiamato "Date"

const now = new Date() // new Date() crea un OGGETTO di tipo DATA in JS
// ci verrà comodo per risalire a che giorno/mese/anno siamo in modo da compilare
// le parti mancanti del calendario all'avvio della pagina
// console.log(now)

const monthArray = [
  'Gennaio', // 0
  'Febbraio', // 1
  'Marzo', // 2
  'Aprile', // 3
  'Maggio', // 4
  'Giugno', // 5
  'Luglio', // ...
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
]

// il prossimo passo ora sarà cercare di mettere il NOME del mese corrente nell'h1
const printCurrentMonthInH1 = function () {
  // recupero il riferimento dell'H1 in HTML
  const title = document.querySelector('h1')
  console.log(now.getMonth()) // 5 per Giugno :(
  const currentMonthIndex = now.getMonth() // 5
  const currentMonth = monthArray[currentMonthIndex] // ora risulta monthArray[5]
  const currentYear = now.getFullYear() // 2025
  title.innerText = currentMonth + ' ' + currentYear
}

const numberOfDaysInCurrentMonth = function () {
  // JS non ha purtroppo un metodo integrato per ritornarci QUANTI GIORNI
  // ha il mese corrente
  // però il numero dei giorni di un mese corrisponde al numero dell'ULTIMO giorno
  // di quel mese! (es. Giugno ha 30gg perchè l'ultimo di Giugno è il 30!)
  // quindi per recuperare questo numero faremo questo ragionamento: a partire dalla
  // data di oggi salteremo al PRIMO GIORNO del MESE SUCCESSIVO: a quel punto, sottrarremo
  // da quella data 1gg.
  // Avremo così trovato l'ULTIMO GIORNO del mese corrente: il numero di quel giorno è
  // anche il numero dei giorni del mese.
}

printCurrentMonthInH1()
numberOfDaysInCurrentMonth()
