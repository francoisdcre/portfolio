const frameworkSwiper = new Swiper('.framework-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        576: {
            slidesPerView: 1.2,
            centeredSlides: true,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 1.8,
            spaceBetween: 30,
            centeredSlides: true
        },
        1024: {
            slidesPerView: 2.5,
            spaceBetween: 40,
            centeredSlides: true
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 40,
            centeredSlides: true
        }
    }
});