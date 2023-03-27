import moment from "moment/moment";

const months = {
  January: "Gennaio",
  February: "Febbraio",
  March: "Marzo",
  April: "Aprile",
  May: "Maggio",
  June: "Giugno",
  July: "Luglio",
  August: "Agosto",
  September: "Settembre",
  October: "Ottobre",
  November: "Novembre",
  December: "Dicembre",
};

export const text = {
  english: [
    {
      headerTitle: ", the first question is easy. What's your date of birth?",
      message: "If you indicate it wrong, you will receive our birthday wishes on another date 😅",
      label: "Date of birth",
      placeholder: "DD/MM/YYYY",
    },
    {
      headerTitle: "In which time zone are you living?",
      labelInput: "Time zone",
      message: "If you indicate it wrong, you will receive the invitation to classes at a wrong time",
    },
    {
      headerTitle: "Now, what's your current address?",
      message: "Do not worry, we will not ring your doorbell 🔔. It is just required for the payment receipt",
      label1: "Address",
      label2: "Town",
      label3: "State",
      label4: "Zip code",
      placeholder1: "Via Roma, 19",
      placeholder2: "Rome",
      placeholder3: "Italy",
      placeholder4: "00123",
      help: "No match street",
    },
    {
      headerTitle: "We are almost over...when do you like to start to learn with us?",
      message: "You will receive a message about the beginning of the course one week prior to the start date",
      label: "Select a month",

      placeholder: "Month",
    },
    {
      headerTitle: "Last but not least, choose a password to access our portal",
      message1: "Minimum 8 characters",
      message2: "One uppercase letter",
      message3: "One lowercase letter",
      message4: "One number",
      message5: "One special character (#?!@$%^&*-)",
      message: "Remember to save your password",
      label1: "Choose Password",
      label2: "Confirm Password",
    },
    {
      headerTitle: "Very, very last ask from our side...record a voice message by pressing the button below",
      message: "It should be spontaneous! Do not use any script or prepare the speech before",
    },
    {
      headerTitle: "The registration process is over!",
      parag: "You will receive a confirmation via email, where you will find attached the payment receipt",
      message: "Thanks so much for taking the time  😃",
      button: "Go to login",
    },
  ],
  italiano: [
    {
      headerTitle: ", la prima domanda è semplice, quando è il tuo compleanno?",
      message: "Se indichi la data sbagliata riceverai i regali un altro giorno 😅",
      label: "Data di nascita",
      placeholder: "GG/MM/AAAA",
    },
    {
      headerTitle: "Abbiamo bisogno di sapere il fuso orario del posto in cui vivi",
      message: "Se lo indichi in modo errato, riceverai l'invito alle lezioni in un momento sbagliato",
      labelInput: "Fuso orario",
      label: "Roma GMT +02.00",
    },
    {
      headerTitle: "Ora, qual è il tuo indirizzo di residenza?",
      message: "Non preoccuparti, non suoneremo al tuo campanello 🔔. Serve solo per la ricevuta di pagamento",
      label1: "Indirizzo",
      label2: "Città",
      label3: "Stato",
      label4: "Cap",
      placeholder1: "Via Roma, 19",
      placeholder2: "Roma",
      placeholder3: "Italia",
      placeholder4: "00123",
      help: "Nessuna di queste",
    },
    {
      headerTitle: "Abbiamo quasi finito...quando vuoi iniziare il tuo percorso con noi?",
      message: "Riceverai un messaggio sull'inizio del corso una settimana prima della data di inizio",
      label: "Seleziona un mese",
      placeholder: "Mese",
    },
    {
      headerTitle: "Ultimo ma non meno importante, scegli una password per accedere al nostro portale",
      message1: "Minimo 8 caratteri",
      message2: "Una lettera maiuscola",
      message3: "Una lettera minuscola",
      message4: "Un numero",
      message5: "Un carattere speciale (#?!@$%^&*-)",
      message: "Ricorda di salvare la password",
      label1: "Scegli Password",
      label2: "Conferma Password",
    },
    {
      headerTitle: "Ultimissima richiesta da parte nostra...registra un messaggio vocale premendo il pulsante sottostante",
      message: "Deve essere spontaneo. Non utilizzare un discorso preparato prima",
    },
    {
      headerTitle: "Il processo di registrazione è terminato!",
      parag: "Riceverai la conferma via mail, dove troverai in allegato la fattura di pagamento",
      message: "Grazie mille per il tempo dedicatoci 😃",
      button: "Vai al login",
    },
  ],
};

export const textButton = {
  english: {
    buttonRight: "NEXT",
    buttonLeft: "BACK",
  },
  italiano: {
    buttonRight: "AVANTI",
    buttonLeft: "INDIETRO",
  },
};

export const textAudio = {
  english: {
    title: "You need to talk about the following points:",
    parag1: "Introduce of yourself (Name, Surname, Age)",
    parag2: "Describe your job/study or what do you do in life",
    parag3: "Describe your favorite hobby and tell why is your favorite",
    parag4: "Talk about last holiday trip (where did you go, with whom, what did you like most)",
    recTitle: "Press the button to record your message",
    afterRec: "Check if the recording has a good quality and send it. Otherwise record it again",
    button: "SEND",
  },
  italiano: {
    title: "Devi parlare dei seguenti punti:",
    parag1: "Introduci te stesso/a (Nome, Cognome, Età)",
    parag2: "Parla del tuo lavoro/indirizzo di studi o di cosa fai nella vita",
    parag3: "Parla del tuo hobby preferito e del perché lo è ",
    parag4: "Parla del tuo ultimo viaggio (dove sei stato/a, con chi e cosa ti è piaciuto di più",
    recTitle: "Premi il pulsante per registrare il tuo messaggio",
    afterRec: "Controlla se l'audio della registrazione ha una buona qualità e invialo. Altrimenti registra di nuovo",
    button: "INVIA",
  },
};

export const textLabel = {
  english: "Rome GMT +1.00",
  italiano: "Roma GMT +1.00",
};

export const textLanguage = {
  english: "en-US",
  italiano: "it-IT",
};

export const textMonth = (dates) => {
  let ini_dates = {
    english: [],
    italiano: [],
  };

  for (let index = 0; index < dates.length; index++) {
    let eng_item = moment(dates[index]).format("MMMM");
    let ita_item = months[eng_item];
    let value = ita_item + " " + moment(dates[index]).format("YYYY");
    ini_dates.english.push({ item: eng_item, value });
    ini_dates.italiano.push({ item: ita_item, value });
  }

  return ini_dates;
};
