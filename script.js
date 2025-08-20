// Smooth scrolling for navigation links
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

// Add active class to navigation items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.credential-card, .service-card, .contact-method, .social-link');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Mobile menu functionality (if needed)
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const ul = nav.querySelector('ul');
    
    if (window.innerWidth <= 768) {
        if (!nav.querySelector('.mobile-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #8B4513;
                cursor: pointer;
                display: block;
                margin: 0 auto;
            `;
            
            nav.insertBefore(toggle, ul);
            
            toggle.addEventListener('click', () => {
                ul.style.display = ul.style.display === 'none' ? 'flex' : 'none';
            });
            
            ul.style.display = 'none';
            ul.style.flexDirection = 'column';
            ul.style.position = 'absolute';
            ul.style.top = '100%';
            ul.style.left = '0';
            ul.style.right = '0';
            ul.style.background = 'rgba(245, 240, 230, 0.98)';
            ul.style.padding = '1rem';
            ul.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
    }
};

window.addEventListener('resize', createMobileMenu);
document.addEventListener('DOMContentLoaded', createMobileMenu);