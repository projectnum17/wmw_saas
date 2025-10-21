const sliders = () => {
    if (typeof Swiper === 'undefined') return;

    const gallerySlider = () => {
        const sliderEl = document.querySelector('.js-gallery');

        if (!sliderEl) return;

        const sliders = sliderEl.querySelectorAll('.swiper-slide');
        const navigation = document.querySelector('.js-gall-nav');

        if (navigation && sliders.length < 2) navigation.style.display = 'none';

        const slider = new Swiper(sliderEl, {
            slidesPerView: 1,
            spaceBetween: 50,
            speed: 600,
            grabCursor: true,
            navigation: {
                prevEl: '.js-gall-prev',
                nextEl: '.js-gall-next',
            },
        });
    };

    const testimonialsSlider = () => {
        const sliderEl = document.querySelector('.js-testimonials');

        if (!sliderEl) return;

        const sliders = sliderEl.querySelectorAll('.swiper-slide');
        const navigation = document.querySelector('.js-testimonials-nav');

        if (navigation && sliders.length < 2) navigation.style.display = 'none';

        const slider = new Swiper(sliderEl, {
            slidesPerView: 2,
            grid: {
                rows: 2,
                fill: 'row',
            },
            spaceBetween: 50,
            speed: 600,
            grabCursor: true,
            navigation: {
                prevEl: '.js-testimonials-prev',
                nextEl: '.js-testimonials-next',
            },
        });
    };

    gallerySlider();
    testimonialsSlider();
};

export default sliders;
