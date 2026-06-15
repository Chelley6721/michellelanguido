/* ── MENU TOGGLE ── */
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

/* ── SCROLL: STICKY HEADER + ACTIVE NAV + CLOSE MENU ── */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header   = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky header
    header.classList.toggle('sticky', scrollY > 80);

    // Close mobile menu on scroll
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');

    // Active nav link highlight
    sections.forEach(sec => {
        const offset = sec.offsetTop - 200;
        const height = sec.offsetHeight;
        const id     = sec.getAttribute('id');

        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`header nav a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
});

/* ── CLOSE MENU ON NAV LINK CLICK ── */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    });
});

/* ── CONTACT FORM FEEDBACK ── */
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' },
            });
            if (res.ok) {
                formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
                formStatus.style.color = '#c9a96e';
                contactForm.reset();
            } else {
                formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
                formStatus.style.color = '#e07070';
            }
        } catch {
            formStatus.textContent = 'Network error. Please check your connection.';
            formStatus.style.color = '#e07070';
        }
        setTimeout(() => { formStatus.textContent = ''; }, 6000);
    });
}

/* ── SCROLL REVEAL ── */
ScrollReveal({
    distance: '40px',
    duration: 800,
    delay: 100,
    easing: 'ease-out',
    reset: false,
});

ScrollReveal().reveal('.home-content',            { origin: 'left',   delay: 100 });
ScrollReveal().reveal('.home-img',                { origin: 'right',  delay: 200 });
ScrollReveal().reveal('.about-img',               { origin: 'left',   delay: 100 });
ScrollReveal().reveal('.about-content',           { origin: 'right',  delay: 200 });
ScrollReveal().reveal('.skills-box',              { origin: 'bottom', interval: 130 });
ScrollReveal().reveal('.soft-skills-grid span',   { origin: 'bottom', interval: 50  });
ScrollReveal().reveal('.project-featured',        { origin: 'bottom', delay: 100 });
ScrollReveal().reveal('.project-card',            { origin: 'bottom', interval: 150 });
ScrollReveal().reveal('.timeline-item',           { origin: 'bottom', interval: 180 });
ScrollReveal().reveal('.education-card',          { origin: 'bottom', interval: 120 });
ScrollReveal().reveal('.contact-info',            { origin: 'left',   delay: 100 });
ScrollReveal().reveal('.contact-form',            { origin: 'right',  delay: 200 });
ScrollReveal().reveal('.eyebrow, .heading',       { origin: 'top',    delay: 50  });
ScrollReveal().reveal('.contact-tagline',         { origin: 'top',    delay: 80  });

/* ── TYPED.JS ── */
const typed = new Typed('.multiple-text', {
    strings: [
        'Aspiring IT Professional',
        'BIT-CT Student at CTU',
        'Embedded Systems Developer',
        'Web Developer',
        'OJT Ready 2025',
    ],
    typeSpeed:  65,
    backSpeed:  45,
    backDelay:  1500,
    loop:       true,
});

/* ── GALLERY IMAGE LIGHTBOX (simple) ── */
document.querySelectorAll('.gallery-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(0,0,0,0.92);
            display: flex; align-items: center; justify-content: center;
            cursor: zoom-out; padding: 2rem;
        `;
        const bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.alt = img.alt;
        bigImg.style.cssText = `
            max-width: 90vw; max-height: 88vh;
            object-fit: contain; border-radius: 1rem;
            box-shadow: 0 2rem 6rem rgba(0,0,0,.8);
        `;
        overlay.appendChild(bigImg);
        overlay.addEventListener('click', () => overlay.remove());
        document.body.appendChild(overlay);
    });
});