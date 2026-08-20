// ============================================
// PRELOADER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    }
});

// ============================================
// NAVBAR: Hamburger Menu
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// NAVBAR: Scroll Effect
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
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

moreBtns.forEach((btn) => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.card');
        const extra = card.querySelector('.extra');
        const icon = this.querySelector('i');
        const span = this.querySelector('span');

        if (extra.style.display === 'block') {
            extra.style.display = 'none';
            icon.className = 'fas fa-plus-circle';
            span.textContent = 'Read More';
        } else {
            // Close all other extras
            document.querySelectorAll('.extra').forEach(e => {
                if (e !== extra) {
                    e.style.display = 'none';
                    const parentCard = e.closest('.card');
                    const btn = parentCard.querySelector('.btn-more');
                    btn.querySelector('i').className = 'fas fa-plus-circle';
                    btn.querySelector('span').textContent = 'Read More';
                }
            });
            extra.style.display = 'block';
            icon.className = 'fas fa-minus-circle';
            span.textContent = 'Show Less';
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

if (searchInput) {
    searchInput.addEventListener('keyup', searchPlaces);
}
if (searchBtn) {
    searchBtn.addEventListener('click', searchPlaces);
}

// ============================================
// FILTER TAGS
// ============================================
const tags = document.querySelectorAll('.tag');

tags.forEach(tag => {
    tag.addEventListener('click', function() {
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

        if (searchInput) searchInput.value = '';
    });
});

// ============================================
// STATISTICS COUNTER
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

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// CLOSE EXTRA ON CLICK OUTSIDE
// ============================================
document.addEventListener('click', function(e) {
    document.querySelectorAll('.extra').forEach(extra => {
        if (extra.style.display === 'block') {
            const card = extra.closest('.card');
            if (!card.contains(e.target)) {
                extra.style.display = 'none';
                const btn = card.querySelector('.btn-more');
                btn.querySelector('i').className = 'fas fa-plus-circle';
                btn.querySelector('span').textContent = 'Read More';
            }
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
// ESC KEY TO CLOSE EXTRAS
// ============================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.extra').forEach(extra => {
            if (extra.style.display === 'block') {
                extra.style.display = 'none';
                const card = extra.closest('.card');
                const btn = card.querySelector('.btn-more');
                btn.querySelector('i').className = 'fas fa-plus-circle';
                btn.querySelector('span').textContent = 'Read More';
            }
        });
    }
});

// ============================================
// ANIMATE ON SCROLL (using Intersection Observer)
// ============================================
const animateElements = document.querySelectorAll('.animate__animated');

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => {
                el.classList.add('animate__fadeInUp');
                el.style.opacity = '1';
            }, delay);
            animateObserver.unobserve(el);
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => {
    el.style.opacity = '0';
    animateObserver.observe(el);
});

console.log('🌟 Samarkand.uz — Website loaded successfully!');