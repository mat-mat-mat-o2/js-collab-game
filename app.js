// WSPOLNY KONTRAKT: nazwy zmiennych i funkcji uzgadnia caly zespol.

let stan = stanPoczatkowy();

// SEKCJA A — INFORMACJE I MAPA
function nazwaPokoju(numer) {
  switch (numer) {
    case 1:
      return (stan.drzwi) ? "Zaplecze biblioteki" : "???";

    case 2:
      return (stan.klucz) ? "Biblioteka" : "???";

    case 3:
      return "Recepcja";

    case 4:
      return "Magazyn";

    case 5:
      return "Serwerownia";

    case 6:
      return "Wyjście";

    default:
      return "Nieznane pomieszczenie";
  }
}

function pomoc() {
  console.log('Dostepne: gra.start(), gra.pomoc(), gra.status(), gra.mapa(), gra.rozejrzyj(), gra.idz("prawo"), gra.idz("lewo"), gra.akcja("karta"), gra.akcja("bezpiecznik"), gra.akcja("napraw"), gra.akcja("wyjdz"), gra.eksportuj(), gra.importuj(tekst)');
  console.log('Udane ruchy i akcje kosztuja 1 energie. Odmowy i ruch w sciane nie zuzywaja energii. Odkrycie klucza przy drugiej probie pobrania karty nie kosztuje energii.');
}

function rozejrzyj() {
  if (stan.koniec) {
    console.log("Koniec gry.");
    return;
  }

  switch (nazwaPokoju(stan.pokoj)) {
    case "Zaplecze biblioteki":
      if (stan.okno) {
        console.log("Widzisz otwarte okno.");
      } else {
        console.log("Widzisz zamknięte okno.");
      }
      break;

    case "Biblioteka":
      if (stan.drzwi) {
        console.log("Drzwi do zaplecza są otwarte.");
      } else {
        console.log("Widzisz zamknięte drzwi do zaplecza.");
      }
      break;

    case "Recepcja":
      if (!stan.karta) {
        console.log("Karta leży na biurku.");
      } else {
        console.log("Biurko jest puste.");
      }
      break;

    case "Magazyn":
      if (!stan.bezpiecznik && !stan.zasilanie) {
        console.log("Bezpiecznik leży na półce.");
      } else {
        console.log("Półka jest pusta.");
      }
      break;

    case "Serwerownia":
      if (stan.zasilanie) {
        console.log("Zasilanie działa!");
      } else {
        console.log("Zasilanie nie działa.");
      }
      break;

    case "Wyjście":
      if (!stan.karta) {
        if (!stan.zasilanie) {
          console.log("Aby wyjść, potrzebujesz karty i zasilania.");
        } else {
          console.log("Aby wyjść, potrzebujesz karty.");
        }
      } else if (!stan.zasilanie) {
        console.log("Aby wyjść, potrzebujesz zasilania.");
      } else {
        console.log("Wyjście jest gotowe — użyj akcja('wyjdz').");
      }
      break;

    case "???":
      console.log("Nie wiesz jeszcze, co to za pomieszczenie.");
      break;

    default:
      console.log("Nie rozpoznajesz tego pomieszczenia.");
  }
}

function start() {
  stan = stanPoczatkowy();
  console.log(`UCIECZKA Z SERWEROWNI. Zasilanie awaryjne wystarczy na ${MAKS_ENERGIA} udanych ruchow lub akcji.`);
  pomoc();
  rozejrzyj();
}

function status() {
  console.log(`Pokoj: ${stan.pokoj} ${nazwaPokoju(stan.pokoj)}`);
  console.log(`Energia: ${stan.energia}`);
  console.log(`Karta: ${stan.karta ? "tak" : "nie"}`);
  console.log(`Bezpiecznik: ${stan.bezpiecznik ? "tak" : "nie"}`);
  console.log(`Zasilanie: ${stan.zasilanie ? "tak" : "nie"}`);

  if (stan.kluczOdkryty || stan.klucz) {
    if (stan.klucz) {
      console.log("Klucz: tak");
    } else {
      console.log("Klucz: do zebrania");
    }
  }

  if (stan.klucz || stan.drzwi) {
    if (stan.drzwi) {
      console.log("Drzwi: otwarte");
    } else if (stan.pokoj === 2) {
      console.log("Drzwi: zamkniete");
    } else {
      console.log("Drzwi: nieznane");
    }
  }

  if (stan.drzwi || stan.okno || stan.pokoj === 1) {
    if (stan.okno) {
      console.log("Okno: otwarte");
    } else {
      console.log("Okno: zamkniete");
    }
  }

  console.log(`Koniec: ${stan.koniec ? "tak" : "nie"}`);
  console.log(`Wygrana: ${stan.wygrana ? "tak" : "nie"}`);
}

function mapa() {
  for (let numer = 1; numer <= LICZBA_POKOI; numer++) {
    if (numer === stan.pokoj) {
      console.log(`${numer} ${nazwaPokoju(numer)} <-- jestes tutaj`);
    } else {
      console.log(`${numer} ${nazwaPokoju(numer)}`);
    }
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
    console.log("Pozostala energia: " + stan.energia);
  }

  return wynik;
}

// SEKCJA B — RUCH
function idz(kierunek) {
  return wykonajKomende(kierunek);
}

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co) {
  return wykonajKomende(co);
}

function eksportuj() {
  let pakiet = { wersja: WERSJA, stan: stan };
  return JSON.stringify(pakiet);
}

function importuj(tekst) {
  if (typeof tekst !== "string" || tekst.trim() === "") {
    console.log("Import anulowany albo brak tekstu. Stan bez zmian.");
    return false;
  }

  let kandydat;
  try {
    kandydat = JSON.parse(tekst);
  } catch (blad) {
    console.log("Niepoprawny JSON. Stan bez zmian.");
    return false;
  }

  if (kandydat === null || typeof kandydat !== "object" || Array.isArray(kandydat)) {
    console.log("Niepoprawny pakiet zapisu. Stan bez zmian.");
    return false;
  }
  if (kandydat.wersja !== WERSJA) {
    console.log("Nieobsługiwana wersja zapisu. Stan bez zmian.");
    return false;
  }
  if (kandydat.stan === null || typeof kandydat.stan !== "object" || Array.isArray(kandydat.stan)) {
    console.log("Brak poprawnego stanu w pakiecie. Stan bez zmian.");
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
    console.log("Niepoprawne dane lub niespójny stan zapisu. Stan bez zmian.");
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
