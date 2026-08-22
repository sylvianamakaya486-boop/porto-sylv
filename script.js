// ===== DARK MODE =====
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===== MENU HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== CARROUSEL VERTICAL =====
const contactItems = document.querySelectorAll('.contact-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
let autoPlayInterval;

function showItem(index) {
    // S'assurer que l'index est dans les limites
    if (index < 0) index = contactItems.length - 1;
    if (index >= contactItems.length) index = 0;
    
    // Masquer tous les items
    contactItems.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Afficher l'item actif
    contactItems[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentIndex = index;
}

function nextItem() {
    showItem(currentIndex + 1);
}

function prevItem() {
    showItem(currentIndex - 1);
}

// Navigation par boutons
nextBtn.addEventListener('click', () => {
    nextItem();
    resetAutoPlay();
});

prevBtn.addEventListener('click', () => {
    prevItem();
    resetAutoPlay();
});

// Navigation par points
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showItem(index);
        resetAutoPlay();
    });
});

// Auto-play
function startAutoPlay() {
    autoPlayInterval = setInterval(nextItem, 4000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Démarrer l'auto-play
startAutoPlay();

// Stopper l'auto-play au survol
const carouselWrapper = document.querySelector('.contact-carousel-wrapper');
carouselWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});
carouselWrapper.addEventListener('mouseleave', () => {
    startAutoPlay();
});

// ===== COMPTEUR D'ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            
            stat.textContent = current + (target > 10 ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                stat.textContent = target + (target > 10 ? '+' : '');
            }
        };
        
        requestAnimationFrame(update);
    });
};

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    observer.observe(aboutSection);
}

// ===== ANIMATION DES PROJETS AU SCROLL =====
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            projectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    projectObserver.observe(card);
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== CONSOLE FUN =====
console.log('%c🚀 Portfolio KENGUE PEMBA Rodilène Sylviana', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%c👨‍💻 Étudiante en Génie Informatique', 'font-size: 14px; color: #64748b;');
console.log('%c📧 Contact : sylvianamakaya486@gmail.com', 'font-size: 14px; color: #64748b;');