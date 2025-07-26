document.addEventListener("DOMContentLoaded", function () {

    //  Swiper

    const swiperConfigs = {
        topNft: {
            spaceBetween: 30,
            breakpoints: {
                0: {
                    slidesPerView: 1.1,
                    height: ((90 * 4) + (30 * 3))
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
        },

        authors: {
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
        },

        sellers: {
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

            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            rewind: true,

            mousewheel: true,
        },

        sellersMobile: {
            direction: "vertical",
            spaceBetween: 25,
            height: (90 * 4) + (25 * 3),
            slidesPerView: 4,

            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            rewind: true,

            mousewheel: true,
        }
    }

    const swiperObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const id = el.dataset.swiperId;
                const config = swiperConfigs[id];
                if (config) {
                    new Swiper(el, config);
                    obs.unobserve(el);
                }
            }
        });
    }, {
        rootMargin: '100px' // загружаем заранее
    });

    document.querySelectorAll('.swiper').forEach(el => {
        swiperObserver.observe(el)
    });

// Static picture observe

    const imageObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.dataset.hasOwnProperty('srcset') && entry.target.dataset.srcset !== undefined) {
                    entry.target.srcset = entry.target.dataset.srcset;
                } else if (entry.target.dataset.hasOwnProperty('src') && entry.target.dataset.src !== undefined) {
                    entry.target.src = entry.target.dataset.src;
                }

                obs.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '200px'
    });

    document.querySelectorAll('.observed-picture img, .observed-picture source').forEach(el => imageObserver.observe(el));

// Burger

    const burger = document.getElementById("burger");

    const burgerObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const menu = document.querySelector(".menu");
                const body = document.body;

                burger.addEventListener("click", () => {
                    burger.classList.toggle("open");
                    menu.classList.toggle("open");
                    body.classList.toggle("no-scroll");
                });

                obs.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '200px'
    });

    burgerObserver.observe(burger);

// Tabs

    const tabsObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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
                obs.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '100px'
    });

    tabsObserver.observe(document.querySelector('.tabs'));

//  Dropdown

    const dropdown = document.querySelector('.sellers .dropdown');

    const dropdownObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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

                obs.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '200px'
    });

    dropdownObserver.observe(dropdown);

// Accordion footer

    const acc = document.querySelectorAll(".accordion");

    const accObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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
                    })
                })

                obs.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '200px'
    });

    acc.forEach(el => {
        accObserver.observe(el);
    })
});