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


    const track = document.getElementById("swiper-track");
    const slides = document.querySelectorAll(".swiper__slide");
    let index = 0;
    let startX = 0;
    let isDragging = false;
    let auto;

    function getSlideWidth() {
        return slides[0].getBoundingClientRect().width;
    }

    function updateSlide() {
        const slideWidth = getSlideWidth();
        track.style.transition = "transform 0.5s ease";
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function nextSlide() {
        const visibleSlides = 3;
        const maxIndex = slides.length - visibleSlides;

        index = (index + 1) > maxIndex ? 0 : index + 1;
        updateSlide();
    }

    auto = setInterval(nextSlide, 3000);

    // Swipe support
    track.addEventListener("touchstart", (e) => {
        clearInterval(auto);
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = "none";
    });

    track.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        const slideWidth = getSlideWidth();
        track.style.transform = `translateX(-${index * slideWidth - diff}px)`;
    });

    track.addEventListener("touchend", (e) => {
        const diff = e.changedTouches[0].clientX - startX;
        const slideWidth = getSlideWidth();
        isDragging = false;

        if (Math.abs(diff) > slideWidth / 4) {
            if (diff < 0) index++;
            else index--;
        }

        const maxIndex = slides.length - 3;
        if (index < 0) index = 0;
        if (index > maxIndex) index = 0;

        updateSlide();
        auto = setInterval(nextSlide, 3000);
    });

    window.addEventListener("resize", updateSlide);

});