document.addEventListener("DOMContentLoaded", function () {

// Burger


    const burger = document.getElementById("burger");
    const menu = document.querySelector(".menu");
    const body = document.body;

    burger.addEventListener("click", () => {
        burger.classList.toggle("open");
        menu.classList.toggle("open");
        body.classList.toggle("no-scroll");
    });

// Swiper NFT

    try {
        new Swiper(".top-nft .swiper", {
            spaceBetween: 30,
            breakpoints: {
                0: {
                    slidesPerView: 1.1,
                    height: ((90 * 4)+ (30 * 3))
                },
                576: {
                    slidesPerView: 1.5
                },
                768: {
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
            lazy: true,
            mousewheel: true
        });
    } catch (e) {
        console.log(e);
    }

// Tabs

    const tabButton = document.querySelectorAll('.tabs .container .button');

    const tabPicture = document.querySelector('.tabs .picture');
    const tabSource = document.querySelector('.tabs .tabs__source');
    const tabImg = document.querySelector('.tabs .picture__img');

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
        new Swiper(".authors .swiper", {
            spaceBetween: 30,
            breakpoints: {
                0: {
                    slidesPerView: 1.1
                },
                576: {
                    slidesPerView: 1.5
                },
                768: {
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
            lazy: true,
            mousewheel: true
        });
    } catch (e) {
        console.log(e);
    }

//  Dropdown

    const dropdown = document.querySelector('.sellers .dropdown');
    const toggleText = document.querySelector('.sellers .dropdown .text');
    const items = document.querySelectorAll('.sellers .dropdown .item');

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
        let swipe =  new Swiper(".sellers .swiper", {
            direction: "vertical",
            spaceBetween: 30,
            height: (120 * 4) + (30 * 3),
            slidesPerView: 4,

            breakpoints: {
                0: {
                    grid: {
                        rows: 1,
                        fill: "row",
                        height: (90 * 4) + (30 * 3),
                    },

                },
                768: {
                    grid: {
                        rows: 2,
                        fill: "row",
                    },
                },
                1440: {
                    grid: {
                        rows: 3,
                        fill: "row",
                    },
                }
            },

            // autoplay: {
            //     delay: 1500,
            //     disableOnInteraction: false,
            // },
            rewind: true,

            mousewheel: true,
        });

    } catch (e) {
        console.log(e);
    }

    try {
        let swipe =  new Swiper(".sellers .swiper--mobile", {
            direction: "vertical",
            spaceBetween: 30,
            height: (120 * 4) + (30 * 3),
            slidesPerView: 4,

            // autoplay: {
            //     delay: 1500,
            //     disableOnInteraction: false,
            // },
            rewind: true,

            mousewheel: true,
        });

    } catch (e) {
        console.log(e);
    }






// Accordion footer

    let acc = document.querySelectorAll(".accordion");

    acc.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle("open");

            const panel = item.nextElementSibling;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.marginTop = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.marginTop = "1rem";
            }

            console.log(panel.style.maxHeight);
        })
    })

});