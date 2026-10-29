// Wspolny kontrakt: nazwy zmiennych i funkcji uzgadnia caly zespol.

let stan = stanPoczatkowy();

// SEKCJA A — INFORMACJE I MAPA
function nazwaPokoju(numer) {
  switch (numer) {
    case 1:
      return stan.drzwi ? "Zaplecze biblioteki" : "???";
    case 2:
      return stan.klucz ? "Biblioteka" : "???";
    case 3:
      return "Recepcja";
    case 4:
      return "Magazyn";
    case 5:
      return "Serwerownia";
    case 6:
      return "Wyjście";
    default:
      return "Nieznany pokój";
  }
}

function pomoc() {
  console.log('Komendy: gra.start(), gra.pomoc(), gra.status(), gra.mapa(), gra.rozejrzyj(), gra.idz("prawo"), gra.idz("lewo"), gra.akcja("karta"), gra.akcja("klucz"), gra.akcja("bezpiecznik"), gra.akcja("napraw"), gra.akcja("otworz"), gra.akcja("wyjdz"), gra.eksportuj(), gra.importuj(tekst)');
  console.log("Udany ruch lub akcja kosztuje 1 energię. Nieudane próby są darmowe.");
}

function rozejrzyj() {
  if (stan.koniec) {
    console.log("Koniec gry.");
    return;
  }

  switch (nazwaPokoju(stan.pokoj)) {
    case "Zaplecze biblioteki":
      console.log(stan.okno ? "Okno jest otwarte." : "Okno jest zamknięte. Użyj akcja('otworz')");
      break;
    case "Biblioteka":
      console.log(stan.drzwi ? "Drzwi do zaplecza są otwarte." : "Drzwi do zaplecza są zamknięte. Użyj akcja('otworz')");
      break;
    case "Recepcja":
      console.log(stan.karta ? "Biurko jest puste." : "Karta leży na biurku.");
      break;
    case "Magazyn":
      console.log(!stan.bezpiecznik && !stan.zasilanie ? "Bezpiecznik leży na półce." : "Półka jest pusta.");
      break;
    case "Serwerownia":
      console.log(stan.zasilanie ? "Zasilanie działa." : "Nie ma zasilania.");
      break;
    case "Wyjście":
      if (!stan.karta && !stan.zasilanie) {
        console.log("Potrzebujesz karty i zasilania.");
      } else if (!stan.karta) {
        console.log("Potrzebujesz karty.");
      } else if (!stan.zasilanie) {
        console.log("Potrzebujesz zasilania.");
      } else {
        console.log("Możesz uciekać. Użyj akcja('wyjdz').");
      }
      break;
    case "???":
      console.log("Nie wiesz, co to za pokój.");
      break;
    default:
      console.log("Nieznany pokój.");
  }
}

function start() {
  stan = stanPoczatkowy();
  console.log(`UCIECZKA Z SERWEROWNI. Masz ${MAKS_ENERGIA} energii.`);
  pomoc();
  rozejrzyj();
}

function status() {
  console.log(`Pokój: ${stan.pokoj} - ${nazwaPokoju(stan.pokoj)}`);
  console.log(`Energia: ${stan.energia}`);
  console.log(`Karta: ${stan.karta ? "tak" : "nie"}`);
  console.log(`Bezpiecznik: ${stan.bezpiecznik ? "tak" : "nie"}`);
  console.log(`Zasilanie: ${stan.zasilanie ? "tak" : "nie"}`);

  if (stan.kluczOdkryty || stan.klucz) {
    console.log(`Klucz: ${stan.klucz ? "tak" : "do zebrania"}`);
  }

  if (stan.klucz || stan.drzwi) {
    if (stan.drzwi) {
      console.log("Drzwi: otwarte");
    } else if (stan.pokoj === 2) {
      console.log("Drzwi: zamknięte");
    } else {
      console.log("Drzwi: nieznane");
    }
  }

  if (stan.drzwi || stan.okno || stan.pokoj === 1) {
    console.log(`Okno: ${stan.okno ? "otwarte" : "zamknięte"}`);
  }

  console.log(`Koniec: ${stan.koniec ? "tak" : "nie"}`);
  console.log(`Wygrana: ${stan.wygrana ? "tak" : "nie"}`);
}

function mapa() {
  for (let numer = 1; numer <= LICZBA_POKOI; numer++) {
    console.log(`${numer}. ${nazwaPokoju(numer)}${numer === stan.pokoj ? " <-- tutaj jesteś" : ""}`);
  }
}

function wykonajKomende(komenda) {
  let stanPrzed = stan;
  let wynik = przejscie(stanPrzed, komenda);
  stan = wynik.stan;

  console.log(wynik.komunikat);

  if (stan.pokoj !== stanPrzed.pokoj && !stan.koniec) {
    rozejrzyj();
  }
  if (stan.energia !== stanPrzed.energia) {
    console.log("Energia: " + stan.energia);
  }

  if(stan.wygrana) {
    console.log("WYGRANA! Uciekłeś z serwerowni. Możesz wrócić do domu.");
  } else if(stan.energia === 0) {
    stan.koniec = true;
    console.log("PRZEGRANA. Zasilanie awaryjne padło. Wpisz start().");
  }

  // return wynik;
}

// SEKCJA B — RUCH
function idz(kierunek) {
  return wykonajKomende(kierunek);
}

// SEKCJA C — AKCJE I ZAPIS
function akcja(co) {
  return wykonajKomende(co);
}

function eksportuj() {
  const postep = JSON.stringify({ wersja: WERSJA, stan: stan });
  console.log(postep);
}

function importuj() {

  let tekst=prompt('Wklej dane importu');

  if (typeof tekst !== "string" || tekst.trim() === "") {
    console.log("Brak tekstu do wczytania.");
    return false;
  }

  let kandydat;
  try {
    kandydat = JSON.parse(tekst);
  } catch (blad) {
    console.log("Błędny JSON.");
    return false;
  }

  if (kandydat === null || typeof kandydat !== "object" || Array.isArray(kandydat)) {
    console.log("Błędny zapis.");
    return false;
  }
  if (kandydat.wersja !== WERSJA) {
    console.log("Nieobsługiwana wersja zapisu.");
    return false;
  }
  if (kandydat.stan === null || typeof kandydat.stan !== "object" || Array.isArray(kandydat.stan)) {
    console.log("Brak stanu w zapisie.");
    return false;
  }

  let dane = kandydat.stan;
  let nowyStan = {
    pokoj: dane.pokoj,
    energia: dane.energia,
    karta: dane.karta,
    bezpiecznik: dane.bezpiecznik,
    klucz: dane.klucz,
    kluczOdkryty: dane.kluczOdkryty,
    okno: dane.okno,
    drzwi: dane.drzwi,
    zasilanie: dane.zasilanie,
    koniec: dane.koniec,
    wygrana: dane.wygrana
  };

  if (!czyStan(nowyStan)) {
    console.log("Błędne dane zapisu.");
    return false;
  }

  stan = nowyStan;
  console.log("Wczytano zapis.");
  status();
  rozejrzyj();
  return true;
}

window.gra = { idz, akcja, status, mapa, start, pomoc, rozejrzyj, eksportuj, importuj };
gra.start();
