| Wymaganie | Stan początkowy | Działanie | Wynik oczekiwany | Wynik faktyczny | Kto sprawdził |
|---|---|---|---|---|---|
| Lewa granica mapy | Pokój 1, energia 5, drzwi otwarte | `gra.idz("lewo")` | Komunikat ściany, stan i energia bez zmian | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Przejście przez zamknięte drzwi | Pokój 2, energia 5, brak klucza/drzwi | `gra.idz("lewo")` | Przejście zablokowane, energia bez zmian | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Ponowne pobranie karty | Recepcja, karta już zabrana, wskazówka nieodkryta | `gra.akcja("karta")` | Wskazówka o kluczu, `kluczOdkryty = true`, energia bez zmian | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Zebranie klucza przed odkryciem | Recepcja, karta jeszcze nie zabrana | `gra.akcja("klucz")` | Odmowa, stan i energia bez zmian | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Zwykła droga ucieczki | Stan początkowy | Karta, ruch do magazynu, bezpiecznik, serwerownia, naprawa, wyjście, `wyjdz` | Wygrana po użyciu karty i przywróceniu zasilania | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Alternatywna droga ucieczki | Stan początkowy | Karta, ponowne `karta`, klucz, biblioteka, `otworz`, zaplecze, `otworz`, `wyjdz` | Okno otwarte i wygrana bez wymogu karty przy wyjściu ani zasilania | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Zwycięstwo przy ostatniej energii | Pokój 6, energia 1, karta i zasilanie, gra aktywna | `gra.akcja("wyjdz")` | Energia 0, `wygrana = true`, `koniec = true` | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Udana akcja na ostatniej energii bez zwycięstwa | Pokój 4, energia 1 | `gra.akcja("bezpiecznik")` | Energia 0, `koniec = true`, `wygrana = false` | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Ponowne pobranie już zabranej karty | Recepcja, karta zabrana, klucz odkryty | `gra.akcja("karta")` | Brak duplikatu i kosztu energii | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Sekret nie jest zdradzany w pomocy/statusie | Stan początkowy | `gra.start()`, `gra.status()` | Podstawowa pomoc nie wymienia klucza, drzwi ani okna | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Eksport i import | Dowolny poprawny postęp | `gra.eksportuj()`, reset, `gra.importuj(tekst)` | Pakiet `{ wersja: 1, stan: ... }` odtwarza wszystkie pola | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Uszkodzony JSON | Aktywna rozgrywka z zapisanym stanem kontrolnym | `gra.importuj("{")` | Odmowa i identyczny stan jak przed próbą | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Zła wersja lub niespójny typ/zależność | Aktywna rozgrywka z zapisanym stanem kontrolnym | Import pakietu z `wersja: 99` albo np. `zasilanie: true` i `bezpiecznik: true` | Odrzucenie całości, bez częściowej podmiany | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Pusty tekst i anulowanie okna | Aktywna rozgrywka z zapisanym stanem kontrolnym | `gra.importuj("")` lub `gra.importuj(null)` | Czytelna odmowa i stan bez zmian | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
| Brak mutacji wejścia silnika | Stan początkowy, energia 10 | `przejscie(stanPrzed, "prawo")` | Wynik ma nowy stan, wejściowy obiekt zostaje niezmieniony | Zgodnie z oczekiwaniem w próbie logiki | mat-mat-mat-o2 |
