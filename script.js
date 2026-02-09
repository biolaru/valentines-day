const game = document.getElementById("game");
const basket = document.getElementById("basket");
const scoreSpan = document.getElementById("score");

let score = 0;

// Mișcare coș
game.addEventListener("mousemove", (e) => {
    let x = e.clientX - basket.offsetWidth / 2;

    if (x < 0) x = 0;
    if (x + basket.offsetWidth > window.innerWidth) {
        x = window.innerWidth - basket.offsetWidth;
    }

    basket.style.left = x + "px";
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    heart.style.left = Math.random() * (window.innerWidth - 40) + "px";
    heart.style.top = "-40px";

    game.appendChild(heart);

    const speed = 2 + Math.random() * 3;

    function fall() {
        heart.style.top = heart.offsetTop + speed + "px";

        const heartRect = heart.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        // Coliziune
        if (
            heartRect.bottom >= basketRect.top &&
            heartRect.left <= basketRect.right &&
            heartRect.right >= basketRect.left
        ) {
            score++;
            scoreSpan.textContent = score;
            heart.remove();
            return;
        }

        // Dacă cade jos
        if (heart.offsetTop > window.innerHeight) {
            heart.remove();
            return;
        }

        requestAnimationFrame(fall);
    }

    fall();
}

// Creează inimioare constant
setInterval(createHeart, 800);
