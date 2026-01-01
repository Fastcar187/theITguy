// theITguy Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            navMenu.setAttribute('aria-hidden', !isOpen);
        });

        // Allow keyboard activation (Enter / Space)
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', false);
                navMenu.setAttribute('aria-hidden', true);
            }
        });
    });
    
    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Hero Animation - Simulated Lottie Animation
    function createHeroAnimation() {
        const heroAnimation = document.getElementById('hero-animation');
        if (!heroAnimation) return;
        
        // Create a simple animated tech illustration
        const animationContainer = document.createElement('div');
        animationContainer.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
        `;
        
        // Create floating code elements
        const codeElements = [
            '<div>function() {</div>',
            '<div>  return "Hello Tech";</div>',
            '<div>}</div>'
        ];
        
        codeElements.forEach((code, index) => {
            const codeDiv = document.createElement('div');
            codeDiv.innerHTML = code;
            codeDiv.style.cssText = `
                font-family: 'Courier New', monospace;
                font-size: 14px;
                color: #0369A1;
                margin: 2px 0;
                opacity: 0;
                animation: fadeInCode 2s ease-in-out ${index * 0.5}s forwards;
                text-shadow: 0 0 10px rgba(3, 105, 161, 0.5);
            `;
            animationContainer.appendChild(codeDiv);
        });
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInCode {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            #hero-animation {
                position: relative;
            }
            
            #hero-animation::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 200px;
                height: 200px;
                background: linear-gradient(45deg, #0369A1, #818CF8);
                border-radius: 50%;
                opacity: 0.1;
                transform: translate(-50%, -50%);
                animation: pulse 4s ease-in-out infinite;
                z-index: -1;
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0.1;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.2);
                    opacity: 0.2;
                }
            }
        `;
        document.head.appendChild(style);
        
        heroAnimation.appendChild(animationContainer);
    }
    
    // Repair Lab Animation
    function createRepairAnimation() {
        const repairAnimation = document.getElementById('repair-animation');
        if (!repairAnimation) return;
        
        // Create animated repair icon
        const repairContainer = document.createElement('div');
        repairContainer.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        `;
        
        // Create a simple gear animation
        const gear = document.createElement('div');
        gear.innerHTML = `
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3" fill="#0369A1"></circle>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="#0369A1" stroke-width="2" fill="none">
                    <animateTransform attributeName="transform" type="rotate" dur="4s" values="0 12 12;360 12 12" repeatCount="indefinite"/>
                </path>
            </svg>
        `;
        
        gear.style.cssText = `
            animation: rotate 4s linear infinite;
            filter: drop-shadow(0 0 20px rgba(3, 105, 161, 0.5));
        `;
        
        // Add rotation animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
        
        repairContainer.appendChild(gear);
        repairAnimation.appendChild(repairContainer);
    }
    
    // Initialize animations
    createHeroAnimation();
    createRepairAnimation();
    
    // Scroll Animations
    function observeElements() {
        const elements = document.querySelectorAll('.service-card, .product-card, .section-title, .section-subtitle');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    observeElements();
    
    // Parallax Effect for Hero Background
    function handleParallax() {
        const orbs = document.querySelectorAll('.gradient-orb');
        const scrolled = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.5;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    
    window.addEventListener('scroll', handleParallax);
    
    // Form Handling
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            backdrop-filter: blur(20px);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Add notification animations
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideInRight {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            0% {
                transform: translateX(0);
                opacity: 1;
            }
            100% {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyle);
    
    // CTA Button Interactions
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Get Started')) {
                e.preventDefault();
                document.getElementById('services').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (this.textContent.includes('Book a Fix')) {
                e.preventDefault();
                showNotification('Repair booking feature coming soon!', 'info');
            } else if (this.textContent.includes('Send Message')) {
                // Form submission is handled above
            }
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero content
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        
        if (heroTitle) heroTitle.style.animation = 'fadeInUp 0.8s ease-out 0.2s both';
        if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 0.8s ease-out 0.4s both';
        if (heroButtons) heroButtons.style.animation = 'fadeInUp 0.8s ease-out 0.6s both';
    });
    
    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Uncomment the following line if you want typing effect
    // typeWriter(document.querySelector('.hero-title'), 'Your One-Stop Tech Solution', 50);
    
    console.log('theITguy Landing Page initialized successfully! 🚀');
});

// Additional mobile menu styles
// mobile menu styles are now defined in CSS for consistency