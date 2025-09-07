// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isActive = answer.classList.contains('active');
        
        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.classList.remove('active');
        });
        
        // Toggle current answer
        if (!isActive) {
            answer.classList.add('active');
        }
    });
});

// RSVP form handling
document.querySelector('.rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Here you would typically send the data to a server
    // For now, we'll just show a confirmation message
    showConfirmationMessage();
});

function showConfirmationMessage() {
    const form = document.querySelector('.rsvp-form');
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'confirmation-message';
    confirmationDiv.innerHTML = `
        <h3>Děkujeme za potvrzení!</h3>
        <p>Vaše odpověď byla odeslána. Těšíme se na vás!</p>
    `;
    
    // Style the confirmation message
    confirmationDiv.style.cssText = `
        background-color: var(--accent-cream);
        border: 2px solid var(--main-color);
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        margin-top: 2rem;
        color: var(--secondary-color);
    `;
    
    form.appendChild(confirmationDiv);
    
    // Hide the form
    form.querySelectorAll('.form-group, .submit-btn').forEach(el => {
        el.style.display = 'none';
    });
    
    // Scroll to confirmation
    confirmationDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Gallery lightbox functionality
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', function() {
        openLightbox(this.src, this.alt);
    });
});

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${alt}">
        </div>
    `;
    
    // Style the lightbox
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
        width: 100%;
        height: auto;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        z-index: 2001;
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox functionality
    closeBtn.addEventListener('click', () => closeLightbox(lightbox));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox(lightbox);
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox(lightbox);
        }
    });
}

function closeLightbox(lightbox) {
    lightbox.remove();
}

// Mobile menu toggle (for smaller screens)
function createMobileMenu() {
    const nav = document.querySelector('nav');
    const ul = nav.querySelector('ul');
    
    // Create mobile menu button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--secondary-color);
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    nav.insertBefore(menuToggle, ul);
    
    // Toggle menu on mobile
    menuToggle.addEventListener('click', function() {
        ul.classList.toggle('mobile-menu-active');
    });
    
    // Show mobile toggle on small screens
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMediaQuery(e) {
        if (e.matches) {
            menuToggle.style.display = 'block';
            ul.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: var(--white);
                flex-direction: column;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                display: none;
                padding: 1rem 0;
            `;
        } else {
            menuToggle.style.display = 'none';
            ul.style.cssText = '';
            ul.classList.remove('mobile-menu-active');
        }
    }
    
    mediaQuery.addListener(handleMediaQuery);
    handleMediaQuery(mediaQuery);
    
    // Add CSS for mobile menu active state
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-active {
            display: flex !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize mobile menu
createMobileMenu();

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Form validation
function validateForm() {
    const form = document.querySelector('.rsvp-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = 'var(--main-color)';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = 'var(--main-color)';
            }
        });
    });
}

// Initialize form validation
validateForm();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

console.log('Svatební web načten úspěšně! 💕');