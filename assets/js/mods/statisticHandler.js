const statisticHandler = () => {
    const statisticBoxes = document.querySelectorAll('.statistic__box');

    // const animateValue = (el, duration = 2000) => {
    //     const rawText = el.textContent;
    //     const hasPlus = rawText.includes('+');
    //     const endValue = parseInt(rawText.replace(/\D/g, '')) || 0;
    //     const startTime = performance.now();

    //     const update = (now) => {
    //         const progress = Math.min((now - startTime) / duration, 1);
    //         const value = Math.floor(progress * endValue);
    //         el.textContent = value + (hasPlus ? '+' : '');
    //         if (progress < 1) requestAnimationFrame(update);
    //     };
    //     requestAnimationFrame(update);
    // };

    const animateSVGPath = (path, duration = 2000) => {
        const length = path.getTotalLength();
        path.style.transition = 'none';
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`;
        path.style.strokeDashoffset = '0';
    };

    const animateStatsItems = (box) => {
        const items = box.querySelectorAll('.stats-item');
        items.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, i * 200);
        });
    };

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const box = entry.target;
                    const numberEl = box.querySelector('.statistic__box-val');
                    const svg = box.querySelector('svg');

                    box.classList.add('animated');

                    if (numberEl && !numberEl.dataset.animated) {
                        numberEl.dataset.animated = 'true';
                        // animateValue(numberEl);
                    }

                    const svgPaths = box.querySelectorAll('.col svg path');
                    svgPaths.forEach((path) => {
                        const svg = path.closest('svg');
                        const width = svg.getAttribute('width');
                        const hasStroke = path.hasAttribute('stroke');

                        if (
                            hasStroke &&
                            parseInt(width) > 50 &&
                            !path.dataset.animated
                        ) {
                            path.dataset.animated = 'true';
                            animateSVGPath(path);
                        }
                    });

                    if (
                        svg &&
                        parseInt(svg.getAttribute('width')) > 200 &&
                        !svg.dataset.animated
                    ) {
                        svg.dataset.animated = 'true';
                    }

                    animateStatsItems(box);
                    observer.unobserve(box);
                }
            });
        },
        { threshold: 0.4 }
    );

    statisticBoxes.forEach((box) => observer.observe(box));

    const odometerElements = document.querySelectorAll('.odometer');

    odometerElements.forEach((el) => {
        const targetValue = parseInt(el.getAttribute('data-number'), 10);

        if (isNaN(targetValue)) return;

        const odometer = new Odometer({
            el: el,
            value: 0,
            format: 'd',
            duration: 2000,
        });

        let hasRun = false;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasRun) {
                        setTimeout(() => {
                            odometer.update(targetValue);
                        }, 100);

                        hasRun = true;
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
    });
};

export default statisticHandler;
