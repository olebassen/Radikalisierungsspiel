let ri = Math.floor(Math.random() * 11) - 5; // Startwert zwischen -5 und +5
let currentScene = 1;
const maxScenes = 10;

// Start-Button klick
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("scene").style.display = "block";
  loadScene(currentScene);
});

async function loadScene(sceneId) {
  try {
    const response = await fetch(`tobias_scene${sceneId}.json`);
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

    options.forEach(opt => {
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
  summary = "Tobias hat begonnen, demokratische Perspektiven zu reflektieren und distanziert sich von den starren Narrativen.";
  consequence = "Deine Haltung war deeskalierend, anerkennend und eröffnete Räume für Zweifel und Alternativen.";
} else if (ri <= -1) {
  summary = "Tobias zeigt erste Distanz zu den islamistischen Deutungsmustern.";
  consequence = "Mit Geduld und klarer Haltung konntest du Reflexion anstoßen.";
} else if (ri <= 3) {
  summary = "Tobias bleibt ambivalent – er schwankt zwischen islamistischen Überzeugungen und Ansätzen von Offenheit.";
  consequence = "Deine Interventionen waren teils hilfreich, teils zu konfrontativ.";
} else if (ri <= 6) {
  summary = "Tobias verfestigt stärker islamistische Deutungsmuster.";
  consequence = "Zu viel Druck oder Polarisierung haben die Gesprächsbasis geschwächt.";
} else {
  summary = "Tobias bekräftigt offen islamistische Narrative und wendet sich stärker gegen Demokratie und Pluralismus.";
  consequence = "Eine zu harte oder ungeduldige Haltung hat Nähe verhindert und Abgrenzung verstärkt.";
}


  const evaluation = `
    <h2>Evaluation</h2>
    <p><strong>Ende des Falls:</strong> ${summary}</p>
    <p><strong>Analyse:</strong> ${consequence}</p>
    <p><em>Überlege: Welche deiner Interventionen haben Tobias bestärkt, welche haben Zweifel ermöglicht? 
    Wie hättest du anders reagieren können, um seine Offenheit für demokratische Perspektiven zu fördern?</em></p>
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
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
