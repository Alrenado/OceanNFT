document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById("burger");
    const menu = document.querySelector(".navbar__menu");

    burger.addEventListener("click", () => {
        burger.classList.toggle("open");
        menu.classList.toggle("open");
    });
});