function animateStats() {
    const stats = document.querySelectorAll('.stat');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 6000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Call the function when document is loaded
document.addEventListener('DOMContentLoaded', animateStats);

document.querySelectorAll('.toggle-details').forEach(button => {
    button.addEventListener('click', () => {
        const details = button.previousElementSibling;
        const isActive = details.classList.contains('active');
        
        // Animation
        if (!isActive) {
            details.classList.add('active');
            button.classList.add('active');
            button.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
        } else {
            details.classList.remove('active');
            button.classList.remove('active');
            button.innerHTML = 'Learn More <i class="fas fa-chevron-down"></i>';
        }
    });
});