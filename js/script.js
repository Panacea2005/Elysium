// Performance monitoring
const performanceMonitor = {
    startTime: performance.now(),
    
    logPageLoadTime() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`Page load time: ${loadTime}ms`);
        });
    },

    trackUserInteractions() {
        const interactions = [];
        document.addEventListener('click', (e) => {
            interactions.push({
                type: 'click',
                element: e.target.tagName,
                timestamp: new Date().toISOString()
            });
        });
    }
};

// Analytics tracking
const analytics = {
    trackEvent(category, action, label) {
        // Integration with Google Analytics or custom analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    },

    trackPageView(page) {
        this.trackEvent('page_view', 'view', page);
    }
};

// Enhanced UI/UX features
const uiEnhancements = {
    initializeAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        });

        animatedElements.forEach(el => observer.observe(el));
    },

    smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
};

// Form validation and handling
const formHandler = {
    initialize() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        });
    },

    handleSubmit(e) {
        e.preventDefault();
        if (this.validateForm(e.target)) {
            this.submitForm(e.target);
        }
    },

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value) {
                isValid = false;
                this.showError(input, 'This field is required');
            }
        });

        return isValid;
    },

    showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        element.parentNode.appendChild(errorDiv);
    }
};

// Responsive handling
const responsiveHandler = {
    initialize() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this));
    },

    handleResize() {
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('is-mobile', isMobile);
    }
};

// Error handling and logging
const errorHandler = {
    initialize() {
        window.onerror = this.handleError.bind(this);
    },

    handleError(msg, url, lineNo, columnNo, error) {
        const errorLog = {
            message: msg,
            url: url,
            lineNumber: lineNo,
            columnNumber: columnNo,
            error: error?.stack,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };

        console.error('Error logged:', errorLog);
        // Send to error tracking service
    }
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    performanceMonitor.logPageLoadTime();
    performanceMonitor.trackUserInteractions();
    uiEnhancements.initializeAnimations();
    uiEnhancements.smoothScroll();
    formHandler.initialize();
    responsiveHandler.initialize();
    errorHandler.initialize();
});

document.querySelector('.toggle-details').addEventListener('click', function() {
    var details = document.getElementById('details');
    if (details.style.display === 'none') {
        details.style.display = 'block';
        this.textContent = 'Less Details'; // Change text to 'Less Details' when expanded
    } else {
        details.style.display = 'none';
        this.textContent = 'More Details'; // Change text back to 'More Details' when hidden
    }
});

// FADE FADE FADE

document.addEventListener('DOMContentLoaded', function() {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
        distance: '30px',
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        interval: 100,
        scale: 1,
        viewFactor: 0.3,
        mobile: true
    });

    // Reveal animations
    sr.reveal('.reveal-fade-up', {
        origin: 'bottom',
        cleanup: true
    });

    sr.reveal('.reveal-fade-left', {
        origin: 'left',
        cleanup: true
    });

    sr.reveal('.reveal-fade-right', {
        origin: 'right',
        cleanup: true
    });

    // Add scroll-based parallax effect for existing elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.dashboard-preview::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Enhance existing animations
    const existingAnimations = {
        '.tech-hero h1': { delay: 200 },
        '.tech-hero p': { delay: 400 },
        '.dashboard-image': { delay: 300 },
        '.sensor-card': { interval: 150 },
        '.feature-list li': { interval: 100 },
        '.point': { interval: 200 }
    };

    Object.entries(existingAnimations).forEach(([selector, options]) => {
        sr.reveal(selector, options);
    });
});