// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add scroll animations to elements
    function initScrollAnimations() {
        // Add animation classes to elements
        const sections = document.querySelectorAll('.about, .services, .portfolio, .contact');
        sections.forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });

        // Service cards animations
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.2}s`;
            observer.observe(card);
        });

        // Portfolio items animations - Updated for slideshow
        const portfolioSection = document.querySelector('.portfolio-slideshow');
        if (portfolioSection) {
            portfolioSection.classList.add('fade-in');
            observer.observe(portfolioSection);
        }

        // About content animations
        const aboutText = document.querySelector('.about-text');
        const aboutImage = document.querySelector('.about-image');
        if (aboutText && aboutImage) {
            aboutText.classList.add('slide-in-left');
            aboutImage.classList.add('slide-in-right');
            observer.observe(aboutText);
            observer.observe(aboutImage);
        }
    }

    // Parallax effect for hero section
    function handleParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }
    }

    // Initialize scroll animations
    initScrollAnimations();
    
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Header scroll effect with throttling
    let ticking = false;
    function updateHeader() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Add parallax effect
        handleParallax();
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Professional Slideshow Functionality
    function initSlideshow() {
        const slides = document.querySelectorAll('.slide');
        const navDots = document.querySelectorAll('.nav-dot');
        const progressBar = document.querySelector('.progress-bar');
        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 5000; // 5 seconds per slide
        
        if (!slides.length) return;

        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => {
                slide.classList.remove('active', 'prev');
            });
            navDots.forEach(dot => {
                dot.classList.remove('active');
            });

            // Add prev class to current slide for smooth transition
            if (slides[currentSlide]) {
                slides[currentSlide].classList.add('prev');
            }

            // Update current slide index
            currentSlide = index;
            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;

            // Show new slide
            slides[currentSlide].classList.add('active');
            navDots[currentSlide].classList.add('active');

            // Reset and start progress bar
            resetProgressBar();
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function resetProgressBar() {
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
                
                // Force reflow
                progressBar.offsetHeight;
                
                // Start progress animation
                progressBar.style.transition = `width ${slideDuration}ms linear`;
                progressBar.style.width = '100%';
            }
        }

        function startSlideshow() {
            resetProgressBar();
            slideInterval = setInterval(nextSlide, slideDuration);
        }

        function stopSlideshow() {
            clearInterval(slideInterval);
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
            }
        }

        // Navigation dot click handlers
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlideshow();
                showSlide(index);
                startSlideshow();
            });
        });

        // Pause on hover
        const slideshowContainer = document.querySelector('.portfolio-slideshow');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', stopSlideshow);
            slideshowContainer.addEventListener('mouseleave', startSlideshow);
        }

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        if (slideshowContainer) {
            slideshowContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            slideshowContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                stopSlideshow();
                if (diff > 0) {
                    // Swipe left - next slide
                    showSlide(currentSlide + 1);
                } else {
                    // Swipe right - previous slide
                    showSlide(currentSlide - 1);
                }
                startSlideshow();
            }
        }

        // Initialize slideshow
        showSlide(0);
        startSlideshow();

        // Pause slideshow when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopSlideshow();
            } else {
                startSlideshow();
            }
        });
    }

    // Initialize slideshow
    initSlideshow();

    // Form Submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const eventType = document.getElementById('event-type').value.trim();
            const eventDate = document.getElementById('event-date').value;
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Logo click to scroll to top
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

});

// Function to show notifications
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = type === 'error' ? '#e74c3c' : '#2ecc71';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '10000';
    notification.style.transition = 'all 0.3s ease';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}