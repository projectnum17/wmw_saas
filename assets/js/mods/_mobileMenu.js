const mobileMenu = () => {
    const openMenu = document.querySelector('.js-menu-open');
    const closeMenu = document.querySelector('.js-menu-close');
    const menuLinks = document.querySelectorAll('.js-menu-link');
    const mobMenu = document.querySelector('.js-menu');

    const shownMenuHandler = () => {
        mobMenu.classList.add('is-shown');
        document.body.style.overflow = 'hidden';
    };

    const hiddenMenuHandler = () => {
        mobMenu.classList.remove('is-shown');
        document.body.style.overflow = '';
    };

    if (openMenu && mobMenu) {
        openMenu.addEventListener('click', shownMenuHandler);
    }

    if (menuLinks && mobMenu) {
        menuLinks.forEach((link) => {
            link.addEventListener('click', hiddenMenuHandler);
        });
    }

    if (closeMenu && mobMenu) {
        closeMenu.addEventListener('click', hiddenMenuHandler);
    }
};

export default mobileMenu;
