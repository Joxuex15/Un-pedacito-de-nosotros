const pages = document.querySelectorAll(".page");
const cover = document.querySelector(".cover");

const navigation = document.querySelector(".navigation");
const dotsContainer = document.querySelector(".dots");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentPage = 0;


/* =========================================================
   CREAR DOTS
========================================================= */

pages.forEach((_, index) => {

  const dot = document.createElement("button");

  dot.classList.add("dot");

  if (index === 0) {
    dot.classList.add("active");
  }

  dot.addEventListener("click", () => {

    openAlbum();

    showPage(index);

  });

  dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll(".dot");


/* =========================================================
   ABRIR ÁLBUM
========================================================= */

function openAlbum() {

  // Ocultar portada
  cover.classList.remove("active");

  // Mostrar primera página
  pages.forEach(page => {
    page.classList.remove("active");
  });

  currentPage = 0;

  pages[0].classList.add("active");

  updateNavigation();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   MOSTRAR PÁGINA
========================================================= */

function showPage(index) {

  if (index < 0 || index >= pages.length) {
    return;
  }


  // Ocultar portada si todavía está visible
  cover.classList.remove("active");


  // Quitar todas las páginas
  pages.forEach(page => {
    page.classList.remove("active");
  });


  // Cambiar página
  currentPage = index;


  // Activar página correspondiente
  pages[currentPage].classList.add("active");


  // Actualizar navegación
  updateNavigation();


  // Volver arriba
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   ACTUALIZAR DOTS + FLECHAS
========================================================= */

function updateNavigation() {

  // Actualizar dots

  dots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === currentPage
    );

  });


  /*
    La navegación se oculta:
    - en la portada
    - en la última página

    En todas las demás aparece.
  */

  if (
    cover.classList.contains("active") ||
    currentPage === pages.length - 1
  ) {

    navigation.classList.add("hidden");

  } else {

    navigation.classList.remove("hidden");

  }


  /*
    Botón anterior

    En la primera página del álbum
    no aparece porque no tiene sentido
    volver a otra página de contenido.
  */

  if (currentPage === 0) {

    prevBtn.style.visibility = "hidden";

  } else {

    prevBtn.style.visibility = "visible";

  }


  /*
    Botón siguiente

    SOLO desaparece en el final.

    Así "Yo" todavía puede avanzar
    hasta "Fin del álbum".
  */

  if (currentPage === pages.length - 1) {

    nextBtn.style.visibility = "hidden";

  } else {

    nextBtn.style.visibility = "visible";

  }

}


/* =========================================================
   SIGUIENTE
========================================================= */

function nextPage() {

  if (currentPage < pages.length - 1) {

    showPage(currentPage + 1);

  }

}


/* =========================================================
   ANTERIOR
========================================================= */

function prevPage() {

  if (currentPage > 0) {

    showPage(currentPage - 1);

  }

}


/* =========================================================
   REINICIAR ÁLBUM
========================================================= */

function restartAlbum() {

  // Ocultar todas las páginas
  pages.forEach(page => {
    page.classList.remove("active");
  });

  // Volver a la portada
  cover.classList.add("active");

  currentPage = 0;

  // Ocultar navegación
  navigation.classList.add("hidden");

  // Restaurar dots
  dots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === 0
    );

  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   BOTONES
========================================================= */

nextBtn.addEventListener(
  "click",
  nextPage
);

prevBtn.addEventListener(
  "click",
  prevPage
);


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    // Si estamos en portada
    if (cover.classList.contains("active")) {

      if (event.key === "ArrowRight") {
        openAlbum();
      }

      return;
    }


    if (event.key === "ArrowRight") {
      nextPage();
    }


    if (event.key === "ArrowLeft") {
      prevPage();
    }

  }
);


/* =========================================================
   SWIPE
========================================================= */

let touchStartX = 0;


document.addEventListener(
  "touchstart",
  (event) => {

    touchStartX =
      event.changedTouches[0].screenX;

  },
  { passive: true }
);


document.addEventListener(
  "touchend",
  (event) => {

    const touchEndX =
      event.changedTouches[0].screenX;

    const difference =
      touchStartX - touchEndX;


    if (Math.abs(difference) > 60) {

      if (cover.classList.contains("active")) {

        if (difference > 0) {
          openAlbum();
        }

        return;

      }


      if (difference > 0) {

        nextPage();

      } else {

        prevPage();

      }

    }

  },
  { passive: true }
);


/* =========================================================
   EFECTO DEL MOUSE
========================================================= */

document.addEventListener(
  "mousemove",
  (event) => {

    document.documentElement.style.setProperty(
      "--mouse-x",
      `${event.clientX}px`
    );

    document.documentElement.style.setProperty(
      "--mouse-y",
      `${event.clientY}px`
    );

  }
);


/* =========================================================
   ESTADO INICIAL
========================================================= */

// Asegurarnos de que SOLO la portada
// esté visible al cargar.

pages.forEach(page => {
  page.classList.remove("active");
});

cover.classList.add("active");

navigation.classList.add("hidden");

dots.forEach((dot, index) => {

  dot.classList.toggle(
    "active",
    index === 0
  );

});
