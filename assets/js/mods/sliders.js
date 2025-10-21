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
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    grid: {
                        rows: 1,
                    },
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 2,
                    grid: {
                        rows: 2,
                        fill: 'row',
                    },
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 2,
                    grid: {
                        rows: 2,
                        fill: 'row',
                    },
                    spaceBetween: 50,
                },
            },
        });
    };

    gallerySlider();
    testimonialsSlider();
};

export default sliders;
