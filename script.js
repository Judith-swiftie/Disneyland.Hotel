// Suavizado de scroll para anclas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// Enviar formularios de login y registro con IP
['login-form', 'register-form'].forEach(formId => {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            fetch('capture_ip.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});

// Carousel
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    let currentSlide = 0;
    const slideWidth = slides[0].getBoundingClientRect().width;

    function moveSlide(slideIndex) {
        const amountToMove = slideWidth * slideIndex;
        track.style.transform = `translateX(-${amountToMove}px)`;
    }

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        moveSlide(currentSlide);
    });

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        moveSlide(currentSlide);
    });
});

// Lightbox
function openLightbox() {
    document.getElementById('lightbox').style.display = "block";
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName('lightbox-slide');
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// Calendario dinámico
document.addEventListener('DOMContentLoaded', function () {
    const calendario = document.getElementById('calendario');
    const availabilityClasses = ['full', 'limited', 'available'];

    function generateCalendar(year) {
        calendario.innerHTML = ''; // Limpiar contenido previo
        const startDate = new Date(year, 0, 1); // 1 de enero
        const endDate = new Date(year, 11, 31); // 31 de diciembre
        let currentDate = startDate;

        // Encabezados de días de la semana
        const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.style.fontWeight = 'bold';
            dayElement.innerText = day;
            calendario.appendChild(dayElement);
        });

        // Rellenar los días
        while (currentDate <= endDate) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            const availability = availabilityClasses[Math.floor(Math.random() * availabilityClasses.length)];
            dayElement.classList.add(availability);

            // Asignar precios
            let price = 100; // Precio base
            if (availability === 'full') {
                price = 250;
            } else if (availability === 'limited') {
                price = 180;
            } else if (availability === 'available') {
                price = 120;
            }

            dayElement.innerHTML = `${currentDate.getDate()}<br>€${price}`;
            calendario.appendChild(dayElement);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    // Mostrar el calendario de 2024 por defecto
    generateCalendar(2024);

    // Función para mostrar el calendario al hacer clic
    window.mostrarCalendario = function () {
        calendario.style.display = 'grid';
        generateCalendar(new Date().getFullYear());
    };
});
