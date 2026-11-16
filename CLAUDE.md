# Projekt-Tagebuch: Unser Stammbaum

## 1. Worum geht es?

Ein **privater Familien-Stammbaum** im Browser (auch am Handy). Reines Familienprojekt:
keine App für Dritte, keine Stammbäume über fremde Personen.

- **Online:** über GitHub Pages (`https://marchens1977.github.io/Stammbaum/`), Stand von `main`.
- **Repository:** `marchens1977/Stammbaum`

### Technischer Aufbau
- `index.html` – die ganze App in einer Datei (Aussehen + Logik). Oben im Skript: Einstellungen
  (Kartengröße, Anzahl Generationen, Schutzgrenze `PROTECT_YEARS`).
- Daten liegen im Browser (localStorage, Schlüssel `stammbaum-daten-v1`), **nie im Repository**.
- Sicherung: JSON-Datei; Austausch: GEDCOM 5.5.1 (Export + Import).
- Datumsfelder bleiben Freitext (für „um 1890“ usw.), werden aber vereinheitlicht (`normDate`): TT.MM.JJJJ, MM.JJJJ, JJJJ, „um/vor/nach JJJJ“.

## 2. Wichtige Regeln und Entscheidungen
- **Datenschutz:** Keine Familiendaten, Sicherungen oder GEDCOM-Dateien ins Repository hochladen.
- **Schutz Lebender:** Eine Person gilt als geschützt, wenn sie „lebt“, jünger als 100 Jahre ist oder
  das unklar ist. Für geschützte Personen gibt es **keine** Online-Recherche (auch nicht in Stufe 2/3).
- Gestrichelte Platzhalter („＋ Vater/Mutter/Partner/Kind“) nur direkt an der Person in der Mitte, **nicht für Geschwister** (Wunsch des Nutzers: nicht zu voll).
- KI-Funde sind später nur **Vorschläge mit Quelle**; erst nach Bestätigung durch den Nutzer übernehmen.
- Keine automatische Suche auf Ancestry/MyHeritage (Nutzungsregeln verbieten das).

## 3. Verlauf
| Datum | Was |
|---|---|
| 2026-11-16 | Stufe 1: Erfassen, Baum-Ansicht, Detailansicht, Liste, Schutz Lebender, Sicherung, GEDCOM, Beispiel-Familie |
| 2026-11-16 | Einfachere Eingabe: Kalender-Knopf + Freitext-Datum mit Erkennung (z. B. 17061880, „17. Juni 1880“, „ca 1890“), Vorschläge für Namen/Orte/Berufe, Tipp-Knöpfe für Geschlecht und „Lebt noch?“, „Mehr Angaben“ eingeklappt, „Speichern + noch ein Kind“, sinnvolle Vorbelegungen |
| 2026-11-16 | Spracheingabe „🎤 Person einsprechen“: Chrome-Spracherkennung (de-DE) + Zerlegung des Satzes (`parseSpoken`) in Name, Geburtsname, Geburt, Tod, Orte, Beruf, „lebt noch“; Text auch tipp-/korrigierbar |
| 2026-11-16 | Spracheingabe nutzt bekannte Schreibweisen: gleich klingende Namen/Orte/Berufe (Kölner Phonetik + einfache Varianten wie Carl/Karl) werden an den Stammbaum angepasst (z. B. Mayr → Maier); Korrekturen werden angezeigt |
| 2026-11-16 | Geschwister der Hauptperson werden im Baum links daneben gezeigt (mit Eltern verbunden); Knopf „＋ Bruder / Schwester“ in der Detailansicht (kein gestrichelter Platzhalter – auf Wunsch entfernt) (übernimmt die Eltern automatisch; ohne Eltern Hinweis, erst Vater/Mutter einzutragen) |

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
