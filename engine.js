const MAKS_ENERGIA = 15;
const WERSJA = 1;
const START_POKOJ = 3;

const pokoje = [
  { id: 1, nazwa: "Zaplecze Biblioteki"},
  { id: 2, nazwa: "Biblioteka"},
  { id: 3, nazwa: "Recepcja"},
  { id: 4, nazwa: "Magazyn"},
  { id: 5, nazwa: "Serwerownia"},
  { id: 6, nazwa: "Wyjście" }
];

function stanPoczatkowy() {
  return {
    wersja: WERSJA,
    pokoj: START_POKOJ,
    energia: MAKS_ENERGIA,
    karta: false,
    bezpiecznik: false,
    klucz: false,
    okno: false,
    drzwi:false,
    zasilanie: false,
    koniec: false,
    wygrana: false
  };
}
