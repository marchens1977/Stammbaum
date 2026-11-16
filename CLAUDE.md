# Projekt-Tagebuch: Unser Stammbaum

## 1. Worum geht es?

Ein **privater Familien-Stammbaum** im Browser (auch am Handy). Reines Familienprojekt:
keine App für Dritte, keine Stammbäume über fremde Personen.

- **Online:** über GitHub Pages (`https://marchens1977.github.io/stammbaum/`), Stand von `main`.
- **Repository:** `marchens1977/stammbaum`

### Technischer Aufbau
- `index.html` – die ganze App in einer Datei (Aussehen + Logik). Oben im Skript: Einstellungen
  (Kartengröße, Anzahl Generationen, Schutzgrenze `PROTECT_YEARS`).
- Daten liegen im Browser (localStorage, Schlüssel `stammbaum-daten-v1`), **nie im Repository**.
- Sicherung: JSON-Datei; Austausch: GEDCOM 5.5.1 (Export + Import).

## 2. Wichtige Regeln und Entscheidungen
- **Datenschutz:** Keine Familiendaten, Sicherungen oder GEDCOM-Dateien ins Repository hochladen.
- **Schutz Lebender:** Eine Person gilt als geschützt, wenn sie „lebt“, jünger als 100 Jahre ist oder
  das unklar ist. Für geschützte Personen gibt es **keine** Online-Recherche (auch nicht in Stufe 2/3).
- KI-Funde sind später nur **Vorschläge mit Quelle**; erst nach Bestätigung durch den Nutzer übernehmen.
- Keine automatische Suche auf Ancestry/MyHeritage (Nutzungsregeln verbieten das).

## 3. Verlauf
| Datum | Was |
|---|---|
| 2026-11-16 | Stufe 1: Erfassen, Baum-Ansicht, Detailansicht, Liste, Schutz Lebender, Sicherung, GEDCOM, Beispiel-Familie |

## 4. Nächste Schritte
- **Stufe 2:** Recherche-Knopf ohne Kosten (öffnet FamilySearch, Matricula, CompGen, Volksbund usw.
  mit vorausgefülltem Namen; erzeugt fertigen Text für die Claude-App) – nur für ungeschützte Personen.
- **Stufe 3:** Echte KI-Recherche (Claude-API mit Websuche), Schlüssel nie in der öffentlichen Seite –
  über Raspberry Pi oder nur lokal eingegeben.
- Weitere Ideen: Fotos größer ansehen, Ereignisse (Hochzeit, Umzug), Druckansicht.

## 5. Zusammenarbeit
- Nutzer ist **Programmier-Laie**: einfaches Deutsch, Fachbegriffe kurz erklären.
- Kleine, nummerierte Schritte; klar sagen, was Claude übernimmt und was der Nutzer tun muss.
- Vor dem Hochladen testen und ein Vorschaubild zeigen.
- Hardware: Samsung-Smartphone (Chrome) und Raspberry Pi 400.

## 6. Modell-Hinweis
Wenn du nicht auf Opus läufst und eine Aufgabe abgeschlossen ist, erinnere am Ende:
„Tipp: Du kannst jetzt mit /model claude-opus-5-5 zurückstellen.“
