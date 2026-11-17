const envelope = document.getElementById("envelope");
const envelopeContainer = document.getElementById("envelopeContainer");
const bookContainer = document.getElementById("bookContainer");
const pages = document.querySelectorAll(".page");
const pageCounter = document.getElementById("pageCounter");
const pageNumber = document.getElementById("pageNumber");

let currentPage = 0;
let isFlipping = false;
const FLIP_TIME = 900; // must match the CSS transition (0.9s)

function openEnvelope() {
    if (envelope.classList.contains("open")) return;
    envelope.classList.add("open");

    setTimeout(() => {
        envelopeContainer.classList.add("hidden");
        bookContainer.classList.add("show");
        pageCounter.classList.add("show");
    }, 1300);
}

function nextPage() {
    if (isFlipping || currentPage >= pages.length - 1) return;
    isFlipping = true;

    pages[currentPage].classList.add("flipped");
    currentPage++;
    updateCounter();

    setTimeout(() => { isFlipping = false; }, FLIP_TIME);
}

function prevPage() {
    if (isFlipping || currentPage <= 0) return;
    isFlipping = true;

    currentPage--;
    pages[currentPage].classList.remove("flipped");
    updateCounter();

    setTimeout(() => { isFlipping = false; }, FLIP_TIME);
}

function updateCounter() {
    pageNumber.textContent = currentPage + 1;
}

// Keyboard
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") nextPage();
    if (event.key === "ArrowLeft") prevPage();
});

// Swipe
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) < 50) return;

    if (swipeDistance < 0) nextPage();
    else prevPage();
}