let ri = Math.floor(Math.random() * 11) - 5; // Startwert zwischen -5 und +5
let currentScene = 1;
const maxScenes = 12;

// Start-Button klick
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("scene").style.display = "block";
  loadScene(currentScene);
});

async function loadScene(sceneId) {
  try {
    const response = await fetch(`murat_scene${sceneId}.json`);
    const scene = await response.json();

    // Zone anhand RI bestimmen
    let zone = "";
    if (ri <= -6) zone = "Z1";
    else if (ri <= -1) zone = "Z2";
    else if (ri <= 3) zone = "Z3";
    else if (ri <= 6) zone = "Z4";
    else zone = "Z5";

    // Szenentitel und Text einsetzen
    document.getElementById("scene-title").innerText = scene.title;
    document.getElementById("scene").innerText = scene.text[zone];

    // Optionen anzeigen
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("next-btn").style.display = "none";

    // Optionen mischen
    let options = [...scene.options[zone]];
    options = shuffle(options);

    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.innerText = opt.label;
      btn.onclick = () => {
        ri += opt.effect;
        document.getElementById("feedback").innerText = opt.feedback;
        document.getElementById("next-btn").style.display = "inline-block";
        optionsDiv.innerHTML = ""; // Optionen nach Wahl entfernen
      };
      optionsDiv.appendChild(btn);
    });
  } catch (err) {
    console.error("Fehler beim Laden der Szene:", err);
    document.getElementById("scene").innerText = "Die Geschichte endet hier.";
    document.getElementById("options").innerHTML = "";
  }
}

// Weiter-Button Logik
document.getElementById("next-btn").addEventListener("click", () => {
  currentScene++;
  if (currentScene > maxScenes) {
    endGame();
  } else {
    loadScene(currentScene);
  }
});

// Spielende (Evaluation aus Sicht einer Distanzierungsberaterin)
function endGame() {
  let summary = "";
  let consequence = "";

  if (ri <= -6) {
    summary =
      "Murat konnte eigene Perspektiven entwickeln und bleibt offen für Beratung.";
    consequence =
      "Deine professionelle Haltung war deeskalierend, validierend und ermöglichte Distanzierung.";
  } else if (ri <= -1) {
    summary = "Murat zeigt vorsichtige Distanz zu rigiden Mustern.";
    consequence =
      "Du hast ihn mit Geduld begleitet und erste Reflexionsräume geöffnet.";
  } else if (ri <= 3) {
    summary =
      "Murat bleibt ambivalent – er schwankt zwischen Eigenständigkeit und starren Vorgaben.";
    consequence =
      "Deine Interventionen waren teils förderlich, teils zu konfrontativ.";
  } else if (ri <= 6) {
    summary = "Murat zieht sich stärker in rigide Familiennarrative zurück.";
    consequence =
      "Zu viel Druck oder Konfrontation haben die Gesprächsbasis geschwächt.";
  } else {
    summary = "Murat verfestigt rigide und radikale Deutungsmuster.";
    consequence =
      "Eine zu harte Herangehensweise hat Distanz statt Nähe geschaffen.";
  }

  const evaluation = `
    <h2>Evaluation</h2>
    <p><strong>Ende des Falls:</strong> ${summary}</p>
    <p><strong>Analyse:</strong> ${consequence}</p>
    <p><em>Überlege: Welche Interventionen haben dich in diese Richtung geführt? 
    Was hättest du anders machen können?</em></p>
  `;

  document.getElementById("scene").innerHTML = evaluation;
  document.getElementById("options").innerHTML = "";
  document.getElementById("feedback").innerText = "";
  document.getElementById("next-btn").style.display = "none";

  const optionsDiv = document.getElementById("options");

  const retryBtn = document.createElement("button");
  retryBtn.innerText = "Nochmal spielen";
  retryBtn.onclick = () => {
    ri = Math.floor(Math.random() * 11) - 5;
    currentScene = 1;
    document.getElementById("intro").style.display = "block";
    document.getElementById("scene").style.display = "none";
    document.getElementById("options").innerHTML = "";
    document.getElementById("feedback").innerText = "";
  };

  const indexBtn = document.createElement("button");
  indexBtn.innerText = "Zurück zur Fallauswahl";
  indexBtn.onclick = () => {
    window.location.href = "../index.html";
  };

  optionsDiv.appendChild(retryBtn);
  optionsDiv.appendChild(indexBtn);
}

// Helferfunktion: Array mischen
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
