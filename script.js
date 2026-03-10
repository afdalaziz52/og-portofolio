// Modal functionality
function openModal(title, description, imageSrc) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('projectModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('projectModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeModal();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing effect for hero text
const heroText = "Afdal Aziz";
const heroElement = document.querySelector('.block.font-bold.text-slate-900.text-4xl');
let i = 0;
let isTyping = true;

function typeWriter() {
    if (isTyping) {
        if (i < heroText.length) {
            heroElement.textContent = heroText.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            isTyping = false;
            setTimeout(() => {
                isTyping = true;
                i = 0;
                typeWriter();
            }, 2000);
        }
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Project hover effects
document.querySelectorAll('#projects .bg-white').forEach(project => {
    project.addEventListener('mouseenter', () => {
        project.style.transform = 'translateY(-10px)';
        project.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    });

    project.addEventListener('mouseleave', () => {
        project.style.transform = 'translateY(0)';
        project.style.boxShadow = '';
    });
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'fixed bottom-8 right-8 bg-teal-500 text-white w-12 h-12 rounded-full shadow-lg opacity-0 transition-opacity duration-300 z-50';
scrollTopBtn.style.display = 'none';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
        setTimeout(() => scrollTopBtn.style.opacity = '1', 10);
    } else {
        scrollTopBtn.style.opacity = '0';
        setTimeout(() => scrollTopBtn.style.display = 'none', 300);
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Skills animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }, index * 300);
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
    // Initial state for skill bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s ease';
    });
}