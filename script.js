// Основной JavaScript для сайта натяжных потолков

document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигационных ссылок
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Обработка кнопок в hero секции
    const callBtn = document.querySelector('.btn-call');
    const examplesBtn = document.querySelector('.btn-examples');

    if (callBtn) {
        callBtn.addEventListener('click', function() {
            // Здесь будет логика для звонка
            alert('Функция звонка будет добавлена!');
        });
    }

    if (examplesBtn) {
        examplesBtn.addEventListener('click', function() {
            // Прокрутка к секции работ
            const worksSection = document.querySelector('.works-section');
            if (worksSection) {
                worksSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Обработка кнопки "Позвонить" в секции работ
    const worksCallBtn = document.querySelector('.call-button');
    if (worksCallBtn) {
        worksCallBtn.addEventListener('click', function() {
            // Здесь будет логика для звонка
            alert('Функция звонка будет добавлена!');
        });
    }

    // Обработка кликов по фотографиям в галерее
    const galleryPhotos = document.querySelectorAll('.gallery-photo');
    galleryPhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            // Создаем модальное окно для просмотра фотографии
            const modal = document.createElement('div');
            modal.className = 'photo-modal';
            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <img src="${this.src}" alt="${this.alt}" class="modal-photo">
                        <button class="modal-close">&times;</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Закрытие модального окна
            const closeModal = () => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            };
            
            modal.querySelector('.modal-close').addEventListener('click', closeModal);
            modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
                if (e.target === this) closeModal();
            });
            
            // Закрытие по Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeModal();
            });
        });
    });

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем анимацию к элементам
    const animatedElements = document.querySelectorAll('.hero-content > *, .works-content > *, .consultation-content > *');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Обработка кнопок в секции консультации
    const consultationCallBtn = document.querySelector('.btn-call-primary');
    const telegramBtn = document.querySelector('.btn-telegram');

    if (consultationCallBtn) {
        consultationCallBtn.addEventListener('click', function() {
            // Здесь будет логика для звонка
            window.location.href = 'tel:+79900382723';
        });
    }

    if (telegramBtn) {
        telegramBtn.addEventListener('click', function() {
            // Здесь будет логика для Telegram
            const telegramUsername = 'VitaliyOvchinnicov';
            const message = 'Здравствуйте! Хочу заказать консультацию по натяжным потолкам.';
            const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;
            window.open(telegramUrl, '_blank');
        });
    }

    // Эффект параллакса для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Добавляем эффект свечения к кнопкам при наведении
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Мобильное меню (для будущих блоков)
    function createMobileMenu() {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.nav');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                const toggle = document.createElement('button');
                toggle.className = 'mobile-menu-toggle';
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
                toggle.style.cssText = `
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 10px;
                `;
                
                header.insertBefore(toggle, nav);
                
                toggle.addEventListener('click', function() {
                    nav.classList.toggle('mobile-open');
                });
            }
        }
    }

    // Инициализация мобильного меню
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Добавляем стили для мобильного меню
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block !important;
            }
            
            .nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.9);
                flex-direction: column;
                padding: 20px;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav.mobile-open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-link {
                padding: 10px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Сайт натяжных потолков загружен успешно!');
});
