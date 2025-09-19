document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    setupNavigation();
    setupMouseEffects();
    setupFAQ();
    setupLightbox();
    initializeCharts();
});

function setupNavigation() {
    const pages = document.querySelectorAll('.page');
    const navButtons = document.querySelectorAll('.nav-btn');

    const showPage = (targetId) => {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.scrollTo({ top: 0, behavior: 'instant' });
        }
    };

    navButtons.forEach(button => {
        button.addEventListener('click', () => showPage(button.dataset.target));
    });
}

function setupMouseEffects() {
    const cursor = document.querySelector('.cursor');
    const parallaxContainers = document.querySelectorAll('.parallax-container');

    window.addEventListener('mousemove', e => {
        if (cursor) {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }

        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        parallaxContainers.forEach(container => {
            container.style.transform = `translateX(${-x * 10}px) translateY(${-y * 10}px)`;
        });
    });
}

function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = question.classList.contains('active');

            faqItems.forEach(i => {
                i.querySelector('.faq-question').classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

function setupLightbox() {
    const viewCertButtons = document.querySelectorAll('.view-cert-btn');
    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        const openLightbox = (src) => {
            lightboxContent.src = src;
            lightbox.classList.add('visible');
        };

        const closeLightbox = () => {
            lightbox.classList.remove('visible');
        };

        viewCertButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const src = button.dataset.src;
                if (src) openLightbox(src);
            });
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
    }
}