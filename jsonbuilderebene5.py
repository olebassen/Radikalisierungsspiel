import json

def generate_crisis_node(node_id):
    """Erzeugt einen einzelnen Schulkrisen-Knoten mit einheitlichem Text und 3 Optionen"""
    return {
        "id": node_id,
        "text": (
            "In der Schule kommt es zu einer Krise: Während des Unterrichts widerspricht Sami "
            "lautstark dem Lehrer und nennt westliche Werte 'Heuchelei'. Der Lehrer weist ihn zurecht, "
            "Mitschüler lachen. Sami fühlt sich zutiefst gedemütigt. Später schreibt er in seinen "
            "Chatgruppen: 'Sie alle wollen mich brechen, aber meine Brüder stehen hinter mir.'"
        ),
        "options": [
            {
                "label": "Die Eltern sprechen den Vorfall ruhig an und zeigen Verständnis für Samis Gefühle",
                "effect": "good",
                "next": f"{node_id}1"
            },
            {
                "label": "Die Eltern gehen nicht darauf ein und lassen es unkommentiert",
                "effect": "neutral",
                "next": f"{node_id}2"
            },
            {
                "label": "Die Eltern geben Sami die Schuld: 'Du hast dich selbst ins Abseits gebracht!'",
                "effect": "bad",
                "next": f"{node_id}3"
            }
        ]
    }

def generate_nodes(base_ids):
    """Erzeugt alle Knoten für die übergebenen IDs"""
    return [generate_crisis_node(node_id) for node_id in base_ids]

# Beispiel: IDs, die du abdecken willst
base_ids = []

for b in range(1, 4):      # zweite Stelle
    for c in range(1, 4):  # dritte Stelle
        for d in range(1, 4):  # vierte Stelle
            for e in range(1, 4):  # fünfte Stelle
                for f in range(1, 4):  # sechste Stelle
                    base_ids.append(f"1{b}{c}{d}{e}{f}")

print("Anzahl IDs:", len(base_ids))
print("Erste 10:", base_ids[:10])
print("Letzte 10:", base_ids[-10:])


# Generiere die JSON-Daten
nodes = generate_nodes(base_ids)

# Speichere in Datei
with open("schulkrise_nodes.json", "w", encoding="utf-8") as f:
    json.dump(nodes, f, ensure_ascii=False, indent=2)

print(f"{len(nodes)} Knoten erzeugt und in schulkrise_nodes.json gespeichert.")
