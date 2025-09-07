document.querySelectorAll(".case-card").forEach(card => {
  const img = card.querySelector("img");
  const link = card.getAttribute("data-link");
  let clickedOnce = false;

  // Desktop: beim Hovern Bild wechseln
  card.addEventListener("mouseenter", () => {
    if (window.matchMedia("(hover: hover)").matches) {
      img.src = img.dataset.unhappy;
    }
  });
  card.addEventListener("mouseleave", () => {
    if (window.matchMedia("(hover: hover)").matches) {
      img.src = img.dataset.happy;
    }
  });

  // Mobile: 1. Klick = Bildwechsel, 2. Klick = Link öffnen
  card.addEventListener("click", (e) => {
    if (!window.matchMedia("(hover: hover)").matches) {
      if (!clickedOnce) {
        img.src = img.dataset.unhappy;
        card.querySelector(".case-text").style.opacity = "1";
        clickedOnce = true;
        e.preventDefault();
      } else {
        window.location.href = link;
      }
    } else {
      // Desktop: direkt öffnen
      window.location.href = link;
    }
  });
});
