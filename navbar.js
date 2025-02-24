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
