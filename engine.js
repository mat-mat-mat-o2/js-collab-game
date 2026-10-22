const MAKS_ENERGIA = 10;

const pokoje = [
  { id: 1, nazwa: "Recepcja"},
  { id: 2, nazwa: "Magazyn"},
  { id: 3, nazwa: "Serwerownia"},
  { id: 4, nazwa: "Wyjście" }
];

function stanPoczatkowy() {
  return {
    pokoj: 1,
    energia: MAKS_ENERGIA,
    karta: false,
    bezpiecznik: false,
    zasilanie: false,
    koniec: false,
    wygrana: false
  };
}

// function przejscie(stanPrzed, komenda) {
//   if (stanPrzed.koniec) {
//     return { stan: stanPrzed, komunikat: "Gra jest zakończona." };
//   }

//   if (komenda !== "lewo" && komenda !== "prawo") {
//     return { stan: stanPrzed, komunikat: "Użyj lewo albo prawo." };
//   }

//   const krok = komenda === "prawo" ? 1 : -1;
//   const numerDocelowy = stanPrzed.pokoj + krok;
//   const pokojDocelowy = znajdzPokoj(numerDocelowy);

//   if (pokojDocelowy === undefined) {
//     return { stan: stanPrzed, komunikat: "Ściana. Stan bez zmian." };
//   }

//   const nowaEnergia = stanPrzed.energia - 1;
//   const stanPo = {
//     ...stanPrzed,
//     pokoj: numerDocelowy,
//     energia: nowaEnergia,
//     koniec: nowaEnergia === 0
//   };

//   const komunikat = stanPo.koniec
//     ? "Brak energii. Koniec gry."
//     : "Jesteś w: " + pokojDocelowy.nazwa;

//   return { stan: stanPo, komunikat: komunikat };
// }

function zakonczTure() {
  stan.energia = stan.energia - 1;
  console.log("Pozostala energia: " + stan.energia);
  if (stan.wygrana) {
    console.log("WYGRANA! Drzwi otwarte. Mozesz wrocic do domu.");
  } else if (stan.energia === 0) {
    stan.koniec = true;
    console.log("PRZEGRANA. Zasilanie awaryjne padlo. Wpisz start().");
  }
}

// SEKCJA B — RUCH
function idz(kierunek) {
  // TODO B1: zablokuj ruch po koncu gry.
  if (stan.koniec) {
    console.log("Koniec gry.");
    return;
  }
  // TODO B2: switch kierunku; oblicz kandydat na nowy pokoj.
  let nastepnyPokoj = stan.pokoj
  switch(kierunek)
  {
    case "prawo":
      nastepnyPokoj++;
      break;
    case "lewo":
      nastepnyPokoj--;
      break;
    default:
      console.log('Pokoje sa tylko w "lewo" lub "prawo".');
    return;
  }
  // TODO B3: odrzuc pokoj poza 1..4 i nieznany kierunek bez kosztu.
  if (nastepnyPokoj > 4 || nastepnyPokoj < 1) {
    console.log(`W ${kierunek} jest sciana.`);
    return;
  }
  // TODO B4: zapisz poprawny pokoj, rozejrzyj(), zakonczTure().
  stan.pokoj = nastepnyPokoj;
  rozejrzyj();
  zakonczTure();
  //console.log("Ruch do uzupelnienia");
}

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co) {
  // TODO C1: zablokuj akcje po koncu gry.
  if (stan.koniec) {
    console.log("Koniec gry.");
    return;
  }
  // TODO C2: switch: karta / bezpiecznik / napraw / wyjdz.
  // TODO C2: przed zmiana sprawdz pokoj i wymagany stan.
  switch(co)
  {
    case "karta":
      if (stan.pokoj !== 1 || stan.karta) {
        console.log("Tutaj nie ma karty do zabrania.");
        return;
      }
      stan.karta = true;
      console.log("Zabierasz karte.");
      break;
    case "bezpiecznik":
      if (stan.pokoj !== 2 || stan.bezpiecznik || stan.zasilanie) {
        console.log("Tutaj nie ma bezpiecznika do zabrania.");
        return;
      }
      stan.bezpiecznik = true;
      console.log("Zabierasz bezpiecznik.");
      break;
    case "napraw":
      if (stan.pokoj !== 3 || stan.zasilanie) {
        console.log("Tutaj nie ma nic do naprawienia.");
        return;
      } else if (!stan.bezpiecznik) {
        console.log("Nie masz bezpiecznika.");
        return;
      }
      stan.bezpiecznik = false;
      stan.zasilanie = true;
      console.log("Naprawiasz zasilanie.");
      break;
    case "wyjdz":
      if (stan.pokoj !== 4) {
        console.log("Nie ma dokad wyjsc.");
        return;
      } else if(!stan.karta) {
        console.log("Nie masz karty.");
        return;
      } else if (!stan.zasilanie) {
        console.log("Nie ma zasilania.");
        return;
      }
      stan.wygrana = true;
      stan.koniec = true;
      console.log("Zabierasz karte.");
      break;
    default:
      console.log('jedyne akcje to "karta", "bezpiecznik", "napraw" i "wyjdz".');
      return;
  }
    // TODO C3: przy odrzuceniu return; przy sukcesie break.
  // TODO C3: po switch jedno zakonczTure().
  zakonczTure();
  // TODO C4: wygrana i koniec ustawione przed rozliczeniem tury!
  //console.log("Akcje do uzupelnienia");
}