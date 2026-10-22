// WSPOLNY KONTRAKT: nazwy zmiennych i funkcji uzgadnia caly zespol.

let stan = stanPoczatkowy();

// SEKCJA A — INFORMACJE I MAPA
function nazwaPokoju(numer) {
  switch(numer)
  {
    case 1:
      return "Recepcja";
    
    case 2:
      return "Magazyn";

    case 3:
      return "Serwerownia";

    case 4:
      return "Wyjscie";

    default:
      return "Nieznane pomieszczenie";
  }
  return "Nazwa do uzupelnienia";
}
function pomoc() {
  console.log('Dostepne: start(), pomoc(), status(), mapa(), rozejrzyj(), idz("prawo"), idz("lewo"), akcja("karta"), akcja("bezpiecznik"), akcja("napraw"), akcja("wyjdz")');
  console.log('idz() oraz akcja() ktore zakoncza sie powodzeniem zmniejszaja dostepna energie o 1, przy energii 0 gra zakonczy sie porazka, wyjatkiem jest jak ostatnim punktem energii otworzymy drzwi to wtedy mozna wyjsc mimo energii 0');
}

function rozejrzyj() {
  if (stan.koniec) {
    console.log("Koniec gry.");
    return;
  }
  
  switch(stan.pokoj)
  {
    case 1:
      if(!stan.karta) {
        console.log("Karta lezy na biurku");
      } else {
        console.log("Biurko jest puste");
      }
      break;
    
    case 2:
      if(!stan.bezpiecznik && !stan.zasilanie) {
        console.log("Bezpiecznik lezy na polce");
      } else {
        console.log("Polka jest pusta");
      }
      break;

    case 3:
      if(stan.zasilanie) {
        console.log("Zasilanie dziala!");
      } else {
        console.log("Zasilanie nie dziala");
      }
      break;

    case 4:
      if(!stan.karta || !stan.zasilanie) {
        if(!stan.karta) {
          if(!stan.zasilanie) {
            console.log("Aby wyjsc potrzebujesz karte i zasilanie");
          } else {
            console.log("Aby wyjsc potrzebujesz karte");
          }
        } else {
          console.log("Aby wyjsc potrzebujesz zasilanie");
        }
      }
      console.log("Drzwi otwarte mozesz wyjsc");
      break;
  }
}

// SEKCJA 0 — GOTOWY SILNIK NAUCZYCIELA
function start() {
  stan.wersja = WERSJA;
  stan.pokoj = 1;
  stan.energia = MAKS_ENERGIA;
  stan.karta = false;
  stan.bezpiecznik = false;
  stan.zasilanie = false;
  stan.koniec = false;
  stan.wygrana = false;
  console.log("UCIECZKA Z SERWEROWNI. Zasilanie awaryjne wystarczy na 10 tur.");
  pomoc();
  rozejrzyj();
}

function status() {
  console.log(`Pokoj: ${stan.pokoj} ${nazwaPokoju(stan.pokoj)}`);
  console.log(`Energia: ${stan.energia}`);
  console.log(`Karta: ${stan.karta ? "tak" : "nie"}`);
  console.log(`Bezpiecznik: ${stan.bezpiecznik ? "tak" : "nie"}`);
  console.log(`Zasilanie: ${stan.zasilanie ? "tak" : "nie"}`);
  console.log(`Koniec: ${stan.koniec ? "tak" : "nie"}`);
  console.log(`Wygrana: ${stan.wygrana ? "tak" : "nie"}`);
}

function mapa() {
  for(let numer = 1; numer <= 4; numer++)
  {
    if(numer == pokoj) {
      console.log(`${numer} ${nazwaPokoju(numer)} "<-- jestes tutaj"`);
    } else {
      console.log(`${numer} ${nazwaPokoju(numer)}`);
    }
  }
}

function zakonczTure() {
  stan.energia = stan.energia - 1;
  console.log("Pozostala energia: " + stan.energia);
  if(stan.wygrana) {
    console.log("WYGRANA! Uciekles z serwerowni. Mozesz wrocic do domu.");
  } else if(stan.energia === 0) {
    stan.koniec = true;
    console.log("PRZEGRANA. Zasilanie awaryjne padlo. Wpisz start().");
  }
}

// SEKCJA B — RUCH
function idz(kierunek) {

  if (stan.koniec) {
    console.log("Koniec gry.");
    return;
  }

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

  if (nastepnyPokoj > 4 || nastepnyPokoj < 1) {
    console.log(`W ${kierunek} jest sciana.`);
    return;
  }

  stan.pokoj = nastepnyPokoj;
  rozejrzyj();
  zakonczTure();
}

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co) {

  if (stan.koniec) {
    console.log("Koniec gry.");
    return;
  }

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

  zakonczTure();
}

function eksportuj() {
  const pakiet = {stan};
  const postep = JSON.stringify(pakiet);
  console.log(postep);
}

function importuj() {
  let tekst = prompt("Wklej zawartosc z postep.json");
  let kandydat;
  try {
    kandydat = JSON.parse(tekst);
  } catch {
    throw new Error("Niepoprawny JSON");
  }
  if(kandydat === null || 
    typeof kandydat !== "object" || 
    kandydat.stan === null ||
    typeof kandydat.stan !== "object" ||
    !Number.isInteger(kandydat.stan.wersja) || 
    kandydat.stan.wersja !== stan.wersja || 
    !Number.isInteger(kandydat.stan.pokoj) || 
    kandydat.stan.pokoj < 1 || 
    !Number.isInteger(kandydat.stan.energia) || 
    kandydat.stan.energia < 0 || 
    kandydat.stan.energia > MAKS_ENERGIA || 
    typeof kandydat.stan.karta !== "boolean" || 
    typeof kandydat.stan.bezpiecznik !== "boolean" || 
    typeof kandydat.stan.zasilanie !== "boolean" || 
    typeof kandydat.stan.koniec !== "boolean" || 
    typeof kandydat.stan.wygrana !== "boolean") {
    throw new Error("Zle dane");
  }
  Object.assign(stan, kandydat.stan);
  status();
  rozejrzyj();
}


window.gra={idz, akcja, status, mapa, start};
gra.start();
