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
    if (pokoj.id === numer) {
      return pokoj;
    }
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

  if (typeof wartosc.karta !== "boolean") {
    return false;
  }
  if (typeof wartosc.bezpiecznik !== "boolean") {
    return false;
  }
  if (typeof wartosc.klucz !== "boolean") {
    return false;
  }
  if (typeof wartosc.kluczOdkryty !== "boolean") {
    return false;
  }
  if (typeof wartosc.okno !== "boolean") {
    return false;
  }
  if (typeof wartosc.drzwi !== "boolean") {
    return false;
  }
  if (typeof wartosc.zasilanie !== "boolean") {
    return false;
  }
  if (typeof wartosc.koniec !== "boolean") {
    return false;
  }
  if (typeof wartosc.wygrana !== "boolean") {
    return false;
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
    let wyjscieGlowne = wartosc.pokoj === 6 && wartosc.karta && wartosc.zasilanie;
    let wyjsciePrzezOkno = wartosc.pokoj === 1 && wartosc.okno;

    if (!wartosc.koniec) {
      return false;
    }
    if (!wyjscieGlowne && !wyjsciePrzezOkno) {
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
    return { stan: stanPrzed, komunikat: "Gra jest zakończona." };
  }

  if (!czyStan(stanPrzed)) {
    return { stan: stanPrzed, komunikat: "Nieprawidłowy stan gry." };
  }

  let zmiany = {};
  let komunikat = "";

  if (komenda === "lewo" || komenda === "prawo") {
    let krok;
    if (komenda === "prawo") {
      krok = 1;
    } else {
      krok = -1;
    }

    let numerDocelowy = stanPrzed.pokoj + krok;
    let pokojDocelowy = znajdzPokoj(numerDocelowy);

    if (pokojDocelowy === undefined) {
      return { stan: stanPrzed, komunikat: "Ściana. Stan bez zmian." };
    }

    if (stanPrzed.pokoj === 2 && komenda === "lewo" && !stanPrzed.drzwi) {
      return { stan: stanPrzed, komunikat: "Przejście jest zablokowane." };
    }

    zmiany.pokoj = numerDocelowy;
    komunikat = "Przechodzisz do pokoju " + numerDocelowy + ".";
  } else {
    switch (komenda) {
      case "karta":
        if (stanPrzed.pokoj !== 3) {
          return { stan: stanPrzed, komunikat: "Tutaj nie ma karty do zabrania." };
        }

        if (!stanPrzed.karta) {
          zmiany.karta = true;
          komunikat = "Zabierasz kartę.";
        } else if (!stanPrzed.kluczOdkryty && !stanPrzed.klucz) {
          let nowyStan = { ...stanPrzed, kluczOdkryty: true };
          return {
            stan: nowyStan,
            komunikat: "Karty już nie ma, ale dostrzegasz klucz na oddalonej szafce. Użyj akcja('klucz'), aby go zebrać."
          };
        } else if (stanPrzed.kluczOdkryty && !stanPrzed.klucz) {
          return {
            stan: stanPrzed,
            komunikat: "Karty już nie ma. Klucz leży na oddalonej szafce; użyj akcja('klucz')."
          };
        } else {
          return { stan: stanPrzed, komunikat: "Karty już nie ma." };
        }
        break;

      case "klucz":
        if (stanPrzed.pokoj !== 3 || stanPrzed.klucz || !stanPrzed.karta || !stanPrzed.kluczOdkryty) {
          return { stan: stanPrzed, komunikat: "Nie widzisz tu klucza do zebrania." };
        }

        zmiany.klucz = true;
        komunikat = "Zabierasz klucz. Może pasować do drzwi w bibliotece; spróbuj tam akcja('otworz').";
        break;

      case "bezpiecznik":
        if (stanPrzed.pokoj !== 4 || stanPrzed.bezpiecznik || stanPrzed.zasilanie) {
          return { stan: stanPrzed, komunikat: "Tutaj nie ma bezpiecznika do zabrania." };
        }

        zmiany.bezpiecznik = true;
        komunikat = "Zabierasz bezpiecznik.";
        break;

      case "napraw":
        if (stanPrzed.pokoj !== 5 || stanPrzed.zasilanie) {
          return { stan: stanPrzed, komunikat: "Tutaj nie ma nic do naprawienia." };
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
          if (stanPrzed.drzwi) {
            return { stan: stanPrzed, komunikat: "Drzwi do zaplecza są już otwarte." };
          }
          if (!stanPrzed.klucz) {
            if (stanPrzed.kluczOdkryty) {
              return { stan: stanPrzed, komunikat: "Nie masz klucza do tych drzwi." };
            } else {
              return { stan: stanPrzed, komunikat: "Nie ma nic do otwarcia." };
            }
          }

          zmiany.drzwi = true;
          komunikat = "Otwierasz drzwi do zaplecza biblioteki.";
        } else if (stanPrzed.pokoj === 1) {
          if (stanPrzed.okno) {
            return { stan: stanPrzed, komunikat: "Okno jest już otwarte." };
          }
          if (!stanPrzed.klucz) {
            return { stan: stanPrzed, komunikat: "Nie masz klucza." };
          }

          zmiany.okno = true;
          komunikat = "Otwierasz okno. Możesz spróbować uciec tą drogą.";
        } else {
          return { stan: stanPrzed, komunikat: "Nie ma nic do otwarcia." };
        }
        break;

      case "wyjdz":
        if (stanPrzed.pokoj === 6) {
          if (!stanPrzed.karta) {
            return { stan: stanPrzed, komunikat: "Nie masz karty." };
          }
          if (!stanPrzed.zasilanie) {
            return { stan: stanPrzed, komunikat: "Nie ma zasilania." };
          }

          zmiany.wygrana = true;
          komunikat = "Otwierasz wyjście i uciekasz z serwerowni.";
        } else if (stanPrzed.pokoj === 1) {
          if (!stanPrzed.okno) {
            return { stan: stanPrzed, komunikat: "Okno jest zamknięte." };
          }

          zmiany.wygrana = true;
          komunikat = "Uciekasz przez okno, omijając główne wyjście.";
        } else {
          return { stan: stanPrzed, komunikat: "Nie ma dokąd wyjść." };
        }
        break;

      default:
        return { stan: stanPrzed, komunikat: 'Nieznana komenda. Sprawdź gra.pomoc().' };
    }
  }

  let nowaEnergia = stanPrzed.energia - 1;
  let stanPo = {
    ...stanPrzed,
    ...zmiany,
    energia: nowaEnergia
  };

  if (stanPo.wygrana) {
    stanPo.koniec = true;
  } else if (nowaEnergia === 0) {
    stanPo.koniec = true;
  }

  if (stanPo.wygrana) {
    komunikat = komunikat + " WYGRANA! Udało ci się uciec.";
  } else if (stanPo.koniec) {
    komunikat = komunikat + " Brak energii. Koniec gry — porażka.";
  }

  return { stan: stanPo, komunikat: komunikat };
}
