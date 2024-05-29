import { useEffect } from 'react';

function SmoothScroll() {
    useEffect(() => {
        const navLinks = document.querySelectorAll('.nav-item');

        navLinks.forEach(function(navLink) {
            navLink.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                smoothScroll(targetElement);
            });
        });

        function smoothScroll(target) {
            const targetPosition = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }, []);
    return null;
}

export default SmoothScroll;