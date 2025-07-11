// Add smooth scroll and contact form feedback

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for nav links and active link highlight
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    // Highlight nav link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    // Enhanced nav highlight on scroll for all sections
    const sectionIds = [
        'about',
        'skills',
        'services',
        'portfolio',
        'projects',
        'mainpages',
        'disclaimers'
    ];
    function highlightNavOnScroll() {
        let scrollPos = window.scrollY || window.pageYOffset;
        let found = false;
        for (let i = sectionIds.length - 1; i >= 0; i--) {
            const section = document.getElementById(sectionIds[i]);
            if (section) {
                const offset = section.offsetTop - 120;
                if (scrollPos >= offset) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`nav ul li a[href="#${sectionIds[i]}"]`);
                    if (activeLink) activeLink.classList.add('active');
                    found = true;
                    break;
                }
            }
        }
        if (!found) navLinks.forEach(link => link.classList.remove('active'));
    }
    window.addEventListener('scroll', highlightNavOnScroll);
    document.addEventListener('DOMContentLoaded', highlightNavOnScroll);
    // Portfolio item tilt effect
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * -8;
            item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
        });
        item.addEventListener('mouseleave', function() {
            item.style.transform = '';
        });
    });
    // Contact form feedback
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            form.reset();
            const msg = document.createElement('div');
            msg.textContent = 'Thank you for reaching out! I will get back to you soon.';
            msg.style.background = 'linear-gradient(90deg,#00c3ff,#b2fefa)';
            msg.style.color = '#232526';
            msg.style.padding = '1rem';
            msg.style.borderRadius = '8px';
            msg.style.marginTop = '1rem';
            msg.style.textAlign = 'center';
            form.parentNode.appendChild(msg);
            setTimeout(() => msg.remove(), 3500);
        });
    }
    function openPage(url) {
        window.open(url, '_blank');
    }
    // Add scroll-triggered animation for .master > .fade-item in Projects, Main Pages, and Disclaimers

    function animateOnScroll(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        const master = section.querySelector('.master');
        if (!master) return;
        const items = master.querySelectorAll('.fade-item');
        let animated = false;
        function onScroll() {
            if (animated) return;
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                items.forEach(item => item.classList.add('animated'));
                animated = true;
                window.removeEventListener('scroll', onScroll);
            }
        }
        window.addEventListener('scroll', onScroll);
        onScroll(); // in case already in view
    }
    animateOnScroll('projects');
    animateOnScroll('mainpages');
    animateOnScroll('disclaimers');
    // Make .master > .fade-item clickable for Projects, Main Pages, Disclaimers
    function makeMasterDivsClickable(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        const master = section.querySelector('.master');
        if (!master) return;
        master.querySelectorAll('.fade-item').forEach(div => {
            const h1 = div.querySelector('h1');
            if (h1 && h1.hasAttribute('onclick')) {
                const handler = h1.getAttribute('onclick');
                div.style.cursor = 'pointer';
                div.onclick = function(e) {
                    // Prevent double navigation if h1 is clicked
                    if (e.target === h1) return;
                    // Evaluate the onclick handler (openPage(...))
                    eval(handler);
                };
            }
        });
    }
    makeMasterDivsClickable('projects');
    makeMasterDivsClickable('mainpages');
    makeMasterDivsClickable('disclaimers');
    // Typing animation for About Me
    const aboutText = "Creative DJ, virtualization enthusiast, and passionate gamer. I blend music, technology, building virtual environments, and competitive gaming. Always exploring the latest in music tech, virtual machines, and gaming trends.";
    const aboutElem = document.getElementById('about-typed');
    let aboutIdx = 0;
    function typeAbout() {
        if (aboutElem && aboutIdx < aboutText.length) {
            aboutElem.textContent += aboutText.charAt(aboutIdx);
            aboutIdx++;
            setTimeout(typeAbout, 25);
        }
    }
    typeAbout();
    // Back to Top button logic
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // Nav scroll tracker to highlight active section
    (function() {
        const navLinks = document.querySelectorAll('nav a');
        const sections = Array.from(document.querySelectorAll('section'));
        function highlightNavOnScroll() {
            let current = '';
            const scrollPos = window.scrollY + 120;
            for (let i = 0; i < sections.length; i++) {
                if (scrollPos >= sections[i].offsetTop) {
                    current = sections[i].getAttribute('id');
                }
            }
            // If at the very top, highlight 'about'
            if (window.scrollY < sections[0].offsetTop + 50) {
                current = 'about';
            }
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }
        window.addEventListener('scroll', highlightNavOnScroll);
        highlightNavOnScroll(); // Run on load
    })();
});
