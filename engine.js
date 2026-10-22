const MAKS_ENERGIA = 10;
const WERSJA = 1;

const pokoje = [
  { id: 1, nazwa: "Recepcja"},
  { id: 2, nazwa: "Magazyn"},
  { id: 3, nazwa: "Serwerownia"},
  { id: 4, nazwa: "Wyjście" }
];

function stanPoczatkowy() {
  return {
    wersja: WERSJA,
    pokoj: 1,
    energia: MAKS_ENERGIA,
    karta: false,
    bezpiecznik: false,
    zasilanie: false,
    koniec: false,
    wygrana: false
  };
}

function przejscie(stanPrzed, komenda) {
  if (stanPrzed.koniec) {
    return { stan: stanPrzed, komunikat: "Gra jest zakończona." };
  }

  if (komenda !== "lewo" && komenda !== "prawo") {
    return { stan: stanPrzed, komunikat: "Użyj lewo albo prawo." };
  }

  const krok = komenda === "prawo" ? 1 : -1;
  const numerDocelowy = stanPrzed.pokoj + krok;
  const pokojDocelowy = znajdzPokoj(numerDocelowy);

  if (pokojDocelowy === undefined) {
    return { stan: stanPrzed, komunikat: "Ściana. Stan bez zmian." };
  }

  const nowaEnergia = stanPrzed.energia - 1;
  const stanPo = {
    ...stanPrzed,
    pokoj: numerDocelowy,
    energia: nowaEnergia,
    koniec: nowaEnergia === 0
  };

  const komunikat = stanPo.koniec
    ? "Brak energii. Koniec gry."
    : "Jesteś w: " + pokojDocelowy.nazwa;

  return { stan: stanPo, komunikat: komunikat };
}

function czyStan(){

  

}