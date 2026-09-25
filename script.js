/* =================================
   VARIABLES
================================= */

const cover = document.getElementById("cover");
const book = document.getElementById("book");

const pages = document.querySelectorAll(".page");
const dots = document.querySelectorAll(".dot");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let currentPage = 0;


/* =================================
   START BOOK
================================= */

function startBook() {

  /*
    Coba mulai musik ketika user
    menekan tombol.
  */

  music.play()
    .then(() => {

      musicBtn.innerHTML = "♫";

    })
    .catch(() => {

      musicBtn.innerHTML = "▶";

    });


  /*
    Hilangkan cover.
  */

  cover.style.transition =
    "opacity .8s ease, transform .8s ease";

  cover.style.opacity = "0";

  cover.style.transform =
    "scale(.97)";


  setTimeout(() => {

    cover.style.display = "none";

    book.classList.remove("hidden");

    showPage(0);

  }, 800);

}


/* =================================
   SHOW PAGE
================================= */

function showPage(index) {

  if (index < 0) {
    index = 0;
  }

  if (index >= pages.length) {
    index = pages.length - 1;
  }

  currentPage = index;


  /*
    Semua halaman disembunyikan.
  */

  pages.forEach((page, i) => {

    page.classList.remove("active");

    if (i === currentPage) {

      /*
        Memaksa animasi halaman
        dimainkan kembali.
      */

      void page.offsetWidth;

      page.classList.add("active");

    }

  });


  /*
    Update dots.
  */

  dots.forEach((dot, i) => {

    dot.classList.toggle(
      "active",
      i === currentPage
    );

  });


  /*
    Tombol prev.
  */

  prevBtn.disabled =
    currentPage === 0;


  /*
    Tombol next.
  */

  nextBtn.disabled =
    currentPage === pages.length - 1;


  /*
    Scroll kembali ke atas.
  */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =================================
   NEXT PAGE
================================= */

function nextPage() {

  if (currentPage < pages.length - 1) {

    showPage(currentPage + 1);

  }

}


/* =================================
   PREVIOUS PAGE
================================= */

function previousPage() {

  if (currentPage > 0) {

    showPage(currentPage - 1);

  }

}


/* =================================
   KEYBOARD
================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "ArrowRight" ||
      event.key === " "
    ) {

      if (currentPage < pages.length - 1) {

        nextPage();

      }

    }


    if (event.key === "ArrowLeft") {

      if (currentPage > 0) {

        previousPage();

      }

    }

  }
);


/* =================================
   SWIPE MOBILE
================================= */

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener(
  "touchstart",
  function(event) {

    touchStartX =
      event.changedTouches[0].screenX;

  },
  { passive: true }
);


document.addEventListener(
  "touchend",
  function(event) {

    touchEndX =
      event.changedTouches[0].screenX;

    handleSwipe();

  },
  { passive: true }
);


function handleSwipe() {

  const difference =
    touchStartX - touchEndX;


  /*
    Geser kiri = halaman berikutnya
  */

  if (difference > 60) {

    nextPage();

  }


  /*
    Geser kanan = halaman sebelumnya
  */

  if (difference < -60) {

    previousPage();

  }

}


/* =================================
   MUSIC
================================= */

function toggleMusic() {

  if (music.paused) {

    music.play();

    musicBtn.innerHTML = "♫";

  } else {

    music.pause();

    musicBtn.innerHTML = "▶";

  }

}


/* =================================
   FINAL PAGE
================================= */

function finishStory() {

  const finalMessage =
    document.getElementById("finalMessage");

  finalMessage.classList.add("show");


  createHearts();

}


/* =================================
   HEART ANIMATION
================================= */

function createHearts() {

  for (
    let i = 0;
    i < 20;
    i++
  ) {

    setTimeout(() => {

      const heart =
        document.createElement("div");

      heart.innerHTML = "♡";

      heart.style.position =
        "fixed";

      heart.style.left =
        Math.random() * 100 + "vw";

      heart.style.bottom =
        "-30px";

      heart.style.color =
        "#a9c2d5";

      heart.style.fontSize =
        (18 + Math.random() * 25) + "px";

      heart.style.zIndex =
        "999";

      heart.style.pointerEvents =
        "none";

      heart.style.transition =
        "transform 4s ease, opacity 4s ease";

      document.body.appendChild(heart);


      setTimeout(() => {

        heart.style.transform =
          `translateY(-100vh) rotate(${Math.random() * 360}deg)`;

        heart.style.opacity = "0";

      }, 100);


      setTimeout(() => {

        heart.remove();

      }, 4200);

    }, i * 120);

  }

}