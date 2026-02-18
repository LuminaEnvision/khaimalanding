// ===================================
// KHAIMA - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // Video/Image Background Slideshow
    // ===================================
    // Video background is now a single autoplaying element

    // ===================================
    // Parallax Effect
    // ===================================
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.video-background');
    const floatingImg = document.querySelector('.floating-image-wrapper');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
        }

        if (floatingImg) {
            floatingImg.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.15}px))`;
        }

        // Parallax for story images
        document.querySelectorAll('.story-image img').forEach(img => {
            const speed = 0.15;
            const rect = img.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(rect.top * speed);
                img.style.transform = `translateY(${yPos}px) scale(1.1)`;
            }
        });
    });

    // Mouse movement parallax for floating image (only vertical flow)
    if (hero && floatingImg) {
        hero.addEventListener('mousemove', (e) => {
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            // Removed x-axis movement to keep it "flowing" vertically only
            floatingImg.style.marginTop = `${y}px`;
        });
    }

    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.background = 'rgba(10, 11, 9, 0.95)';
            header.style.padding = '1.5rem 4rem';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent)';
            header.style.padding = '2.5rem 4rem';
            header.style.backdropFilter = 'none';
        }
    });

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===================================
    // Inquiry Form Handling
    // ===================================
    // Inquiry Form Handling
    // ===================================
    const inquiryForm = document.getElementById('inquiryForm');
    const formSuccess = document.getElementById('formSuccess');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(inquiryForm);
            const data = Object.fromEntries(formData);

            // Log form data
            console.log('Form submitted:', data);

            // Show success message
            inquiryForm.style.display = 'none';
            if (formSuccess) {
                formSuccess.style.display = 'block';
            }
        });
    }

    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.feature-card, .menu-card, .info-card, .faq-item, .contact-item, .story-block, .story-quote-block');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// ===================================
// Interactive Menu Functions
// ===================================
function flipCard(id) {
    const card = document.getElementById(id);
    if (card) {
        card.classList.toggle('flipped');
    }
}

function toggleAcc(id, cardId) {
    const el = document.getElementById(id);
    const card = document.getElementById(cardId);
    if (!el || !card) return;

    const wasOpen = el.classList.contains('open');

    // Close all other accordions in this specific card
    card.querySelectorAll('.acc-item.open').forEach(item => {
        if (item !== el) {
            item.classList.remove('open');
        }
    });

    // Toggle the clicked one
    el.classList.toggle('open');
}

// Add to Window for Global Access
window.flipCard = flipCard;
window.toggleAcc = toggleAcc;
window.resetForm = resetForm;
