document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        const updateCount = () => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText;
            const increment = target / 200;

            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                stat.innerText = target;
            }
        };

        updateCount();
    });

    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav li a');
    
    // Handle scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Handle active link
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});

document.querySelector('.toggle-details').addEventListener('click', function() {
    var details = document.getElementById('details');
    if (details.style.display === 'none') {
        details.style.display = 'block';
        this.textContent = 'Less Details'; // Change text to 'Less Details' when expanded
    } else {
        details.style.display = 'none';
        this.textContent = 'More Details'; // Change text back to 'More Details' when hidden
    }
});