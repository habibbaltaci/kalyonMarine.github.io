document.addEventListener('DOMContentLoaded', () => {

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


});
