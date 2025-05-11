let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 50; // Quantidade mínima de scroll para ativar o efeito

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) return;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll para baixo
        navbar.classList.add('hidden');
    } else {
        // Scroll para cima
        navbar.classList.remove('hidden');
    }
    
    // Resetar a posição da navbar no topo da página
    if (currentScrollY <= 0) {
        navbar.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
});

// DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile - Voltando para a versão anterior da modernização
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.nav-content').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
    
    // Smooth scroll para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Inicializar o filtro de eventos
    initEventFilter();
    
    // Adicionar animações aos cards
    animateOnScroll();
});

// Filtro de Eventos
function initEventFilter() {
    const eventFilter = document.getElementById('eventFilter');
    if (eventFilter) {
        eventFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const events = document.querySelectorAll('.event-card');
            
            events.forEach(event => {
                const categories = event.dataset.category.split(' ');
                if (selectedCategory === 'todos' || categories.includes(selectedCategory)) {
                    event.style.display = 'block';
                    setTimeout(() => {
                        event.style.opacity = '1';
                        event.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    event.style.opacity = '0';
                    event.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        event.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
}

// Animação de elementos ao fazer scroll
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.event-card, .location-card, .section-title, .map-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Adicionar classe ativa ao link atual baseado na seção visível
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('current');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('current');
            }
        });
    });
}

// Inicializar a atualização de links ativos
updateActiveNavLink();

// Registrar manifest para funcionalidade "Add to Home Screen"
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            console.log('ServiceWorker registrado com sucesso: ', registration.scope);
        }, function(err) {
            console.log('Falha ao registrar ServiceWorker: ', err);
        });
    });
}
