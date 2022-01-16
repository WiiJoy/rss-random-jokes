let video = document.querySelector('.video__video'),
    fullTimeline = document.querySelector('.video__timeline'),
    volume = document.querySelector('.video__volume__level'),
    currVolume = document.querySelector('.volume__line'),
    btnPlay = document.querySelector('.button__play'),
    btnPause = document.querySelector('.button__pause'),
    btnPlayBig = document.querySelector('.video__play'),
    btnVolume = document.querySelector('.button__volume'),
    poster = document.querySelector('.video__poster');

const playVideo = function() {
    poster.classList.add('btn__hide')
    video.play();

    btnPlay.classList.add('btn__hide')
    btnPlayBig.classList.add('btn__hide')
    btnPause.classList.remove('btn__hide')

}

btnPlay.addEventListener('click', playVideo)

btnPlayBig.addEventListener('click', playVideo)

btnPause.addEventListener('click', function() {
    video.pause();

    btnPlay.classList.remove('btn__hide')
    btnPlayBig.classList.remove('btn__hide')
    btnPause.classList.add('btn__hide')
})

function timeline () {
    let currTime = (Math.round(video.currentTime) / (Math.round(video.duration) / 100));
    fullTimeline.value = currTime;
}

video.addEventListener('timeupdate', timeline);




