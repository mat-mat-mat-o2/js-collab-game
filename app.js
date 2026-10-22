// WSPOLNY KONTRAKT: nazwy zmiennych i funkcji uzgadnia caly zespol.

let stan = {
  pokoj: 1,
  energia: 10,
  karta: false,
  bezpiecznik: false,
  zasilanie: false,
  koniec: false,
  wygrana: false
};

// SEKCJA 0 — GOTOWY SILNIK NAUCZYCIELA
function start() {
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
  console.log(`Pokoj: ${stan.pokoj} ${nazwaPokoju(stan.pokoj)}`);
  console.log(`Energia: ${stan.energia}`);
  console.log(`Karta: ${stan.karta ? "tak" : "nie"}`);
  console.log(`Bezpiecznik: ${stan.bezpiecznik ? "tak" : "nie"}`);
  console.log(`Zasilanie: ${stan.zasilanie ? "tak" : "nie"}`);
  console.log(`Koniec: ${stan.koniec ? "tak" : "nie"}`);
  console.log(`Wygrana: ${stan.wygrana ? "tak" : "nie"}`);
  //console.log("Status do uzupelnienia");
}
function mapa() {
  // TODO A2: petla for od 1 do 4; nazwa i znacznik aktualnego pokoju.
  for(let numer = 1; numer <= 4; numer++)
  {
    console.log(`${numer} ${nazwaPokoju(numer)} ${(numer == stan.pokoj) ? "<-- jestes tutaj":""}`);
  }
  //console.log("Mapa do uzupelnienia");
}
function rozejrzyj() {
  // TODO A4: switch(pokoj); opis zgodny ze stanem przedmiotow.
  switch(stan.pokoj)
  {
    case 1:
      console.log(!stan.karta ? "Karta lezy na biurku" : "Biurko jest puste");
      break;
    
    case 2:
      console.log((!stan.bezpiecznik && !stan.zasilanie) ? "Bezpiecznik lezy na polce" : "Polka jest pusta");
      break;

    case 3:
      console.log(stan.zasilanie ? "Zasilanie dziala!" : "Zasilanie nie dziala");
      break;

    case 4:
      if(!stan.karta || !stan.zasilanie)
      {
        console.log(`Aby wyjsc potrzebujesz ${!stan.karta ? (!stan.zasilanie ? "karte i zasilanie" : "karte") : "zasilanie"}`);
      }
      break;
  }
  //console.log("Opis pokoju do uzupelnienia");
}

start();
