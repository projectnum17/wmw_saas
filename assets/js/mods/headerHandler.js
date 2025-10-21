const headerHandler = () => {
    const header = document.querySelector('.js-header');
    if (!header) return;

    const toggleHeaderStyles = () => {
        if (window.scrollY > 1) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    };

    toggleHeaderStyles();
    window.addEventListener('scroll', toggleHeaderStyles);
};

export default headerHandler;
