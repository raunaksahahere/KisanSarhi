// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation Bar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
    });
});

// Auth Button Handlers
const signinBtn = document.getElementById('signin-btn');
const signupBtn = document.getElementById('signup-btn');

if (signinBtn) {
    signinBtn.addEventListener('click', () => {
        showNotification('🔐 Sign In feature coming soon!');
    });
}

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        showNotification('📝 Sign Up feature coming soon!');
    });
}

// Button Click Handlers with Bounce Animation
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        // Add bounce effect
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);

        // Button-specific actions
        const buttonId = this.id;

        if (buttonId === 'start-simulation-btn') {
            console.log('Starting simulation...');
            // Future: Navigate to simulation page
            showNotification('🌱 Simulation starting soon!');
        } else if (buttonId === 'meet-sarthi-btn' || buttonId === 'try-sarthi-btn') {
            console.log('Opening Sarthi AI...');
            // Future: Open AI chat interface
            scrollToSection('ai-assistant');
            showNotification('🤖 Meet Sarthi, your farming financial companion!');
        }
    });
});

// Scroll-triggered Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Special animations for specific sections
            if (entry.target.classList.contains('step-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }

            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }

            // Animate meters when dashboard comes into view
            if (entry.target.classList.contains('dashboard-mockup')) {
                animateMeters();
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.step-card, .feature-card, .dashboard-mockup, .ai-mascot').forEach(el => {
    observerOptions.threshold = 0.15;
    animateOnScroll.observe(el);
});

// Animate Dashboard Meters
function animateMeters() {
    const meters = document.querySelectorAll('.meter-fill');
    meters.forEach(meter => {
        const targetWidth = meter.style.width;
        meter.style.width = '0%';
        setTimeout(() => {
            meter.style.width = targetWidth;
        }, 200);
    });
}

// Scroll to Section Helper
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Show Notification (Simple Toast)
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #1f6f2f 0%, #4CAF50 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(15, 61, 30, 0.3);
        font-weight: 600;
        font-size: 1rem;
        z-index: 1000;
        animation: slideInUp 0.4s ease, slideOutDown 0.4s ease 2.6s;
        border: 3px solid white;
    `;

    document.body.appendChild(notification);

    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax Effect for Hero Section
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');

    if (hero && scrollY < window.innerHeight) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }

    lastScrollY = scrollY;
});

// Add hover sound effect simulation (visual feedback)
document.querySelectorAll('.step-card, .feature-card, .transaction-item').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// Robot Animation - Make eyes blink
setInterval(() => {
    const eyes = document.querySelectorAll('.robot-eyes .eye');
    eyes.forEach(eye => {
        eye.style.transform = 'scaleY(0.1)';
        setTimeout(() => {
            eye.style.transform = 'scaleY(1)';
        }, 150);
    });
}, 4000);

// Add transition to eyes
document.querySelectorAll('.robot-eyes .eye').forEach(eye => {
    eye.style.transition = 'transform 0.1s ease';
});

// Performance: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add('reduce-motion');
    const reduceMotionStyle = document.createElement('style');
    reduceMotionStyle.textContent = `
        .reduce-motion * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(reduceMotionStyle);
}

// Console welcome message
console.log('%c🌾 KisanSarthi - Financial Learning Platform', 'color: #4CAF50; font-size: 20px; font-weight: bold;');
console.log('%cBuilt for farmers, powered by technology 💚', 'color: #1f6f2f; font-size: 14px;');

// Initialize on page load
window.addEventListener('load', () => {
    console.log('KisanSarthi loaded successfully!');

    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.animation = 'slideUp 0.6s ease forwards';
            }, index * 100);
        });
    }, 100);
});

// Css thik korle etao thik korte hbe


/* DISABLED: Uncomment to re-enable animation

// Sickle Reveal Intersection Observer
const sickleRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
            // Add revealed class to trigger animation
            entry.target.classList.add('revealed');

            // Unobserve after revealing (one-time animation)
            sickleRevealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

// Initialize Sickle Reveal on Sections
function initSickleReveal() {
    // Select sections to apply reveal animation
    const revealSections = document.querySelectorAll('.how-it-works, .features, .ai-assistant, .dashboard-preview');

    revealSections.forEach(section => {
        // Add reveal-section class
        section.classList.add('reveal-section');

        // Observe section
        sickleRevealObserver.observe(section);
    });

    console.log('Subtle sickle scroll reveal initialized on', revealSections.length, 'sections');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSickleReveal);
} else {
    initSickleReveal();
}

END DISABLED */

