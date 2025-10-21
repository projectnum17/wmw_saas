const scannerHandler = () => {
    window.addEventListener('load', () => {
        gsap.registerPlugin(ScrollTrigger);

        const section = document.querySelector('.js-scanner-content');
        const hero = document.querySelector('.js-scanner-hero');
        const rec = document.querySelector('.js-scanner-rec');
        const scanner = document.querySelector('.js-scanner-item');

        const skeletonImg = document.querySelector(
            '.js-scanner-img:first-of-type'
        );
        const manImg = document.querySelector('.js-scanner-img:last-of-type');

        const scanHeight = hero.clientHeight;
        const recHeight = rec.clientHeight;
        const endY = scanHeight - recHeight;

        if (endY <= 0) return;

        gsap.set(skeletonImg, { clipPath: 'inset(0 0 100% 0)' });
        gsap.set(manImg, { clipPath: 'inset(0 0 0 0)' });

        ScrollTrigger.create({
            trigger: section,
            start: 'top-=70 top',
            end: `+=${scanHeight}`,
            pin: true,
            scrub: true,
            markers: false,
            onUpdate: (self) => {
                const progress = self.progress;

                const manInset = progress * 100;
                manImg.style.clipPath = `inset(${manInset}% 0 0 0)`;

                const skeletonInset = 100 - progress * 100;

                skeletonImg.style.clipPath = `inset(0 0 ${skeletonInset}% 0)`;

                const scannerY = endY * progress;
                scanner.style.transform = `translate(-50%, ${scannerY}px)`;
                rec.style.transform = `translate(-50%, ${scannerY}px)`;
            },
        });
    });
};

export default scannerHandler;
