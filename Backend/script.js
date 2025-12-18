// Import MySQL module for database operations
const mysql = require('mysql');

/**
 * Navigation Toggle with improved accessibility
 * Handles mobile menu toggle functionality
 */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

/**
 * Toggle navigation menu state
 * @param {boolean} isExpanded - Current expansion state
 */
function toggleNav(isExpanded) {
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('active');
}

// Add click event listener for navigation toggle
navToggle.addEventListener('click', () => toggleNav(navToggle.getAttribute('aria-expanded') === 'true'));

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.querySelector('.hamburger').classList.remove('active');
    }
});

// Handle Escape key for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleNav(true);
    }
});

/**
 * Enhanced Parallax Effect with performance optimization
 * Applies parallax scrolling effect to elements with parallax class
 */
const handleParallax = () => {
    const scrolled = window.pageYOffset;
    requestAnimationFrame(() => {
        document.querySelectorAll('.parallax').forEach(element => {
            element.style.transform = `translateY(${scrolled * (element.dataset.speed || 0.5)}px)`;
        });
    });
};

// Debounced scroll handler for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    scrollTimeout && window.cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(handleParallax);
});

/**
 * Enhanced smooth scroll with better performance and accessibility
 * @param {HTMLElement} target - Target element to scroll to
 * @param {number} duration - Scroll animation duration in milliseconds
 */
const smoothScroll = (target, duration = 1000) => {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = currentTime => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, startPosition + (distance * easeInOutCubic(progress)));
        progress < 1 && requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
};

// Enhanced smooth scroll implementation with keyboard support
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    ['click', 'keydown'].forEach(event => {
        anchor.addEventListener(event, function(e) {
            if (event === 'keydown' && e.key !== 'Enter') return;
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScroll(target);
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
});

/**
 * Enhanced Intersection Observer for Animations
 * Handles scroll-based animations for various elements
 */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            entry.target.dataset.delay && entry.target.style.setProperty('--delay', entry.target.dataset.delay);
            entry.target.classList.contains('count-up') && startCountUp(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

// Observe all animated elements
document.querySelectorAll('.slide-in, .fade-in, .zoom-in, .count-up, .section-title, .feature-card')
    .forEach(el => observer.observe(el));

/**
 * Counter Animation
 * Animates numerical values from 0 to target value
 * @param {HTMLElement} element - Element containing the counter
 */
function startCountUp(element) {
    const target = parseInt(element.dataset.target);
    const step = target / 125; // 2000ms / 16ms ≈ 125 steps for 60fps
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else element.textContent = target.toLocaleString();
    };
    updateCounter();
}

/**
 * Enhanced hover effects for cards
 * Applies 3D transform effect on hover
 */
document.querySelectorAll('.vehicle-card, .feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (y - rect.height / 2) / 25;
        const rotateY = (rect.width / 2 - x) / 25;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/**
 * Enhanced button hover effects
 * Applies ripple effect on hover
 */
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty('--x', `${e.clientX - rect.left}px`);
        button.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
});