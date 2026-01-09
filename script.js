document.addEventListener('DOMContentLoaded', () => {

  /* =====================
     NAVBAR SCROLL EFFECT
  ===================== */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    });
  }

  /* =====================
     REVEAL ELEMENTS
  ===================== */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach(el => revealObserver.observe(el));
  }

  /* =====================
     SECTION TRANSITIONS
  ===================== */
  const sections = document.querySelectorAll('section');
  if (sections.length) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-enter-active');
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach(section => {
      section.classList.add('section-enter');
      sectionObserver.observe(section);
    });

    /* =====================
       NAV SCROLL-SPY (ACTIVE LINK)
    ===================== */
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    if (navLinks.length) {
      const spyObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              if (!id) return;

              navLinks.forEach(link => {
                link.classList.toggle(
                  'active',
                  link.getAttribute('href') === `#${id}`
                );
              });
            }
          });
        },
        {
          root: null,
          rootMargin: '-40% 0px -50% 0px',
          threshold: 0
        }
      );

      sections.forEach(section => {
        if (section.id) spyObserver.observe(section);
      });
    }
  }

  /* =====================
     SMOOTH SCROLL
     - Modal gibi linkler için: .no-scroll
  ===================== */
  document.querySelectorAll('a[href^="#"]:not(.no-scroll)').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');

      // href="#" ise smooth scroll'a girme
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const offset = 100;
      const targetPosition =
        targetEl.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* =====================
     HAMBURGER MENU
  ===================== */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-links');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Menüde linke basınca kapansın
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* =====================
     MAPBOX – CUSTOM MARKER
     - #map yoksa çalışmasın
  ===================== */
  const mapContainer = document.getElementById('map');
  if (mapContainer && typeof mapboxgl !== 'undefined') {
    try {
      mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [29.8296, 40.7139], // Gölcük / Kocaeli
        zoom: 13
      });

      const markerEl = document.createElement('div');
      markerEl.className = 'ship-marker';
      markerEl.innerHTML = '⚓';

      new mapboxgl.Marker(markerEl)
        .setLngLat([29.8296, 40.7139])
        .addTo(map);
    } catch (err) {
      console.warn('Mapbox init error:', err);
    }
  }

  /* =====================
     SOLUTIONS DETAIL RENDER
  ===================== */
  const content = document.getElementById("solutionContent");

  function renderSolution(key) {
    if (!content) return;

    const data = solutionsData[key];
    if (!data) return;

    let tableRows = "";
    for (const item in data.specs) {
      tableRows += `
        <tr>
          <th>${item}</th>
          <td>${data.specs[item]}</td>
        </tr>`;
    }

    content.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.text}</p>

      <div class="solution-media">
        <img src="${data.image}" alt="${data.title}">
      </div>

      <div class="solution-table">
        <table>
          ${tableRows}
        </table>
      </div>
    `;
  }

  const solutionMenuItems = document.querySelectorAll(".solutions-menu li");
  if (solutionMenuItems.length) {
    solutionMenuItems.forEach(item => {
      item.addEventListener("click", () => {
        solutionMenuItems.forEach(li => li.classList.remove("active"));
        item.classList.add("active");
        renderSolution(item.dataset.solution);
      });
    });

    // İlk yükleme
    renderSolution("yat");
  }

  /* =====================
     SCROLL TO SOLUTIONS DETAIL
  ===================== */
  window.scrollToSolutions = function () {
    document.getElementById("solutions-detail")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  /* =====================
     TEAM MODAL CONTROL (SAFE)
     - Elemanlar yoksa sayfa kırmaz
  ===================== */
  const btnTeam = document.getElementById("btnTeam");
  const teamModal = document.getElementById("teamModal");

  if (btnTeam && teamModal) {
    const closeModalBtn = teamModal.querySelector(".modal-close");

    const closeModal = () => {
      teamModal.classList.remove("active");
      document.body.style.overflow = "";
    };

    btnTeam.addEventListener("click", (e) => {
      e.preventDefault();
      teamModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    closeModalBtn?.addEventListener("click", closeModal);

    teamModal.addEventListener("click", (e) => {
      if (e.target === teamModal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }
/* =====================
   MISSION MODAL CONTROL
===================== */

const btnMission = document.getElementById("btnMission");
const missionModal = document.getElementById("missionModal");

if (btnMission && missionModal) {
  const closeBtn = missionModal.querySelector(".modal-close");

  const closeMissionModal = () => {
    missionModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  btnMission.addEventListener("click", (e) => {
    e.preventDefault();
    missionModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeBtn?.addEventListener("click", closeMissionModal);

  missionModal.addEventListener("click", (e) => {
    if (e.target === missionModal) closeMissionModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMissionModal();
  });
}

/* =====================
   MISSION MODAL CONTROL
===================== */

const btnVision = document.getElementById("btnVision");
const visionModal = document.getElementById("visionModal");

if (btnVision && visionModal) {
  const closeBtn = visionModal.querySelector(".modal-close");

  const closeVisionModal = () => {
    visionModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  btnVision.addEventListener("click", (e) => {
    e.preventDefault();
    visionModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeBtn?.addEventListener("click", closeVisionModal);

  visionModal.addEventListener("click", (e) => {
    if (e.target === visionModal) closeVisionModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVisionModal();
  });
}

});
/* =====================
   SOLUTIONS DATA
   - DOMContentLoaded DIŞINDA OLMASI NORMAL
===================== */
const solutionsData = {
  yat: {
    title: "İmalat",
    text: "Yat inşa projelerinde donatım, montaj ve özel imalat süreçlerini saha deneyimimizle yürütüyoruz.",
    image: "src/img/yat.png",
    specs: {
      "Hizmet Kapsamı": "Donatım & Montaj",
      "Uygulama Alanı": "Yat ve özel tekneler",
      "Standartlar": "IMO / ISO",
      "Teslim Süresi": "Proje bazlı"
    }
  },

  aft: {
    title: "Montaj",
    text: "AFT Door sistemleri için hassas montaj ve test süreçleri.",
    image: "src/img/aft.png",
    specs: {
      "Montaj Tipi": "Hidrolik / Mekanik",
      "Uyumluluk": "Klas Kuralları",
      "Test": "Fonksiyonel & Yük Testi"
    }
  },

  asma: {
    title: "Mühendislik",
    text: "Asma Tavan & İmalat Asma Tavan & İmalat Asma Tavan & İmalat",
    image: "src/img/asma.png",
    specs: {
      "Montaj Tipi": "Hidrolik / Mekanik",
      "Uyumluluk": "Klas Kuralları",
      "Test": "Fonksiyonel & Yük Testi"
    }
  }
};
