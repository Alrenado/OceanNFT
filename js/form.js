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
    const swiper = document.querySelector('.swiper');

    let currentIndex = 1; // начинаем со 1, потому что 0 - клон последнего
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let autoplayTimer;

    let animationFrameId = null;

// Клонируем слайды
    const slides = Array.from(track.children);
    const slideCount = slides.length;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slideCount - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const allSlides = Array.from(track.children);
    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    function getSlideWidth() {
        return allSlides[0].offsetWidth + gap;
    }

    function setPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function slideTo(index, instant = false) {
        const slideWidth = getSlideWidth();
        currentIndex = index;
        currentTranslate = -slideWidth * currentIndex;
        prevTranslate = currentTranslate;

        if (instant) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.4s ease';
        }
        setPosition();
    }

    function loopCheck() {
        const slideWidth = getSlideWidth();

        if (currentIndex === 0) {
            // Переход к последнему оригиналу
            slideTo(slideCount, true);
        } else if (currentIndex === allSlides.length - 1) {
            // Переход к первому оригиналу
            slideTo(1, true);
        }
    }

    function startAutoplay() {
        autoplayTimer = setInterval(() => {
            slideTo(currentIndex + 1);
        }, 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

// Свайп пальцем / мышкой
    function startDrag(x) {
        stopAutoplay();
        isDragging = true;
        startX = x;
        track.style.transition = 'none';
        cancelAnimationFrame(animationFrameId);
    }

    function dragMove(x) {
        if (!isDragging) return;
        const deltaX = x - startX;
        currentTranslate = prevTranslate + deltaX;
        setPosition();
    }

    function endDrag(x) {
        if (!isDragging) return;
        isDragging = false;

        const slideWidth = getSlideWidth();
        const deltaX = x - startX;

        if (deltaX < -slideWidth / 4) {
            slideTo(currentIndex + 1);
        } else if (deltaX > slideWidth / 4) {
            slideTo(currentIndex - 1);
        } else {
            slideTo(currentIndex);
        }

        startAutoplay();
    }

// Touch Events
    track.addEventListener('touchstart', e => startDrag(e.touches[0].clientX));
    track.addEventListener('touchmove', e => dragMove(e.touches[0].clientX));
    track.addEventListener('touchend', e => {
        endDrag(e.changedTouches[0].clientX);
    });

// Mouse Events
    track.addEventListener('mousedown', e => startDrag(e.clientX));
    window.addEventListener('mousemove', e => dragMove(e.clientX));
    window.addEventListener('mouseup', e => endDrag(e.clientX));

// Бесконечный цикл после анимации
    track.addEventListener('transitionend', loopCheck);

// Инициализация
    track.style.transition = 'transform 0.4s ease';
    slideTo(1, true); // начнем с первого оригинального слайда
    startAutoplay();

});