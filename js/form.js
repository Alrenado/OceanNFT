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
        }else {
            body.classList.add("no-scroll");
        }
    });
});