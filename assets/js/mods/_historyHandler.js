const historyHandler = () => {
    window.addEventListener('load', () => {
        gsap.registerPlugin(ScrollTrigger);

        const section = document.querySelector('.js-history-trigger');
        const steps = gsap.utils.toArray('.js-history-progress');
        const contents = gsap.utils.toArray('.js-history-block');

        if (!section || !steps.length || !contents.length) return;

        const total = contents.length;
        let lastIndex = 0;

        contents.forEach((item, i) => {
            gsap.set(item, {
                opacity: i === 0 ? 1 : 0,
                scale: i === 0 ? 1 : 0.9,
                visibility: i === 0 ? 'visible' : 'hidden',
                yPercent: 0,
            });
        });
        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${(total - 1) * window.innerHeight * 0.8}`,
            pin: true,
            scrub: false,
            snap: 1 / (total - 1),
            onUpdate: (self) => {
                const stepProgress = 1 / (total - 1);
                let activeIndex = Math.round(self.progress / stepProgress);
                activeIndex = Math.min(Math.max(activeIndex, 0), total - 1);

                if (activeIndex !== lastIndex) {
                    contents.forEach((content, i) => {
                        const visible = i === activeIndex;

                        gsap.to(content, {
                            opacity: visible ? 1 : 0,
                            scale: visible ? 1 : 0.9,
                            visibility: visible ? 'visible' : 'hidden',
                            yPercent: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                            overwrite: 'auto',
                        });

                        if (i <= activeIndex) {
                            steps[i]?.classList.add('is-active');
                        } else {
                            steps[i]?.classList.remove('is-active');
                        }
                    });

                    lastIndex = activeIndex;
                }
            },
        });
    });
};

export default historyHandler;

