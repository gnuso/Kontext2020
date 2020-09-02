# Kontextsensitive Systeme Applikation

## Erheben von Daten mittels InfluxDB
Bewegungssensordaten wurden mit Hilfe eines Smartphones in eine InfluxDB geladen

## Analyse der Daten mittels Python
Die Daten werden mit Hilfe von Python analysiert um später einen Classifier auszugeben. Dabei werden verschiedene Methoden angewendet um einen Classifier zu trainieren und testen. Anschließend werden die besten Features ermittelt um einen DecisionTree zu entwickeln.

## Generierung einer PMML Datei
Zum Schluss wird eine PMML Datei generiert die für die spätere HTML Datei einen Realtime Classifier in Javascript zur Verfügung stellt.

## HTML Datei
Die Kontextsensitive App gibt in Chrome den aktuellen Zustand des Nutzers aus (Stehen, Gehen, Sitzen). Eine automatische kontextuelle Rekonfiguration ändert die Schriftgröße wenn die Klasse "Walking" angezeigt wird.
