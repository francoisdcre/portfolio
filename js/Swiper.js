// Initialize the framework swiper
const frameworkSwiper = new Swiper('.framework-swiper', {
    // Optional parameters
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
    // Responsive breakpoints
    breakpoints: {
        // Small screens
        576: {
            slidesPerView: 1.2, /* Show partial slides on sides */
            centeredSlides: true,
            spaceBetween: 20
        },
        // Medium screens
        768: {
            slidesPerView: 1.8, /* Show more of side slides */
            spaceBetween: 30,
            centeredSlides: true
        },
        // Large screens
        1024: {
            slidesPerView: 2.5, /* Show partial slides on sides */
            spaceBetween: 40,
            centeredSlides: true
        },
        // Extra large screens
        1200: {
            slidesPerView: 3,
            spaceBetween: 40,
            centeredSlides: true
        }
    }
});