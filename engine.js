const MAKS_ENERGIA = 10;
const WERSJA = 1;
const START_POKOJ = 3;

const pokoje = [
  { id: 1, nazwa: "Zaplecze Biblioteki" },
  { id: 2, nazwa: "Biblioteka" },
  { id: 3, nazwa: "Recepcja" },
  { id: 4, nazwa: "Magazyn" },
  { id: 5, nazwa: "Serwerownia" },
  { id: 6, nazwa: "Wyjście" }
];

const LICZBA_POKOI = pokoje.length;

function znajdzPokoj(numer) {
  for (let pokoj of pokoje) {
    if (pokoj.id === numer) return pokoj;
  }
  return undefined;
}

function stanPoczatkowy() {
  return {
    pokoj: START_POKOJ,
    energia: MAKS_ENERGIA,
    karta: false,
    bezpiecznik: false,
    klucz: false,
    kluczOdkryty: false,
    okno: false,
    drzwi: false,
    zasilanie: false,
    koniec: false,
    wygrana: false
  };
}

function czyStan(wartosc) {
  if (wartosc === null || typeof wartosc !== "object" || Array.isArray(wartosc)) {
    return false;
  }
  if (!Number.isInteger(wartosc.pokoj) || !znajdzPokoj(wartosc.pokoj)) {
    return false;
  }
  if (!Number.isInteger(wartosc.energia) || wartosc.energia < 0 || wartosc.energia > MAKS_ENERGIA) {
    return false;
  }

  const pola = ["karta", "bezpiecznik", "klucz", "kluczOdkryty", "okno", "drzwi", "zasilanie", "koniec", "wygrana"];
  for (let pole of pola) {
    if (typeof wartosc[pole] !== "boolean") {
    return false;
  }
  }

  if (wartosc.bezpiecznik && wartosc.zasilanie) {
    return false;
  }
  if (wartosc.kluczOdkryty && !wartosc.karta) {
    return false;
  }
  if (wartosc.klucz && (!wartosc.karta || !wartosc.kluczOdkryty)) {
    return false;
  }
  if (wartosc.drzwi && !wartosc.klucz) {
    return false;
  }
  if (wartosc.okno && !wartosc.drzwi) {
    return false;
  }
  if (wartosc.pokoj === 1 && !wartosc.drzwi) {
    return false;
  }

  if (wartosc.wygrana) {
    const wyjscieGlowne = wartosc.pokoj === 6 && wartosc.karta && wartosc.zasilanie;
    const wyjsciePrzezOkno = wartosc.pokoj === 1 && wartosc.okno;
    if (!wartosc.koniec || (!wyjscieGlowne && !wyjsciePrzezOkno)) {
      return false;
    }
  }

  if (wartosc.koniec !== (wartosc.wygrana || wartosc.energia === 0)) {
    return false;
  }
  return true;
}

function przejscie(stanPrzed, komenda) {
  if (stanPrzed !== null && typeof stanPrzed === "object" && stanPrzed.koniec) {
    return { stan: stanPrzed, komunikat: "Gra już się skończyła." };
  }

  if (!czyStan(stanPrzed)) {
    return { stan: stanPrzed, komunikat: "Błędny stan gry." };
  }

  let zmiany = {};
  let komunikat = "";

  if (komenda === "lewo" || komenda === "prawo") {
    let krok = komenda === "prawo" ? 1 : -1;
    let numerDocelowy = stanPrzed.pokoj + krok;
    let pokojDocelowy = znajdzPokoj(numerDocelowy);

    if (pokojDocelowy === undefined) {
      return { stan: stanPrzed, komunikat: "Ściana." };
    }
    if (stanPrzed.pokoj === 2 && komenda === "lewo" && !stanPrzed.drzwi) {
      return { stan: stanPrzed, komunikat: "Drzwi są zamknięte." };
    }

    zmiany.pokoj = numerDocelowy;
    komunikat = "Przechodzisz do pokoju " + numerDocelowy + ".";
  } else {
    switch (komenda) {
      case "karta":
        if (stanPrzed.pokoj !== 3) {
          return { stan: stanPrzed, komunikat: "Tutaj nie ma karty." };
        }
        if (!stanPrzed.karta) {
          zmiany.karta = true;
          komunikat = "Zabierasz kartę.";
        } else if (!stanPrzed.kluczOdkryty && !stanPrzed.klucz) {
          let nowyStan = { ...stanPrzed, kluczOdkryty: true };
          return { stan: nowyStan, komunikat: "Nie ma już karty. Widzisz klucz. Użyj akcja('klucz')." };
        } else if (stanPrzed.kluczOdkryty && !stanPrzed.klucz) {
          return { stan: stanPrzed, komunikat: "Klucz jest na szafce. Użyj akcja('klucz')." };
        } else {
          return { stan: stanPrzed, komunikat: "Nie ma już karty." };
        }
        break;

      case "klucz":
        if (stanPrzed.pokoj !== 3 || stanPrzed.klucz || !stanPrzed.karta || !stanPrzed.kluczOdkryty) {
          return { stan: stanPrzed, komunikat: "Nie ma tu klucza." };
        }
        zmiany.klucz = true;
        komunikat = "Zabierasz klucz. Otworzysz nim drzwi w bibliotece.";
        break;

      case "bezpiecznik":
        if (stanPrzed.pokoj !== 4 || stanPrzed.bezpiecznik || stanPrzed.zasilanie) {
          return { stan: stanPrzed, komunikat: "Nie ma tu bezpiecznika." };
        }
        zmiany.bezpiecznik = true;
        komunikat = "Zabierasz bezpiecznik.";
        break;

      case "napraw":
        if (stanPrzed.pokoj !== 5 || stanPrzed.zasilanie) {
          return { stan: stanPrzed, komunikat: "Nie ma tu nic do naprawy." };
        }
        if (!stanPrzed.bezpiecznik) {
          return { stan: stanPrzed, komunikat: "Nie masz bezpiecznika." };
        }
        zmiany.bezpiecznik = false;
        zmiany.zasilanie = true;
        komunikat = "Naprawiasz zasilanie.";
        break;

      case "otworz":
        if (stanPrzed.pokoj === 2) {
          if (stanPrzed.drzwi) return { stan: stanPrzed, komunikat: "Drzwi są już otwarte." };
          if (!stanPrzed.klucz) {
            return { stan: stanPrzed, komunikat: stanPrzed.kluczOdkryty ? "Nie masz klucza." : "Nie ma tu nic do otwarcia." };
          }
          zmiany.drzwi = true;
          komunikat = "Otwierasz drzwi do zaplecza.";
        } else if (stanPrzed.pokoj === 1) {
          if (stanPrzed.okno) return { stan: stanPrzed, komunikat: "Okno jest już otwarte." };
          if (!stanPrzed.klucz) return { stan: stanPrzed, komunikat: "Nie masz klucza." };
          zmiany.okno = true;
          komunikat = "Otwierasz okno.";
        } else {
          return { stan: stanPrzed, komunikat: "Nie ma tu nic do otwarcia." };
        }
        break;

      case "wyjdz":
        if (stanPrzed.pokoj === 6) {
          if (!stanPrzed.karta) return { stan: stanPrzed, komunikat: "Nie masz karty." };
          if (!stanPrzed.zasilanie) return { stan: stanPrzed, komunikat: "Nie ma zasilania." };
          zmiany.wygrana = true;
          komunikat = "Otwierasz wyjście i uciekasz.";
        } else if (stanPrzed.pokoj === 1) {
          if (!stanPrzed.okno) return { stan: stanPrzed, komunikat: "Okno jest zamknięte." };
          zmiany.wygrana = true;
          komunikat = "Uciekasz przez okno.";
        } else {
          return { stan: stanPrzed, komunikat: "Nie możesz stąd wyjść." };
        }
        break;

      default:
        return { stan: stanPrzed, komunikat: "Nieznana komenda. Wpisz gra.pomoc()." };
    }
  }

  let nowaEnergia = stanPrzed.energia - 1;
  let stanPo = { ...stanPrzed, ...zmiany, energia: nowaEnergia };

  if (stanPo.wygrana || nowaEnergia === 0) stanPo.koniec = true;

  if (stanPo.wygrana) {
    komunikat += " Wygrana!";
  } else if (stanPo.koniec) {
    komunikat += " Brak energii. Koniec gry.";
  }

  return { stan: stanPo, komunikat: komunikat };
}
