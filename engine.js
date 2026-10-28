const MAKS_ENERGIA = 10;
const WERSJA = 1;

const pokoje = [
  { id: 1, nazwa: "Recepcja"},
  { id: 2, nazwa: "Magazyn"},
  { id: 3, nazwa: "Serwerownia"},
  { id: 4, nazwa: "Wyjście" },
  { id: 5, nazwa: "Biblioteka"},
  { id: 6, nazwa: "Zaplecze Biblioteki"}
];

function stanPoczatkowy() {
  return {
    wersja: WERSJA,
    pokoj: 1,
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