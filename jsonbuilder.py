import json
from collections import deque

def generate_tree(max_depth=9, win_streak=3):
    scenes = []

    # BFS-Warteschlange
    queue = deque()
    queue.append(("1", 1, 0))  # (ID, Ebene, Good-Streak)

    while queue:
        node_id, depth, good_streak = queue.popleft()

        # Gewinnbedingung erreicht
        if good_streak >= win_streak:
            scenes.append({
                "id": node_id,
                "text": f"Szene {node_id} – Deeskalation nach {good_streak} guten Entscheidungen.",
                "options": []
            })
            continue

        # Maximale Tiefe erreicht
        if depth > max_depth:
            scenes.append({
                "id": node_id,
                "text": f"Szene {node_id} – Ende des Spiels (Ambivalenz/Eskalation).",
                "options": []
            })
            continue

        # Normale Szene
        node = {
            "id": node_id,
            "text": f"Szene {node_id} – Ebene {depth}.",
            "options": []
        }

        # Good-Option
        child1 = node_id + "1"
        node["options"].append({
            "label": "Option A",
            "feedback": f"Gute Reaktion bei Szene {node_id}",
            "effect": "good",
            "next": child1
        })
        queue.append((child1, depth + 1, good_streak + 1))

        # Neutral-Option
        child2 = node_id + "2"
        node["options"].append({
            "label": "Option B",
            "feedback": f"Neutrale Reaktion bei Szene {node_id}",
            "effect": "neutral",
            "next": child2
        })
        queue.append((child2, depth + 1, good_streak))

        # Bad-Option
        child3 = node_id + "3"
        node["options"].append({
            "label": "Option C",
            "feedback": f"Schlechte Reaktion bei Szene {node_id}",
            "effect": "bad",
            "next": child3
        })
        queue.append((child3, depth + 1, 0))  # Streak reset

        scenes.append(node)

    # Sortieren: zuerst Ebene (Länge der ID), dann Zahlenwert
    scenes.sort(key=lambda s: (len(s["id"]), int(s["id"])))
    return scenes


# Baum erzeugen
tree = generate_tree(max_depth=9, win_streak=3)

# Speichern
with open("sami.json", "w", encoding="utf-8") as f:
    json.dump(tree, f, ensure_ascii=False, indent=2)

print(f"Fertig! {len(tree)} Szenen generiert.")
