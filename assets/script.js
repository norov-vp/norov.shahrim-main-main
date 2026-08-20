// ============================================
// NAVBAR: Hamburger Menu
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close menu on link click (mobile)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// ============================================
// NAVBAR: Scroll Effect
// ============================================
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// NAVBAR: Active Link Highlight
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
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

// ============================================
// SHOW MORE / LESS
// ============================================
const moreBtns = document.querySelectorAll('.btn-more');

moreBtns.forEach((btn, index) => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const card = this.closest('.card');
        const extra = card.querySelector('.extra');
        const icon = this.querySelector('i');
        const span = this.querySelector('span');

        if (extra.style.display === 'block') {
            extra.style.display = 'none';
            icon.className = 'fas fa-plus-circle';
            span.textContent = "Ko'proq";
        } else {
            extra.style.display = 'block';
            icon.className = 'fas fa-minus-circle';
            span.textContent = "Qisqartirish";
        }
    });
});

// ============================================
// SEARCH FUNCTION
// ============================================
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function searchPlaces() {
    const query = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (query === '') {
            card.classList.remove('hidden');
        } else {
            card.classList.toggle('hidden', !text.includes(query));
        }
    });
}

searchInput.addEventListener('keyup', searchPlaces);
searchBtn.addEventListener('click', searchPlaces);

// ============================================
// FILTER TAGS
// ============================================
const tags = document.querySelectorAll('.tag');

tags.forEach(tag => {
    tag.addEventListener('click', function () {
        // Remove active from all tags
        tags.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
            } else {
                const categories = card.dataset.category.split(' ');
                if (categories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });

        // Clear search input when filter is applied
        searchInput.value = '';
    });
});

// ============================================
// STATISTICS COUNTER (with Intersection Observer)
// ============================================
const statItems = document.querySelectorAll('.stat-item');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const target = parseInt(stat.dataset.count);
            const numberSpan = stat.querySelector('.stat-number');
            let current = 0;
            const increment = Math.ceil(target / 40);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    numberSpan.textContent = target;
                    clearInterval(timer);
                } else {
                    numberSpan.textContent = current;
                }
            }, 30);
            counterObserver.unobserve(stat);
        }
    });
}, { threshold: 0.5 });

statItems.forEach(item => counterObserver.observe(item));

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// CLOSE EXTRA CONTENT ON CLICK OUTSIDE
// ============================================
document.addEventListener('click', function (e) {
    const extras = document.querySelectorAll('.extra');
    const buttons = document.querySelectorAll('.btn-more');

    extras.forEach((extra, index) => {
        if (extra.style.display === 'block') {
            const card = extra.closest('.card');
            const btn = card.querySelector('.btn-more');
            if (!card.contains(e.target)) {
                extra.style.display = 'none';
                const icon = btn.querySelector('i');
                const span = btn.querySelector('span');
                icon.className = 'fas fa-plus-circle';
                span.textContent = "Ko'proq";
            }
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 70;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================
// KEYBOARD SHORTCUT: ESC to close extras
// ============================================
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const extras = document.querySelectorAll('.extra');
        extras.forEach(extra => {
            if (extra.style.display === 'block') {
                extra.style.display = 'none';
                const card = extra.closest('.card');
                const btn = card.querySelector('.btn-more');
                const icon = btn.querySelector('i');
                const span = btn.querySelector('span');
                icon.className = 'fas fa-plus-circle';
                span.textContent = "Ko'proq";
            }
        });
    }
});

console.log('🌟 Samarqand.uz — Tarix va madaniyat sayti yuklandi!');