Radikalisierungsspiel

Ein interaktives Lernspiel zur Sensibilisierung für Radikalisierungsprozesse.
Spieler:innen übernehmen die Perspektive von Eltern, Berater:innen oder Behördenmitarbeiter:innen und treffen Entscheidungen in Fallgeschichten. Jede Entscheidung beeinflusst den Verlauf der Geschichte und das Radikalisierungsrisiko der Hauptfigur.

Fälle

Sami – Online-Radikalisierung (YouTube, Echokammern)

Murat – Familiäre Tradierung und kulturelle Enge (Perspektive: Distanzierungsberaterin)

Leonie – Politische Radikalisierung unter Beobachtung von Behörden (Perspektive: Polizistin im Staatsschutz)

Tobias – Islamistische Radikalisierung (Nähe zu Hizb ut-Tahrir, Perspektive: Demokratieförderungsprojekt)

Spielprinzip

Jede Fallgeschichte besteht aus 10 Szenen.

Spieler:innen wählen zwischen mehreren Handlungsoptionen.

Jede Option verändert den Radikalisierungsindex (RI), der die Dynamik der Figur abbildet.

Am Ende gibt es eine Evaluation, die zusammenfasst, wie sich die Figur entwickelt hat und welche Haltung die Spieler:innen gezeigt haben.

Struktur

index.html – Startseite mit Fallauswahl

style.css – Zentrales Styling

[fallname]/ – Ordner pro Fall (z. B. sami/, murat/, leonie/, tobias/)

[fallname].html – Spielfläche für den jeweiligen Fall

[fallname].js – Spiellogik für den Fall

sceneX.json – Beschreibungen der Szenen (1–10)

Installation & Nutzung

Repository klonen oder herunterladen.

Projekt im Browser öffnen (z. B. durch Öffnen von index.html).

Einen Fall auswählen und spielen.

Es wird kein Server benötigt – das Spiel läuft rein clientseitig.
Wichtig: Die JSON-Dateien müssen über einen Webserver geladen werden (lokales file://-Öffnen blockiert oft fetch). Am einfachsten mit einem kleinen lokalen Server (z. B. python -m http.server oder live-server).

Zielgruppe

Pädagog:innen

Sozialarbeiter:innen

Sicherheitsbehörden

Studierende in Sozial- und Politikwissenschaften

Das Spiel eignet sich als Übungs- und Reflexionsinstrument, nicht als Diagnose-Tool.