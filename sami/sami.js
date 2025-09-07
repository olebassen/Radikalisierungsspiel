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
    const response = await fetch(`sami_scene${sceneId}.json`);
    const scene = await response.json();

    // Zone anhand RI bestimmen
    let zone = "";
    if (ri <= -6) zone = "Z1";
    else if (ri <= -1) zone = "Z2";
    else if (ri <= 3) zone = "Z3";
    else if (ri <= 6) zone = "Z4";
    else zone = "Z5";

    // Szenentext einsetzen
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

// Spielende (mit Evaluation – wie vorher)
function endGame() {
  let summary = "";
  let consequence = "";

  if (ri <= -6) {
    summary = "Sami hat sich deutlich von extremistischen Ideen distanziert.";
    consequence = "Dein Verhalten war überwiegend unterstützend, offen und deeskalierend.";
  } else if (ri <= -1) {
    summary = "Sami ist vorsichtig erreichbar und zeigt erste Distanzierung.";
    consequence = "Deine Reaktionen haben Orientierung geboten. Mit Geduld bleibt er erreichbar.";
  } else if (ri <= 3) {
    summary = "Sami bleibt ambivalent – mal offen, mal verschlossen.";
    consequence = "Dein Verhalten war gemischt: nicht klar genug distanzierend, aber auch nicht eskalierend.";
  } else if (ri <= 6) {
    summary = "Sami zeigt deutliche Radikalisierungstendenzen.";
    consequence = "Du hast ihn mehrfach unter Druck gesetzt oder keine Nähe gezeigt. Dadurch verstärkte sich die Abgrenzung.";
  } else {
    summary = "Sami ist stark radikalisiert und tief in extremistische Narrative verstrickt.";
    consequence = "Deine Reaktionen haben die Fronten verhärtet. Sami sieht sich bestätigt, dass Familie und Gesellschaft gegen ihn stehen.";
  }

  const evaluation = `
    <h2>Evaluation</h2>
    <p><strong>Ende des Falls:</strong> ${summary}</p>
    <p><strong>Analyse:</strong> ${consequence}</p>
    <p><em>Überlege: Welche Entscheidungen haben dich in diese Richtung geführt? 
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
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
