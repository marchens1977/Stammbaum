# Projekt-Tagebuch: Unser Stammbaum

## 1. Worum geht es?

Ein **privater Familien-Stammbaum** im Browser (auch am Handy). Reines Familienprojekt:
keine App für Dritte, keine Stammbäume über fremde Personen.

- **Online:** über GitHub Pages (`https://marchens1977.github.io/Stammbaum/`), Stand von `main`.
- **Repository:** `marchens1977/Stammbaum`

### Technischer Aufbau
- `index.html` – die ganze App in einer Datei (Aussehen + Logik). Dazu `manifest.json` + `sw.js` + `icon-192/512.png` (installierbar, Teilen-Ziel). Oben im Skript: Einstellungen
  (Kartengröße, Anzahl Generationen, Schutzgrenze `PROTECT_YEARS`).
- Daten liegen im Browser (localStorage, Schlüssel `stammbaum-daten-v1`), **nie im Repository**.
- Sicherung: JSON-Datei; Austausch: GEDCOM 5.5.1 (Export + Import).
- Datumsfelder bleiben Freitext (für „um 1890“ usw.), werden aber vereinheitlicht (`normDate`): TT.MM.JJJJ, MM.JJJJ, JJJJ, „um/vor/nach JJJJ“.

## 2. Wichtige Regeln und Entscheidungen
- **Datenschutz:** Keine Familiendaten, Sicherungen oder GEDCOM-Dateien ins Repository hochladen.
- **Schutz Lebender (Entscheidung des Nutzers, 2026-11-16):**
  - **Verstorbene** (Status „verstorben“, Sterbedatum/-ort oder vor mehr als 110 Jahren geboren – `PROTECT_YEARS`):
    volle Recherche (Quellenliste + Text für Claude), egal wann geboren.
  - **Lebende oder unklar:** geschützt 🔒 – keine KI-Recherche, keine Ahnenforschungs-Seiten, nur ein normaler
    Knopf „Bei Google suchen“ (Name + Geburtsort). Im Claude-Text werden geschützte Verwandte ohne Angaben genannt.
  - Begründung: KI würde zu Lebenden gezielt Profile zusammentragen; Daten Lebender sollen nicht an KI-Dienste gehen.
  - Für schnelles Füllen ohne Tippen: **„📋 Text einfügen“** (Text aus Google-Treffer, WhatsApp-Antwort, Todesanzeige
    wird lokal im Handy zerlegt – nichts geht an eine KI). Der Nutzer wählt selbst, was er übernimmt.
  - **Keine Funktion zum Anschreiben von Familienmitgliedern** (Nutzer möchte niemanden behelligen – „📨 Fragen“ wieder entfernt).
- **Keine gestrichelten Platzhalter im Baum** (Wunsch des Nutzers). Verwandte werden hinzugefügt, indem man die Person antippt und in der Detailansicht „＋ Vater/Mutter/Partner/Kind/Bruder/Schwester“ wählt.
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
| 2026-11-16 | Alle gestrichelten Platzhalter aus dem Baum entfernt; Hinzufügen nur noch über die Detailansicht |
| 2026-11-16 | **Stufe 2:** Knopf „🔍 Recherche starten“ (nur ungeschützte Personen): fertiger Text für die Claude-App (kopieren + claude.ai öffnen; geschützte Verwandte ohne Angaben), Quellenliste mit vorausgefüllter Suche (passend nach Zeit/Ort sortiert, Name wird zusätzlich kopiert), „Fund eintragen“ mit Quelle und Sicherheit (sicher/wahrscheinlich/unsicher) |
| 2026-11-16 | Schutzregel geändert: alle Verstorbenen recherchierbar; Lebende/unklar nur „Bei Google suchen“ |
| 2026-11-16 | „📋 Text einfügen“ im Formular (liest Zwischenablage; erkennt auch *, †, geb. am, Geburtsdatum:/Geburtsort:) |
| 2026-11-16 | „📨 Fragen (WhatsApp/SMS)“ auf Wunsch wieder entfernt |
| 2026-11-16 | **Claude-Antwort übernehmen:** Claude-Text verlangt am Ende einen Block `### STAMMBAUM-DATEN … ### ENDE` (GEBURT/TOD/BERUF/GEBURTSNAME/VATER/MUTTER/EHEPARTNER/KIND/GESCHWISTER: Wert \| Sicherheit \| Quelle). „📥 Claude-Antwort einfügen“ zeigt Vorschläge zum Abhaken (vorhandene Verwandte werden per Kölner Phonetik erkannt und ergänzt, sonst neu angelegt + verknüpft; Quelle wird zu den Quellen geschrieben). Vorab angehakt: leere Felder bzw. genauere Angaben, nicht „unsicher“. |
| 2026-11-16 | **GEDCOM hinzufügen statt ersetzen:** Doppelte (gleicher Name + gleiches Geburtsjahr) werden zusammengeführt, nur leere Felder ergänzt (`mergePersons`) |
| 2026-11-16 | **Fund übernehmen + Teilen:** App ist installierbar (`manifest.json`, `sw.js` = immer zuerst aus dem Netz, Icons). Über Chrome „Teilen → Stammbaum“ (Web Share Target, Parameter share_title/share_text/share_url) kommt Text/Link in die App → Person wählen (passende Namen oben) → „📥 Fund übernehmen“: Daten im Text erkennen → Vorschläge zum Abhaken; Text als Notiz, Link als Quelle; bei anderem Namen Warnung und nichts vorab angehakt. Bei Verstorbenen zusätzlich „🤖 von Claude prüfen lassen“ (Text + Fund → STAMMBAUM-DATEN). Auch bei Lebenden verfügbar (nur lokal, ohne Claude). |
| 2026-11-16 | Fehler behoben: Antippen einer Person öffnete manchmal Vater/Mutter (der vom Handy nachgeschickte „Klick“ landete in der gerade geöffneten Detailansicht auf dem Eltern-Knopf) – Klicks 600 ms nach einem Baum-Tipp werden ignoriert (`lastTreeTap`) |
| 2026-11-16 | Foto-Tipp im Einfügen-Bereich (Galerie „T“/Google Lens → kopieren → einfügen); Schutz: Claude-Antwort im Personen-Formular wird erkannt und umgeleitet |

## 4. Nächste Schritte
- Stufe 2 ist umgesetzt. Die Such-Adressen (URL-Parameter) von GEDBAS, Arolsen, DDB, Find a Grave konnten
  nicht geprüft werden (Netz gesperrt) – deshalb wird der Name zusätzlich kopiert. Rückmeldung des Nutzers abwarten.
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
