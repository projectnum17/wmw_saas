const statisticHandler = () => {
    const statisticBoxes = document.querySelectorAll('.statistic__box');

    const animateValue = (el, duration = 2000) => {
        const rawText = el.textContent;
        const hasPlus = rawText.includes('+');
        const endValue = parseInt(rawText.replace(/\D/g, '')) || 0;
        const startTime = performance.now();

        const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(progress * endValue);
            el.textContent = value + (hasPlus ? '+' : '');
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };

    const animateSVGPath = (path, duration = 2000) => {
        const length = path.getTotalLength();
        path.style.transition = 'none';
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`;
        path.style.strokeDashoffset = '0';
    };

    const animateMainSVG = (svg, duration = 1000) => {
        if (!svg) return;

        const allPaths = svg.querySelectorAll('path');
        const numberPaths = svg.querySelectorAll('path.number');

        allPaths.forEach((path, i) => {
            if (!path.classList.contains('number')) {
                const prevFill = path.getAttribute('fill') || '#00D98A';
                path.style.fill = 'none';
                path.style.stroke = prevFill;
                path.style.strokeWidth = '2';
                const length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                path.style.transition = 'none';
                path.getBoundingClientRect();

                setTimeout(() => {
                    path.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`;
                    path.style.strokeDashoffset = '0';
                }, i * 150);

                setTimeout(() => {
                    path.style.transition = `fill 500ms ease`;
                    path.style.fill = prevFill;
                    path.style.stroke = 'none';
                }, duration + i * 150);
            }
        });

        numberPaths.forEach((numPath, i) => {
            numPath.style.opacity = '0';
            numPath.style.transform = 'translateY(10px)';
            numPath.style.transition = `opacity 0.8s ease, transform 0.8s ease, fill 1s ease`;
            const fillColor = numPath.getAttribute('fill') || '#ffffff';
            numPath.style.fill = 'transparent';

            setTimeout(() => {
                numPath.style.opacity = '1';
                numPath.style.transform = 'translateY(0)';
                numPath.style.fill = fillColor;
            }, duration + 200 + i * 150);
        });
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
                        animateValue(numberEl);
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
                        animateMainSVG(svg);
                    }

                    animateStatsItems(box);
                    observer.unobserve(box);
                }
            });
        },
        { threshold: 0.4 }
    );

    statisticBoxes.forEach((box) => observer.observe(box));
};

export default statisticHandler;
