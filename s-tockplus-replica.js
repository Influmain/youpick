// Coin Ticker Animation
function initCoinTicker() {
    const ticker = document.querySelector('.ticker-content');
    const coins = [
        { name: 'BTC', price: '$43,250', change: '+2.45%', positive: true },
        { name: 'ETH', price: '$2,680', change: '+1.82%', positive: true },
        { name: 'BNB', price: '$315', change: '-0.65%', positive: false },
        { name: 'ADA', price: '$0.58', change: '+3.21%', positive: true },
        { name: 'DOT', price: '$7.82', change: '+4.15%', positive: true },
        { name: 'LINK', price: '$14.95', change: '-1.23%', positive: false },
        { name: 'XRP', price: '$0.62', change: '+0.89%', positive: true },
        { name: 'SOL', price: '$98.45', change: '+5.67%', positive: true }
    ];
    
    // Duplicate coins for seamless scrolling
    const duplicatedCoins = [...coins, ...coins];
    
    ticker.innerHTML = duplicatedCoins.map(coin => `
        <div class="coin-item">
            <span class="coin-name">${coin.name}</span>
            <span class="coin-price">${coin.price}</span>
            <span class="coin-change ${coin.positive ? 'positive' : 'negative'}">${coin.change}</span>
        </div>
    `).join('');
}

// Navigation Scroll Effect
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe sections and cards
    const elementsToAnimate = document.querySelectorAll(
        'section, .service-card, .feature-item, .news-item, .testimonial-item'
    );
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Performance Chart
function createPerformanceChart() {
    const canvas = document.getElementById('performanceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 100;
    
    // Sample data points
    const points = [
        {x: 0, y: 80},
        {x: 50, y: 65},
        {x: 100, y: 45},
        {x: 150, y: 30},
        {x: 200, y: 20},
        {x: 250, y: 15},
        {x: 300, y: 10}
    ];
    
    // Scale points to canvas
    const scaleX = canvas.width / 300;
    const scaleY = canvas.height / 100;
    
    // Draw line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    points.forEach((point, index) => {
        const x = point.x * scaleX;
        const y = point.y * scaleY;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Add gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.3)');
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    
    points.forEach((point, index) => {
        const x = point.x * scaleX;
        const y = point.y * scaleY;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
}

// Testimonials Carousel
function initTestimonialsCarousel() {
    const items = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all items
        items.forEach(item => {
            item.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current item and activate dot
        if (items[index]) {
            items[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % items.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + items.length) % items.length;
        showSlide(prev);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play carousel
    setInterval(nextSlide, 5000);
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                
                // Extract number from text
                const numMatch = target.match(/[\d,]+/);
                if (numMatch) {
                    const numStr = numMatch[0].replace(/,/g, '');
                    const num = parseInt(numStr);
                    
                    if (!isNaN(num)) {
                        animateCounter(counter, num, target);
                        observer.unobserve(counter);
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, originalText) {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        
        if (start < target) {
            let displayValue = Math.ceil(start);
            
            if (originalText.includes('₩')) {
                if (target >= 1000000000) {
                    displayValue = `₩${Math.ceil(start / 100000000)}억`;
                } else if (target >= 10000) {
                    displayValue = `₩${Math.ceil(start / 10000)}만`;
                } else {
                    displayValue = `₩${displayValue.toLocaleString()}`;
                }
            } else if (originalText.includes('%')) {
                displayValue = `${(start / 10).toFixed(1)}%`;
            } else if (originalText.includes('+')) {
                displayValue = `${displayValue.toLocaleString()}+`;
            } else {
                displayValue = displayValue.toLocaleString();
            }
            
            element.textContent = displayValue;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = originalText;
        }
    }
    
    updateCounter();
}

// Form Handling
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const inputs = form.querySelectorAll('input, select, textarea');
            let isValid = true;
            
            // Simple validation
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b82';
                } else {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = '신청 완료!';
                submitBtn.style.background = '#00d4aa';
                
                setTimeout(() => {
                    alert('무료체험 신청이 완료되었습니다!\n곧 연락드리겠습니다.');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(45deg, #ffd700, #ffed4e)';
                }, 1000);
            } else {
                alert('모든 필수 항목을 입력해주세요.');
            }
        });
    }
}

// CTA Button Interactions
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip if it's a form submit button
            if (this.type === 'submit') return;
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
                left: ${e.offsetX}px;
                top: ${e.offsetY}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle specific actions
            if (this.textContent.includes('무료체험') || this.textContent.includes('무료 체험')) {
                setTimeout(() => {
                    document.querySelector('#contact').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            } else if (this.textContent.includes('데모')) {
                setTimeout(() => {
                    alert('플랫폼 데모를 준비 중입니다.\n곧 서비스할 예정입니다!');
                }, 300);
            }
        });
    });
    
    // Add ripple animation to CSS
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Update Real-time Prices (simulation)
function updateCoinPrices() {
    const coinItems = document.querySelectorAll('.coin-item');
    
    coinItems.forEach(item => {
        const priceElement = item.querySelector('.coin-price');
        const changeElement = item.querySelector('.coin-change');
        
        if (priceElement && changeElement) {
            // Simulate price changes
            const currentPrice = parseFloat(priceElement.textContent.replace(/[$,]/g, ''));
            const changePercent = (Math.random() - 0.5) * 0.1; // ±5% max change
            const newPrice = currentPrice * (1 + changePercent);
            
            // Format price
            let formattedPrice;
            if (newPrice >= 1000) {
                formattedPrice = `$${Math.round(newPrice).toLocaleString()}`;
            } else {
                formattedPrice = `$${newPrice.toFixed(2)}`;
            }
            
            // Update price
            priceElement.textContent = formattedPrice;
            
            // Update change
            const changeValue = (changePercent * 100).toFixed(2);
            const changeText = changePercent >= 0 ? `+${changeValue}%` : `${changeValue}%`;
            changeElement.textContent = changeText;
            changeElement.className = `coin-change ${changePercent >= 0 ? 'positive' : 'negative'}`;
        }
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initCoinTicker();
    initNavbarEffects();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initTestimonialsCarousel();
    initFormHandling();
    initCTAButtons();
    
    // Initialize charts after a delay
    setTimeout(() => {
        createPerformanceChart();
        animateCounters();
    }, 1000);
    
    // Update coin prices every 10 seconds
    setInterval(updateCoinPrices, 10000);
    
    // Handle window resize for charts
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createPerformanceChart();
        }, 300);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const parallaxElements = document.querySelectorAll('.hero-bg-img');
    
    if (hero && parallaxElements.length > 0) {
        const speed = 0.5;
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Add any scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler, { passive: true });