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

// Filtragem de Eventos
document.getElementById('eventFilter').addEventListener('change', function() {
    const category = this.value;
    const events = document.querySelectorAll('.event-card');
    
    events.forEach(event => {
        if(category === 'todos' || event.dataset.category === category) {
            event.style.display = 'block';
        } else {
            event.style.display = 'none';
        }
    });
});



