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
    const response = await fetch(`alina_scene${sceneId}.json`);
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
// Szenentitel einsetzen
document.getElementById("scene-title").innerText = scene.title;

// Szenentext einsetzen (wie bisher abhängig von RI)
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
  summary = "Alina hat sich klar von extremistischen Einflüssen distanziert.";
  consequence = "Dein pädagogisches Handeln war unterstützend und fördernd. Du hast Alina gezeigt, dass Schule ein sicherer Raum ist, in dem sie Anerkennung finden kann.";
  reflection = "Wie kannst du diese stabilisierende Wirkung auch für andere gefährdete Schüler*innen entfalten?";
} else if (ri <= -1) {
  summary = "Alina zeigt erste Distanzierung von der Clique.";
  consequence = "Durch deine Haltung und gezielte Gespräche konnte Alina Vertrauen aufbauen. Sie nimmt die Schule zunehmend als stabilisierende Ressource wahr.";
  reflection = "Welche schulischen Strukturen könntest du nutzen, um Alina weiter zu stärken?";
} else if (ri <= 3) {
  summary = "Alina bleibt hin- und hergerissen zwischen Schule und Clique.";
  consequence = "Deine Maßnahmen waren gemischt: teils förderlich, teils unklar. Dadurch konnte sich Alina weder eindeutig stabilisieren noch voll in die Clique abdriften.";
  reflection = "Wie hättest du klarere Signale setzen können, ohne Alina zu überfordern?";
} else if (ri <= 6) {
  summary = "Alina orientiert sich zunehmend an der Clique.";
  consequence = "Dein pädagogisches Eingreifen war nicht konsequent genug oder zu konfrontativ. Die Clique erscheint für Alina attraktiver als das schulische Umfeld.";
  reflection = "Welche Unterstützung von Kollegium oder Schulsozialarbeit wäre in dieser Situation hilfreich gewesen?";
} else {
  summary = "Alina ist fest in der Clique verankert und übernimmt deren extremistische Haltung.";
  consequence = "Dein Vorgehen hat die Abgrenzung verstärkt. Für Alina bietet die Schule aktuell keinen glaubwürdigen Gegenentwurf zur Clique.";
  reflection = "Wie könntest du in zukünftigen Fällen frühzeitiger erkennen, wann eine Gruppendynamik gefährlich wird?";
}




const evaluation = `
  <h2>Evaluation</h2>
  <p><strong>Ende des Falls:</strong> ${summary}</p>
  <p><strong>Analyse:</strong> ${consequence}</p>
  <p><em>Reflexion für Lehrkräfte:</em> ${reflection}</p>
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
