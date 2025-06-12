// come prima cosa, cercheremo di riempire l'h1 del documento con il NOME del mese
// corrente (es. "Giugno")
// per farlo, sfrutteremo un Oggetto integrato nel linguaggio JS chiamato "Date"

const now = new Date() // new Date() crea un OGGETTO di tipo DATA in JS
// ci verrà comodo per risalire a che giorno/mese/anno siamo in modo da compilare
// le parti mancanti del calendario all'avvio della pagina
// console.log(now)

// gli appuntamenti nel calendario saranoo salvati così: un ARRAY di ARRAY (di stringhe)
// [
//   ["15:00 - Dentista", "18:00 - Cinema", "23:00 - Nanna"]
//   ["15:00 - Dentista", "18:00 - Cinema", "23:00 - Nanna"]
//   ["15:00 - Dentista", "18:00 - Cinema", "23:00 - Nanna"]
//   ["15:00 - Dentista", "18:00 - Cinema", "23:00 - Nanna"]
// ]

const appointments = [] // è la cassettiera, che si deve riempire di cassettini (1 x gg)
// dopo appointments deve diventare così:
// [
//   [], [], [], [], [],
//   [], [], [], [], [],
//   [], [], [], [], [],
//   [], [], [], [], [],
//   [], [], [], [], [],
//   [], [], [], [], [],
// ]

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
  // dobbiamo calcolare la data del primo giorno del mese prossimo (e toglierci un gg)
  const currentYear = now.getFullYear() // 2025
  const currentMonth = now.getMonth() // 5

  // vado a calcolare con queste informazioni il primo gg del mese prossimo
  // new Date(currentYear, currentMonth + 1, 1) // 1 Luglio 2025
  const lastDayOfTheMonth = new Date(currentYear, currentMonth + 1, 0) // 0 Luglio 2025 -> 30 Giugno 2025
  console.log(lastDayOfTheMonth) // ora dà il 30 giugno 2025
  // ora estraggo solamente il giorno del mese
  return lastDayOfTheMonth.getDate() // 30
}

const unselectPreviousCells = function () {
  // prima di applicare la classe "selected" ad una nuova cella, devo assicurarmi
  // di togliere la classe "selected" dalle altre in cui è già presente

  //   2 MODI:
  // APPROCCIO BULLDOZER
  // ciclo TUTTE LE CELLE, tolgo la classe selected a tutte le celle
  //   const allTheCells = document.getElementsByClassName('day')
  //   for (let i = 0; i < allTheCells.length; i++) {
  //     allTheCells[i].classList.remove('selected')
  //   }

  // APPROCCIO DOTT.PIVETTA
  //   ce n'è al massimo UNA già con la classe "selected"!
  // la trovo e vi tolgo la classe
  const previouslySelected = document.querySelector('.selected')
  if (previouslySelected) {
    previouslySelected.classList.remove('selected')
  }
}

printCurrentMonthInH1()
// numberOfDaysInCurrentMonth() // questa funzione se eseguita torna il NUMERO dei giorni del mese corrente

const showAppointmentsSection = function () {
  const appointmentsSection = document.getElementById('appointments')
  appointmentsSection.style.display = 'block'
}

const hideAppointmentsSection = function () {
  const appointmentsSection = document.getElementById('appointments')
  appointmentsSection.style.display = 'none'
}

// ho slegato la funzione createAppointmentsList in modo da renderla riutilizzabile:
// il problema è che la funzione ora non sa quale sia il cassettino da aprire,
// perchè sa solo aprire uno, crearne la lista e mostrarla
const createAppointmentsList = function (i) {
  // un altro pezzo ora: se la giornata selezionata ha degli eventi salvati
  // nel proprio cassettino della cassettiera (appointments), dobbiamo riempire
  // la lista (vuota) c'è presente in HTML e togliergli il display: none
  if (appointments[i].length > 0) {
    // vuol dire che la giornata cliccata ha degli eventi da mostrare!
    // li preleviamo dal nostro cassettino
    const appointmentsForThisDay = appointments[i]
    // prendo il riferimento HTML alla lista ul che al momento è nascosta
    const listToFill = document.getElementById('appointmentsList')

    // prima di ri-appendere eventi a questa lista, la svuoto
    // in modo da ripulire eventi precedenti
    listToFill.innerHTML = ''

    // questo .sort() si occupa, prima di creare la lista, di ordinare
    // gli eventi in ordine alfabetico per orario
    appointmentsForThisDay.sort()

    appointmentsForThisDay.forEach((appointment) => {
      // creo un nuovo <li> per la lista
      const newLi = document.createElement('li')
      // ci metto il testo dentro
      newLi.innerText = appointment
      // lo appendo alla lista
      listToFill.appendChild(newLi)
    })

    // togliamo il display: none dalla sezione degli appuntamenti del giorno
    showAppointmentsSection()
  } else {
    hideAppointmentsSection()
  }
}

// abbiamo capito quanti giorni ha il mese corrente: questo numero ci servirà
// per capire QUANTE CELLE CREARE nel nostro calendario!
// vado a creare una funzione che riempirà la section con id "calendar" con un numero
// di caselle pari al numero dei giorni del mese (numberOfDaysInCurrentMonth())
const createCells = function () {
  // quante celle devo creare? devo creare numberOfDaysInCurrentMonth() celle

  // prendo un riferimento alla section ancora vuota
  const calendarSection = document.getElementById('calendar')
  // creo una cella e l'appendo al suo interno numberOfDaysInCurrentMonth() volte

  // calcoliamo il limite per il for, ovvero quante caselle deve creare
  // ne deve creare una per OGNI GIORNO del mese corrente
  const numberOfTotalDays = numberOfDaysInCurrentMonth()

  for (let i = 0; i < numberOfTotalDays; i++) {
    // nel nostro caso di oggi è come dire let i=0; i<30; i++
    // per ogni giorno del mese, creo una cella
    const dayCell = document.createElement('div') // <div></div>
    dayCell.classList.add('day') // <div class="day"></div>

    // dopo aver creato la cella, la rendo cliccabile!
    dayCell.addEventListener('click', function () {
      console.log('hai cliccato una cella')
      //   quando clicco una cella, la voglio evidenziare con un bordo viola
      //   per farlo, vi aggiungo la classe css (già disponibile) di nome "selected"

      // richiamo ora la funzione che TOGLIE i precedenti "selected"
      unselectPreviousCells()

      dayCell.classList.add('selected')

      //   ora inserisco il numero del giorno selezionato nello span "newMeetingDay"
      const spanToRename = document.getElementById('newMeetingDay')
      spanToRename.innerText = i + 1
      spanToRename.classList.add('hasDay') // lo faccio più grande, con uno sfondo etc.

      // invoco la funzione che, fornito un numero di un cassettino, lo apre, crea
      // la lista e mostra la sezione nascosta
      createAppointmentsList(i)
    })

    const dayCellValue = document.createElement('h3') // <h3></h3>
    dayCellValue.innerText = i + 1 // per fare le celle dall'1 al 30, es. <h3>1</h3>
    dayCell.appendChild(dayCellValue) // <div class="day"><h3>1</h3></div>
    calendarSection.appendChild(dayCell)

    // ora pushiamo un cassettino nella cassettiera degli appuntamenti
    appointments.push([]) // un array vuoto dentro l'array degli appuntamenti
  }
  console.log(appointments)
}

createCells()

// ora che le celle sono state create, dobbiamo spostarci nella sezione sottostante
// operiamo sul form: dobbiamo salvare gli appuntamenti nei cassetti della "cassettiera"
// primo passo -> disabilitare il comportamento di default dell'evento submit del form

const form = document.getElementById('meeting-form')
form.addEventListener('submit', function (e) {
  // DISABILITO IL REFRESH
  e.preventDefault()
  // ora possiamo integrare la nostra logica
  // cosa faremo:
  // 1) creare la stringa dell'evento -> "16:00 - Dentista"
  const meetingTimeInput = document.getElementById('newMeetingTime')
  const meetingNameInput = document.getElementById('newMeetingName')
  const appointment = meetingTimeInput.value + ' - ' + meetingNameInput.value
  // const appointment = `${meetingTimeInput.value} - ${meetingNameInput.value}`
  console.log(appointment)

  // 2) pushare questa stringa nel "cassettino" appropriato degli appointments
  // recuperare dallo span in basso a sx il giorno che prima avevamo "parcheggiato"
  const spanWithDay = document.getElementById('newMeetingDay')
  const selectedDay = spanWithDay.innerText // leggo il contenuto testuale
  console.log('giorno del mese su cui salvare', selectedDay)
  appointments[parseInt(selectedDay) - 1].push(appointment) // ho convertito il giorno in stringa in numero
  // svuotare il form
  form.reset()
  // aggiungere alla cella selezionata una ulteriore classe "dot"
  //   troviamo la cella corrispondente al giorno in cui abbiamo salvato l'ultimo evento
  const selectedCell = document.querySelector('.selected')
  // l'idea è ora di aggiungere DENTRO questa selectedCell uno span con classe "dot"
  // però lo voglio aggiungere SOLO se dentro questa selectedCell non c'è già!
  // quindi CERCO se il dot c'è già! solo nel caso non ci sia, lo aggiungo
  const dotAlreadyPresent = selectedCell.querySelector('.dot')
  // quando il dot ancora non c'è...
  if (!dotAlreadyPresent) {
    // ...allora lo metto :)
    const dot = document.createElement('span')
    dot.classList.add('dot')
    selectedCell.appendChild(dot)
  }

  console.log('APPOINTMENTS', appointments)
  // ciliegina finale: mostro automaticamente la sezione degli appuntamenti
  // per questa giornata!

  createAppointmentsList(parseInt(selectedDay) - 1)
})
