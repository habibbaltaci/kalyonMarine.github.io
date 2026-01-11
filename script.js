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
  // const content = document.getElementById("solutionContent");

  // function renderSolution(key) {
  //   if (!content) return;

  //   const data = solutionsData[key];
  //   if (!data) return;

  //   let tableRows = "";
  //   for (const item in data.specs) {
  //     tableRows += `
  //       <tr>
  //         <th>${item}</th>
  //         <td>${data.specs[item]}</td>
  //       </tr>`;
  //   }

  //   content.innerHTML = `
  //     <h2>${data.title}</h2>
  //     <p>${data.text}</p>

  //     <div class="solution-media">
  //       <img src="${data.image}" alt="${data.title}">
  //     </div>

  //     <div class="solution-table">
  //       <table>
  //         ${tableRows}
  //       </table>
  //     </div>
  //   `;
  // }

  // const solutionMenuItems = document.querySelectorAll(".solutions-menu li");
  // if (solutionMenuItems.length) {
  //   solutionMenuItems.forEach(item => {
  //     item.addEventListener("click", () => {
  //       solutionMenuItems.forEach(li => li.classList.remove("active"));
  //       item.classList.add("active");
  //       renderSolution(item.dataset.solution);
  //     });
  //   });

  //   // İlk yükleme
  //   renderSolution("yat");
  // }

  /* =====================
     SCROLL TO SOLUTIONS DETAIL
  ===================== */
  window.scrollToSolutions = function () {
    document.getElementById("solutions-detail")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  /* =====================
     SOLUTIONS DETAIL RENDER
  ===================== */
  const content = document.getElementById("solutionContent");
  const solutionMenuItems = document.querySelectorAll(".solutions-menu li");

  function renderSolution(key) {
    if (!content) return;

    const data = solutionsData[key];
    if (!data) return;

    let html = `
      <h2 class="solution-title">${data.title}</h2>
      <p class="solution-text">${data.text}</p>

      <div class="solution-image">
        <img src="${data.image}" alt="${data.title}">
      </div>
    `;

    /* ==========
       ASMA → ACCORDION
    ========== */
    if (data.content && Array.isArray(data.content)) {
      html += `<div class="engineering-accordion">`;

      data.content.forEach(item => {
        html += `
          <div class="accordion-item">
            <button class="accordion-header">
              <span>${item.title}</span>
              <i></i>
            </button>
            <div class="accordion-body">
              <p>${item.description}</p>
            </div>
          </div>
        `;
      });

      html += `</div>`;
    }

    /* ==========
       DİĞERLERİ → TABLE
    ========== */
    else if (data.specs) {
      let tableRows = "";

      Object.entries(data.specs).forEach(([key, value]) => {
        tableRows += `
          <tr>
            <th>${key}</th>
            <td>${value}</td>
          </tr>
        `;
      });

      html += `
        <div class="solution-table">
          <table>
            ${tableRows}
          </table>
        </div>
      `;
    }

    content.innerHTML = html;
    initAccordion();
  }

  /* =====================
     ACCORDION LOGIC
  ===================== */
  function initAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    if (!headers.length) return;

    headers.forEach(header => {
      header.addEventListener("click", () => {
        const item = header.parentElement;
        const body = header.nextElementSibling;

        document.querySelectorAll(".accordion-item").forEach(i => {
          if (i !== item) {
            i.classList.remove("active");
            i.querySelector(".accordion-body").style.maxHeight = null;
          }
        });

        item.classList.toggle("active");

        body.style.maxHeight = item.classList.contains("active")
          ? body.scrollHeight + "px"
          : null;
      });
    });
  }

  /* =====================
     SOLUTIONS MENU CLICK
  ===================== */
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
  /* =====================
     SCROLL TO TOP BUTTON
  ===================== */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("show", window.scrollY > 500);
    });

    scrollTopBtn.addEventListener("click", () => {
      // Lenis varsa onunla, yoksa native
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

});
/* =====================
   SOLUTIONS DATA
   - DOMContentLoaded DIŞINDA OLMASI NORMAL
===================== */
const solutionsData = {
  aft: {
    title: "Donanım ve Montaj",
    text: "",
    image: "src/img/bg_section.png"
  },

  yat: {
    title: "Gemi Donatım ve Montaj Hizmetleri",
    text: "",
    image: "src/img/yat.png",
    content: [
      {
        title: "Çelik ve Alüminyum Konstrüksiyon Montajı",
        description: "not data"
      },
      {
        title: "Çelik Donatım ve Yapısal Montaj İşleri",
        description: "not data"
      },
      {
        title: "Güverte Donatım ve Ekipman Montajı",
        description: "not data"
      },
      {
        title: "Ekipman Montajı ve Sabitleme İşleri",
        description: "not data"
      },
      {
        title: "Shelldoor ve Balkon Montajı",
        description: "not data"
      },
      {
        title: "Su Geçirmez / Hava Şartlarına Dayanıklı Kapı Montajı",
        description: "not data"
      },
      {
        title: "Kapak, Menhol ve Lomboz Montajı",
        description: "not data"
      },
       {
        title: "Havalandırma Kapakları ve Menfez Montajı",
        description: "not data"
      },
       {
        title: "Tank ve Depolama Üniteleri Montajı",
        description: "not data"
      },
       {
        title: "CNC Plazma Kesim ve Parça Hazırlığı",
        description: "not data"
      },
       {
        title: "Silindir Büküm ve Profil Büküm İşleri",
        description: "not data"
      },
      {
        title: "Torna ve Freze İşlemleri",
        description: "not data"
      },
    ]
  },

  asma: {
    title: "Mühendislik Ve Teknik Çözümler",
    text: "",
    image: "src/img/bg_section.png",
    content: [
      {
        title: "1. Saha Keşfi ve Teknik Tespit",
        description: "Gemi ve tersane sahasında mevcut durum, ölçüler ve teknik gereklilikler detaylı olarak analiz edilir. Uygulamaya esas olacak doğru ve güvenilir veriler yerinde tespit edilir."
      },
      {
        title: "2. Teknik Projelendirme",
        description: "Müşteri talepleri, klas kuralları ve uluslararası gemi inşa standartları doğrultusunda teknik projelendirme yapılır. Projeler; emniyet, uygulanabilirlik ve operasyonel verimlilik esas alınarak hazırlanır."
      },
      {
        title: "3. İmalat ve Montaj Resimleri",
        description: "Üretim ve montaj süreçlerine doğrudan esas teşkil eden, ölçülendirilmiş ve detaylandırılmış teknik resimler hazırlanır. Sahada hata payını azaltan net ve eksiksiz dokümantasyon sağlanır."
      },
      {
        title: "4. Mühendislik ve Teknik Hesap Hizmetleri",
        description: "Gemi donatım sistemlerine yönelik teknik hesaplamalar, ölçülendirme ve mühendislik analizleri gerçekleştirilir. Çözümler, klas kurallarına ve emniyet gerekliliklerine uygun olarak geliştirilir."
      },
      {
        title: "5. Mühendislik Danışmanlığı",
        description: "Gemi inşa ve donatım projelerinde teknik karar süreçlerine destek olunur. Proje süresince tecrübe ve mühendislik bilgisi ile güvenilir danışmanlık hizmeti sunulur."
      }
    ]
  }
};


