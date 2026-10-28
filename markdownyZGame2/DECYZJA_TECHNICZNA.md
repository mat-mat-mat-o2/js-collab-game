# Decyzja techniczna zespołu

- **Problem:** reguły gry były wykonywane w `app.js`, przez co energia, walidacja ruchu, przedmioty i zakończenia nie miały jednego źródła prawdy.
- **Ograniczenie:** projekt uruchamia się po dwukliku w `index.html`; nie używamy modułów ES, serwera, pakietów ani `localStorage`.
- **Wariant A:** pozostawić reguły w aplikacji i dodać pojedyncze poprawki. Mniejsza zmiana od razu, ale reguły nadal byłyby rozproszone i trudniejsze do testowania.
- **Wariant B:** przenieść rozstrzyganie komend do `przejscie(stanPrzed, komenda)`, a w `app.js` pozostawić polecenia konsolowe i prezentację. Wymaga przeniesienia istniejących warunków, ale jedno miejsce odpowiada za koszty energii i wynik komendy.
- **Wybór:** wariant B, zgodny z `01_BRIEF.md` i kontraktem z `02_TECH.md`. Funkcja reguł nie mutuje argumentu i nie wypisuje komunikatów.
- **Rozszerzenie:** sekretna, alternatywna droga ucieczki przez zaplecze biblioteki i okno. Po zabraniu karty druga próba jej pobrania odkrywa klucz. Klucz otwiera drzwi do zaplecza, następnie okno; wygrana przez okno nie wymaga zasilania ani karty przy głównym wyjściu.
- **Wpływ na zapis:** stan zawiera pola `klucz`, `kluczOdkryty`, `drzwi` i `okno`; walidator sprawdza ich zależności. Pakiet zapisu ma wersję formatu na zewnątrz: `{ wersja: 1, stan: ... }`.
- **Kryterium sprawdzenia:** możliwe są obie drogi ucieczki, zamknięte drzwi blokują wejście na zaplecze, a niepoprawny import pozostawia poprzedni stan bez zmian.
