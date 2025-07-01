document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById("burger");
    const menu = document.querySelector(".navbar__menu");
    const body = document.body;

    burger.addEventListener("click", () => {
        const isOpen = menu.classList.contains("open");

        burger.classList.toggle("open");
        menu.classList.toggle("open");

        if (isOpen) {
            body.classList.remove("no-scroll");
        } else {
            body.classList.add("no-scroll");
        }
    });

    // Swiper

    const track = document.getElementById('track');
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    function slideTo(index) {
        const slide = track.children[index];
        if (!slide) return;

        const offsetLeft = slide.offsetLeft;
        track.scrollTo({ left: offsetLeft, behavior: 'smooth' });
        currentIndex = index;
    }

// Автопрокрутка
    setInterval(() => {
        currentIndex = (currentIndex + 1) % track.children.length;
        slideTo(currentIndex);
    }, 4000);

// Свайп пальцем
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        scrollStart = track.scrollLeft;
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - startX;
        track.scrollLeft = scrollStart - deltaX;
    });

    track.addEventListener('touchend', () => {
        isDragging = false;

        // после свайпа выбрать ближайший слайд
        const slideWidth = track.children[0].offsetWidth + parseFloat(getComputedStyle(track).gap || 0);
        currentIndex = Math.round(track.scrollLeft / slideWidth);
        slideTo(currentIndex);
    });

});