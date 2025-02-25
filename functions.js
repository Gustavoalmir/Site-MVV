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


// Filtro de Eventos
    document.getElementById('eventFilter').addEventListener('change', function() {
        const selectedCategory = this.value;
        const events = document.querySelectorAll('.event-card');    
        
        events.forEach(event => {
            const categories = event.dataset.category.split(' ');
            if (selectedCategory === 'todos' || categories.includes(selectedCategory)) {
                event.style.display = 'block';
            } else {
                event.style.display = 'none';
            }
        });
    });


        // Menu Mobile
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
    
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
