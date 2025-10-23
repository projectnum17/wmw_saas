const historyHandler = () => {
    const steps = document.querySelectorAll('.js-history-step');
    const blocks = document.querySelectorAll('.js-history-block');

    if (!steps.length || !blocks.length) {
        console.warn('Элементы шагов или контента не найдены.');
        return;
    }

    const stepObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
    };

    steps[0].classList.add('is-active');

    const stepObserverCallback = (entries) => {
        entries.forEach((entry) => {
            const index = Array.from(blocks).indexOf(entry.target);

            if (entry.isIntersecting) {
                for (let i = 0; i <= index; i++) {
                    steps[i].classList.add('is-active');
                }

                for (let i = index + 1; i < steps.length; i++) {
                    steps[i].classList.remove('is-active');
                }
            }
        });
    };

    const stepObserver = new IntersectionObserver(
        stepObserverCallback,
        stepObserverOptions
    );
    blocks.forEach((block) => stepObserver.observe(block));

    const animationObserverOptions = {
        root: null,
        rootMargin: '0px 0px -20% 0px',
        threshold: 0,
    };

    const animationObserverCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const animationObserver = new IntersectionObserver(
        animationObserverCallback,
        animationObserverOptions
    );
    blocks.forEach((block) => animationObserver.observe(block));
};

export default historyHandler;
