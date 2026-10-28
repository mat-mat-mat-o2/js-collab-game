# Ucieczka z serwerowni

Gra działa w konsoli przeglądarki, bez instalacji, serwera, pakietów i `localStorage`.

## Uruchomienie

1. Otwórz plik `index.html` dwuklikiem w przeglądarce.
2. Otwórz narzędzia deweloperskie (`F12`) i wybierz kartę Console / Konsola.
3. Gra uruchomi się automatycznie. Listę poleceń wyświetla `gra.pomoc()`.

Przykłady:

```js
gra.status()
gra.mapa()
gra.idz("prawo")
gra.akcja("karta")
gra.akcja("bezpiecznik")
gra.akcja("napraw")
gra.akcja("wyjdz")
```

Udany ruch lub akcja kosztują jedną jednostkę energii. Odrzucone akcje i próba przejścia przez ścianę nie zużywają energii. Po zakończeniu gry można użyć `gra.start()`, aby rozpocząć od nowa.

## Eksport i import postępu

Eksport zwraca tekst JSON i nie tworzy pliku automatycznie:

```js
console.log(gra.eksportuj())
```

Skopiuj sam tekst JSON z konsoli do edytora tekstu i zapisz go np. jako `postep.json` na pendrivie. Nie kopiuj opisu wyniku konsoli ani dodatkowych znaków.

Aby wczytać zapis po odświeżeniu strony, otwórz `postep.json`, skopiuj całą jego zawartość i wykonaj w konsoli:

```js
gra.importuj(prompt("Wklej zawartość postep.json"))
```

Do okna wklej sam JSON, bez apostrofów i bez polecenia `gra.importuj`. Anulowanie okna lub pusty tekst nie zmieni bieżącej rozgrywki. Import sprawdza wersję formatu, typy, zakresy i zależności między polami; błędny zapis jest odrzucany w całości.

## Pliki

- `engine.js` — kolekcja pokoi, początkowy stan, walidator stanu i reguły gry.
- `app.js` — polecenia konsolowe, komunikaty, mapa oraz import i eksport.
- `01_BRIEF.md`, `02_TECH.md`, `03_PROWADZENIE.md` — opis zadania i wskazówki.
