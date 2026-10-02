/* ==========================================================================
   ASTROLOGER HARSH BHARGAVA - VEDIC ASTROLOGY WEBSITE
   Updated Interactive Scripts (Constellation Canvas, WhatsApp Form Redirection)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 2. Navbar & Top Ticker Hide on Scroll
    const mainNavbar = document.getElementById('mainNavbar');
    const topTickerBar = document.querySelector('.top-ticker-bar');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            if (topTickerBar) topTickerBar.classList.add('hide-ticker');
            if (mainNavbar) mainNavbar.classList.add('scrolled');
        } else {
            if (topTickerBar) topTickerBar.classList.remove('hide-ticker');
            if (mainNavbar) mainNavbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 3. Smooth Scroll for Anchor Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. Consultation Form Handler -> Redirects Data directly to WhatsApp
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const phoneNo = document.getElementById('phoneNo').value.trim();
            const consultationArea = document.getElementById('consultationArea').value;
            const message = document.getElementById('message').value.trim();

            // Construct formatted WhatsApp message
            let text = `*Vedic Astrology Consultation Request*\n\n`;
            text += `*Name:* ${fullName}\n`;
            text += `*Phone/WhatsApp:* ${phoneNo}\n`;
            text += `*Area of Interest:* ${consultationArea}\n`;
            if (message) {
                text += `*Message:* ${message}\n`;
            }
            text += `\nPlease confirm available slot for one-to-one consultation.`;

            const whatsappUrl = `https://wa.me/918289046015?text=${encodeURIComponent(text)}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            consultationForm.reset();
        });
    }

    // 5. Constellation & Glowing Particle Canvas Animation
    initConstellationCanvas();

    // 6. Testimonial Swiper Initialization (3 on desktop, 2 on tablet, 1 on mobile)
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-swiper')) {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                576: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 28
                }
            }
        });
    }

    // 7. WhatsApp Chat Screenshots Swiper (Large: 3, Medium: 2, Small: 1)
    if (typeof Swiper !== 'undefined' && document.querySelector('.whatsapp-ss-swiper')) {
        new Swiper('.whatsapp-ss-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.whatsapp-ss-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.whatsapp-ss-swiper .swiper-button-next',
                prevEl: '.whatsapp-ss-swiper .swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 16
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 28
                }
            }
        });
    }

});

// Interactive Service Modal Helper
function openServiceModal(title, description) {
    const modalTitle = document.getElementById('serviceModalTitle');
    const modalBody = document.getElementById('serviceModalBody');

    if (modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.textContent = description;

        const serviceModalEl = document.getElementById('serviceDetailModal');
        if (serviceModalEl) {
            const modal = new bootstrap.Modal(serviceModalEl);
            modal.show();
        }
    }
}

// High-Performance Dynamic Cosmic Canvas Engine (Twinkling Stars + Meteor Trails + Mouse Attraction)
function initConstellationCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const mouse = { x: null, y: null, radius: 150 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    const nodeCount = window.innerWidth < 768 ? 45 : 85;
    const nodes = [];
    const colors = ['#F26A21', '#D6A84F', '#F4D27A', '#FFF1D2', '#FF8C42'];

    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2.2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.6 + 0.3,
            pulseSpeed: Math.random() * 0.03 + 0.01,
            pulseAngle: Math.random() * Math.PI * 2
        });
    }

    // Shooting Meteors Array
    const meteors = [];
    function spawnMeteor() {
        if (meteors.length < 3 && Math.random() < 0.03) {
            meteors.push({
                x: Math.random() * width,
                y: Math.random() * (height * 0.5),
                length: Math.random() * 80 + 50,
                speed: Math.random() * 8 + 6,
                angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
                opacity: 1,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Spawn optional meteor trails
        spawnMeteor();

        // 1. Draw Shooting Meteors
        for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i];
            const endX = m.x - m.length * Math.cos(m.angle);
            const endY = m.y - m.length * Math.sin(m.angle);

            const grad = ctx.createLinearGradient(m.x, m.y, endX, endY);
            grad.addColorStop(0, m.color);
            grad.addColorStop(1, 'transparent');

            ctx.save();
            ctx.globalAlpha = m.opacity;
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.restore();

            m.x += m.speed * Math.cos(m.angle);
            m.y += m.speed * Math.sin(m.angle);
            m.opacity -= 0.015;

            if (m.opacity <= 0 || m.x > width || m.y > height) {
                meteors.splice(i, 1);
            }
        }

        // 2. Draw Constellation Web Lines
        const maxDist = window.innerWidth < 768 ? 100 : 140;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    const lineAlpha = (1 - dist / maxDist) * 0.18;
                    ctx.strokeStyle = `rgba(214, 168, 79, ${lineAlpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            // Connect to mouse pointer if nearby
            if (mouse.x && mouse.y) {
                const mdx = nodes[i].x - mouse.x;
                const mdy = nodes[i].y - mouse.y;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mdist < mouse.radius) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    const mouseLineAlpha = (1 - mdist / mouse.radius) * 0.35;
                    ctx.strokeStyle = `rgba(242, 106, 33, ${mouseLineAlpha})`;
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }
            }
        }

        // 3. Draw & Update Glowing Nodes
        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;

            if (n.x < 0 || n.x > width) n.vx *= -1;
            if (n.y < 0 || n.y > height) n.vy *= -1;

            // Twinkle pulsation
            n.pulseAngle += n.pulseSpeed;
            const currentRadius = n.radius + Math.sin(n.pulseAngle) * 0.8;
            const currentAlpha = Math.max(0.2, n.alpha + Math.sin(n.pulseAngle) * 0.25);

            ctx.save();
            ctx.globalAlpha = currentAlpha;
            ctx.fillStyle = n.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = n.color;
            ctx.beginPath();
            ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(draw);
    }

    draw();
}
