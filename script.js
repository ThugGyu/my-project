// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Testimonials infinite scroll
const testimonialsSlider = document.querySelector('.testimonials-slider');
if (testimonialsSlider) {
    const testimonialItems = testimonialsSlider.children;
    const itemWidth = 330; // 300px width + 30px gap
    let currentPosition = 0;
    
    function duplicateItems() {
        const items = Array.from(testimonialItems);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            testimonialsSlider.appendChild(clone);
        });
    }
    
    // Duplicate items for seamless loop
    duplicateItems();
    duplicateItems();
}

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = counter.innerHTML.match(/<span>.*<\/span>/);
            counter.innerHTML = Math.floor(current).toLocaleString() + (suffix ? suffix[0] : '');
        }, 16);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animation for stats section
            if (entry.target.classList.contains('stats-grid')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .slide-up, .stats-grid');
    animatedElements.forEach(el => observer.observe(el));
});

// Chart animations (simple pie charts)
function createPieChart(canvasId, percentage, color = '#e31e24') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#f0f0f0';
    ctx.fill();
    
    // Draw percentage arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * percentage / 100));
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    // Draw percentage text
    ctx.fillStyle = color;
    ctx.font = 'bold 16px Noto Sans KR';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(percentage + '%', centerX, centerY);
}

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        createPieChart('chart1', 75, '#e31e24');
        createPieChart('chart2', 85, '#28a745');
    }, 500);
});

// Form handling for contact buttons
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.textContent.includes('문의')) {
            // Simulate contact form modal
            alert('병원 마케팅 문의를 위해 연락드리겠습니다.\n전화: 02-1661-4829');
        } else if (this.textContent.includes('소개서')) {
            // Simulate brochure download
            alert('회사 소개서를 다운로드합니다.');
        }
    });
});

// Floating buttons functionality
document.querySelectorAll('.float-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i').className;
        
        if (icon.includes('comment')) {
            // WhatsApp or chat
            alert('카카오톡 상담을 시작합니다.');
        } else if (icon.includes('phone')) {
            // Phone call
            window.location.href = 'tel:02-1661-4829';
        } else if (icon.includes('envelope')) {
            // Email
            window.location.href = 'mailto:info@adresult.kr';
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .mobile-menu-btn span {
        transition: all 0.3s ease;
    }
    
    .testimonials-slider {
        animation-play-state: running;
    }
    
    .testimonials-slider:hover {
        animation-play-state: paused;
    }
`;

document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img)); 