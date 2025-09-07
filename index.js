document.querySelectorAll(".case-card").forEach(card => {
  const img = card.querySelector("img");
  const link = card.getAttribute("data-link");
  let clickedOnce = false;

  // Desktop Hover → Bild wechseln
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

  // Mobile: 1. Klick = Unhappy + Text, 2. Klick = Link
  card.addEventListener("click", (e) => {
    if (!window.matchMedia("(hover: hover)").matches) {
      if (!clickedOnce) {
        e.preventDefault();
        img.src = img.dataset.unhappy;
        card.querySelector(".case-info").style.opacity = "1";
        clickedOnce = true;
      } else {
        window.location.href = link;
      }
    } else {
      // Desktop: direkt öffnen
      window.location.href = link;
    }
  });
});
