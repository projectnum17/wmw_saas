const videoHandler = () => {
    const videoWrapper = document.querySelector('.js-video-wrapper');
    const videoItem = document.querySelector('.js-video');
    const videoPlay = document.querySelector('.js-play');
    const videoInfo = document.querySelector('.js-hero-info');

    if (!videoItem || !videoPlay || !videoWrapper || !videoInfo) return;

    videoItem.addEventListener('play', () => {
        videoPlay.classList.add('is-hide');
        videoPlay.classList.add('is-simple');
        videoInfo.classList.add('is-hide');
    });

    videoItem.addEventListener('pause', () => {
        videoPlay.classList.remove('is-hide');
        videoInfo.classList.remove('is-hide');
    });

    videoItem.addEventListener('ended', () => {
        videoPlay.classList.remove('is-hide');
        videoInfo.classList.remove('is-hide');
    });

    videoWrapper.addEventListener('click', () => {
        if (videoItem.paused) {
            videoItem.play();
        } else {
            videoItem.pause();
        }
    });
};

export default videoHandler;
