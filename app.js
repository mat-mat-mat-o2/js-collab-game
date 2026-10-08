// WSPOLNY KONTRAKT: nazwy zmiennych i funkcji uzgadnia caly zespol.
const MAKS_ENERGIA = 10;
let pokoj = 1;
let energia = MAKS_ENERGIA;
let karta = false;
let bezpiecznik = false;
let zasilanie = false;
let koniec = false;
let wygrana = false;

// SEKCJA 0 — GOTOWY SILNIK NAUCZYCIELA
function start() {
  pokoj = 1;
  energia = MAKS_ENERGIA;
  karta = false;
  bezpiecznik = false;
  zasilanie = false;
  koniec = false;
  wygrana = false;
  console.log("UCIECZKA Z SERWEROWNI. Zasilanie awaryjne wystarczy na 10 tur.");
  pomoc();
  rozejrzyj();
}

function zakonczTure() {
  energia = energia - 1;
  console.log("Pozostala energia: " + energia);
  if (wygrana) {
    console.log("WYGRANA! Drzwi otwarte. Mozesz wrocic do domu.");
  } else if (energia === 0) {
    koniec = true;
    console.log("PRZEGRANA. Zasilanie awaryjne padlo. Wpisz start().");
  }
}

// SEKCJA A — INFORMACJE I MAPA
function nazwaPokoju(numer) {
  // TODO A1: switch; zwroc nazwe pokoju jako tekst.
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
  // TODO A5: dopisz pozostale kierunki i akcje oraz zasade kosztu.
  console.log('idz() oraz akcja() ktore zakoncza sie powodzeniem zmniejszaja dostepna energie o 1, przy energii 0 gra zakonczy sie porazka, wyjatkiem jest jak ostatnim punktem energii otworzymy drzwi to wtedy mozna wyjsc mimo energii 0');
}
function status() {
  // TODO A3: wypisz pokoj, energie, przedmioty, zasilanie i stan gry.
  console.log(`Pokoj: ${pokoj} ${nazwaPokoju(pokoj)}`);
  console.log(`Energia: ${energia}`);
  console.log(`Karta: ${karta ? "tak" : "nie"}`);
  console.log(`Bezpiecznik: ${bezpiecznik ? "tak" : "nie"}`);
  console.log(`Zasilanie: ${zasilanie ? "tak" : "nie"}`);
  console.log(`Koniec: ${koniec ? "tak" : "nie"}`);
  console.log(`Wygrana: ${wygrana ? "tak" : "nie"}`);
  //console.log("Status do uzupelnienia");
}
function mapa() {
  // TODO A2: petla for od 1 do 4; nazwa i znacznik aktualnego pokoju.
  for(let numer = 1; numer <= 4; numer++)
  {
    console.log(`${numer} ${nazwaPokoju(numer)} ${(numer == pokoj) ? "<-- jestes tutaj":""}`);
  }
  //console.log("Mapa do uzupelnienia");
}
function rozejrzyj() {
  // TODO A4: switch(pokoj); opis zgodny ze stanem przedmiotow.
  switch(pokoj)
  {
    case 1:
      console.log(!karta ? "Karta lezy na biurku" : "Biurko jest puste");
      break;
    
    case 2:
      console.log((!bezpiecznik && !zasilanie) ? "Bezpiecznik lezy na polce" : "Polka jest pusta");
      break;

    case 3:
      console.log(zasilanie ? "Zasilanie dziala!" : "Zasilanie nie dziala");
      break;

    case 4:
      console.log(`Aby wyjsc potrzebujesz ${!karta ? (!zasilanie ? "karte i zasilanie" : "karte") : (!zasilanie ? "zasilanie" : "mozesz wyjsc")}`);
      break;
  }
  //console.log("Opis pokoju do uzupelnienia");
}

// SEKCJA B — RUCH
function idz(kierunek) {
  // TODO B1: zablokuj ruch po koncu gry.
  // TODO B2: switch kierunku; oblicz kandydat na nowy pokoj.
  // TODO B3: odrzuc pokoj poza 1..4 i nieznany kierunek bez kosztu.
  // TODO B4: zapisz poprawny pokoj, rozejrzyj(), zakonczTure().
  console.log("Ruch do uzupelnienia");
}

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co) {
  // TODO C1: zablokuj akcje po koncu gry.
  if (koniec) {
    console.log("Koniec gry");
    return;
  }
  // TODO C2: switch: karta / bezpiecznik / napraw / wyjdz.
  // TODO C2: przed zmiana sprawdz pokoj i wymagany stan.
  switch(co)
  {
    case "karta":
      if (pokoj !== 1 || karta) {
        console.log("Tutaj nie ma karty do zabrania.");
        return;
      }
      karta = true;
      console.log("Zabierasz karte.");
      break;
    case "bezpiecznik":
      if (pokoj !== 2 || bezpiecznik) {
        console.log("Tutaj nie ma bezpiecznika do zabrania.");
        return;
      } else if (zasilanie){
        console.log("Nie potrzebujesz juz bezpiecznika.");
        return;
      }
      bezpiecznik = true;
      console.log("Zabierasz bezpiecznik.");
      break;
    case "napraw":
      if (pokoj !== 3 || zasilanie) {
        console.log("Tutaj nie ma nic do naprawienia.");
        return;
      } else if (!bezpiecznik) {
        console.log("Nie masz bezpiecznika.");
        return;
      }
      bezpiecznik = false;
      zasilanie = true;
      console.log("Naprawiasz zasilanie.");
      break;
    case "wyjdz":
      if (pokoj !== 4) {
        console.log("Nie ma dokad wyjsc.");
        return;
      } else if(!karta) {
        console.log("Nie masz karty.");
        return;
      } else if (!zasilanie) {
        console.log("Nie ma zasilania.");
        return;
      }
      wygrana = true;
      koniec = true;
      console.log("Zabierasz karte.");
      break;
    default:
      console.log("Bledna akcja.");
      return;
  }
  // TODO C3: przy odrzuceniu return; przy sukcesie break.
  // TODO C3: po switch jedno zakonczTure().
  zakonczTure();
  // TODO C4: wygrana i koniec ustawione przed rozliczeniem tury!
  //console.log("Akcje do uzupelnienia");
}

start();
