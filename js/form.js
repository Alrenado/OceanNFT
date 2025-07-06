document.addEventListener("DOMContentLoaded", function () {

// Burger


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

// Swiper NFT

    try {
        new Swiper(".swiper-topNFT", {
            spaceBetween: 30,
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                575: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            },
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            loop: true,
            mousewheel: true
        });
    } catch (e) {
        console.log(e);
    }

// Tabs

    const tabButton = document.querySelectorAll('.tabs__button');

    const tabPicture = document.querySelector('.tabs__picture');
    const tabSource = document.querySelector('.tabs__source');
    const tabImg = document.querySelector('.tabs__img');

    tabButton.forEach(button => {
        button.addEventListener('click', () => {

            tabButton.forEach(btn => btn.classList.remove("clicked"));
            button.classList.add("clicked");

            const srcName = button.dataset.src;

            tabPicture.style.opacity = 0;
            setTimeout(() => {
                tabImg.style.transform = `translateX(150%)`;
            }, 300);

            setTimeout(() => {
                tabSource.srcset = `img/webp/${srcName}.webp`;
                tabImg.src = `img/png/${srcName}.png`;

                setTimeout(() => {
                    tabPicture.style.opacity = 1;
                }, 300);

                tabImg.style.transform = `translateX(0)`;

            }, 750);
        });
    });

//  Swiper authors

    try {
        new Swiper(".swiper-authors", {
            spaceBetween: 30,
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                575: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            },
            // autoplay: {
            //     delay: 1500,
            //     disableOnInteraction: false,
            // },
            loop: true,
            mousewheel: true
        });
    } catch (e) {
        console.log(e);
    }

//  Dropdown

    const dropdown = document.querySelector('.sellers__title-dropdown');
    const toggleText = document.querySelector('.sellers__title-dropdown-text');
    const items = document.querySelectorAll('.sellers__title-dropdown-item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            toggleText.textContent = item.textContent;
        })
    })

    dropdown.addEventListener("click", () => {
        dropdown.classList.toggle("dropdown-open");

    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('dropdown-open');
        }
    });


// Swiper table

    try {
        new Swiper(".swiper-sellers", {
            direction: "horizontal",
            spaceBetween: 30,
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                575: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            },
            grid: {
                rows: 4,
                fill: "row"
            },
            loop: true,

            mousewheel: true,
        });
    } catch (e) {
        console.log(e);
    }

});