// Set the launch date (30 days from now)
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 30);

// Countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate.getTime() - now;

    if (distance < 0) {
        // Launch date has passed
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Add leading zeros
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // Add pulse animation when seconds change
    const secondsElement = document.getElementById('seconds');
    secondsElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        secondsElement.style.transform = 'scale(1)';
    }, 100);
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Email form functionality removed

// Removed navigation functionality since header was removed

// Enhanced interactive effects
function initInteractiveEffects() {
    // Add hover effects to countdown items
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Enhanced parallax effect for floating shapes
    let ticking = false;
    
    function updateParallax() {
        const shapes = document.querySelectorAll('.shape');
        const mouseX = (window.mouseX || 0) / window.innerWidth;
        const mouseY = (window.mouseY || 0) / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    document.addEventListener('mousemove', function(e) {
        window.mouseX = e.clientX;
        window.mouseY = e.clientY;
        requestTick();
    });
    
    // Add loading animation
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        line.style.animationDelay = `${0.2 + index * 0.2}s`;
    });
    
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards for animation
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add keyboard navigation support
function initKeyboardNavigation() {
    // Keyboard navigation simplified since no email form
}

// Add touch support for mobile devices
function initTouchSupport() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('button, .nav-link, .social-link');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initInteractiveEffects();
    initKeyboardNavigation();
    initTouchSupport();
});

// Add some ambient background effects
function initAmbientEffects() {
    // Create subtle background particles
    const backgroundAnimation = document.querySelector('.background-animation');
    
    // Removed cursor glow effect for cleaner design
}

// Initialize ambient effects
initAmbientEffects(); 