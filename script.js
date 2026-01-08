document.addEventListener('DOMContentLoaded', () => 
  {

    /* =====================
       NAVBAR SCROLL EFFECT
    ===================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    });

    /* =====================
       REVEAL ELEMENTS
    ===================== */
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => revealObserver.observe(el));

    /* =====================
       SECTION TRANSITIONS
    ===================== */
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-enter-active');
            }
        });
    }, { threshold: 0.25 });

    sections.forEach(section => {
        section.classList.add('section-enter');
        sectionObserver.observe(section);
    });

    /* =====================
       NAV SCROLL-SPY (ACTIVE LINK)
    ===================== */
    const navLinks = document.querySelectorAll(
        '.nav-links a:not(.nav-cta)'
    );

    const spyObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

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
        if (section.id) {
            spyObserver.observe(section);
        }
    });

    /* =====================
       SMOOTH SCROLL
    ===================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetEl = document.querySelector(targetId);

            if (!targetEl) return;

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

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

/* Menü tıklanınca kapansın */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* =====================
   MAPBOX – CUSTOM MARKER
===================== */

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [29.8296, 40.7139], // Gölcük / Kocaeli
    zoom: 13
});

/* Custom anchor marker */
const markerEl = document.createElement('div');
markerEl.className = 'ship-marker';
markerEl.innerHTML = '⚓';

new mapboxgl.Marker(markerEl)
    .setLngLat([29.8296, 40.7139])
    .addTo(map);

});
const solutionsData = {
  yat: {
    title: "Yat İnşa Hizmetleri",
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
    title: "AFT Door",
    text: "AFT Door sistemleri için hassas montaj ve test süreçleri.",
    image: "src/img/aft.png",
    specs: {
      "Montaj Tipi": "Hidrolik / Mekanik",
      "Uyumluluk": "Klas Kuralları",
      "Test": "Fonksiyonel & Yük Testi"
    }
  },
  asma: {
    title: "Asma Tavan & İmalat",
    text: "Asma Tavan & İmalat Asma Tavan & İmalat Asma Tavan & İmalat",
    image: "src/img/asma.png",
    specs: {
      "Montaj Tipi": "Hidrolik / Mekanik",
      "Uyumluluk": "Klas Kuralları",
      "Test": "Fonksiyonel & Yük Testi"
    }
  },
    shell: {
    title: "Shelldoor",
    text: "Shelldoor Shelldoor Shelldoor Shelldoor Shelldoor Shelldoor",
    image: "src/img/shelldoor.png",
    specs: {
      "Montaj Tipi": "Hidrolik / Mekanik",
      "Uyumluluk": "Klas Kuralları",
      "Test": "Fonksiyonel & Yük Testi"
    }
  },
    kapi: {
    title: "Kapı Montajları",
    text: "Asma Tavan & İmalat Asma Tavan & İmalat Asma Tavan & İmalat",
    image: "src/img/kapi.png",
    specs: {
      "Montaj Tipi": "Hidrolik / Mekanik",
      "Uyumluluk": "Klas Kuralları",
      "Test": "Fonksiyonel & Yük Testi"
    }
  },
    hatch: {
    title: "Hatch Montajları",
    text: "Asma Tavan & İmalat Asma Tavan & İmalat Asma Tavan & İmalat",
    image: "src/img/hatch.png",
    specs: {
      "Montaj Tipi": "Hidrolik / Mekanik",
      "Uyumluluk": "Klas Kuralları",
      "Test": "Fonksiyonel & Yük Testi"
    }
  },
  windlass: {
    title: "Windlass Montajı",
    text: "Çapa vinci sistemlerinin güvenli ve standartlara uygun montajı.",
    image: "src/img/solutions/windlass.jpg",
    specs: {
      "Sistem": "Elektrik / Hidrolik",
      "Kapasite": "Proje bazlı",
      "Test": "Yük & Fonksiyon"
    }
  },
   stabilizer: {
    title: "Stabilizer Montajı",
    text: "Çapa vinci sistemlerinin güvenli ve standartlara uygun montajı.",
    image: "src/img/solutions/windlass.jpg",
    specs: {
      "Sistem": "Elektrik / Hidrolik",
      "Kapasite": "Proje bazlı",
      "Test": "Yük & Fonksiyon"
    }
  },


// ------------------------------------------

//  <li data-solution="aft">AFT Door</li>
//         <li data-solution="asma">Asma Tavan & İmalat</li>
//         <li data-solution="shell">Shelldoor</li>
//         <li data-solution="kapi">Kapı Montajları</li>
//         <li data-solution="hatch">Hatch Montajları</li>
//         <li data-solution="windlass">Windlass Montajı</li>
//         <li data-solution="stabilizer">Stabilizer Montajı</li>
//         <li data-solution="shaft">Shaft Bosası</li>

// ------------------------------------------




};
const content = document.getElementById("solutionContent");

function renderSolution(key){
  const data = solutionsData[key];
  if(!data) return;

  let tableRows = "";
  for(const item in data.specs){
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
document.querySelectorAll(".solutions-menu li").forEach(item => {
  item.addEventListener("click", () => {

    document
      .querySelectorAll(".solutions-menu li")
      .forEach(li => li.classList.remove("active"));

    item.classList.add("active");

    renderSolution(item.dataset.solution);
  });
});

// İlk yükleme
renderSolution("yat");


function scrollToSolutions() {
    document.getElementById("solutions-detail").scrollIntoView({
        behavior: "smooth"
    });
}

