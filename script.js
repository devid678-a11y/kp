document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Scroll Animation Logic
    const scrollSection = document.getElementById('interactive');
    const phone = document.getElementById('visual-phone');
    const device = document.getElementById('visual-device');
    const screenUi = document.getElementById('screen-ui');
    const dots = [
        document.getElementById('dot-1'), 
        document.getElementById('dot-2'), 
        document.getElementById('dot-3')
    ];
    const texts = [
        document.getElementById('text-1'), 
        document.getElementById('text-2'), 
        document.getElementById('text-3')
    ];

    window.addEventListener('scroll', () => {
        if (!scrollSection) return;

        const sectionTop = scrollSection.offsetTop;
        const scrollPos = window.scrollY - sectionTop;
        const height = window.innerHeight;
        
        // Progress from 0 to 3 based on 400vh height
        const progress = Math.max(0, Math.min(3, scrollPos / height));

        const isMobile = window.innerWidth <= 768;

        if (progress < 1) {
            const p1 = progress;
            phone.style.opacity = p1 * 2;
            const translateX = isMobile ? (50 - p1 * 50) : (100 - p1 * 100);
            phone.style.transform = `translateX(${translateX}px) scale(1)`;
            device.style.opacity = "1";
            device.style.transform = `scale(${1 - p1 * 0.1})`;
            screenUi.style.opacity = "0";
            updateUI(0);
        } else if (progress >= 1 && progress < 2) {
            const p2 = progress - 1;
            phone.style.transform = `scale(${1 + p2 * 0.1})`;
            device.style.opacity = 1 - p2 * 2;
            screenUi.style.opacity = p2 * 2;
            updateUI(1);
        } else {
            const p3 = progress - 2;
            const translateY = isMobile ? (-p3 * 10) : (-p3 * 20);
            phone.style.transform = `scale(1.1) translateY(${translateY}px)`;
            updateUI(2);
        }
    });

    function updateUI(idx) {
        dots.forEach((dot, i) => {
            if (dot) dot.classList.toggle('active', i === idx);
        });
        texts.forEach((text, i) => {
            if (text) text.classList.toggle('active', i === idx);
        });
    }

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
