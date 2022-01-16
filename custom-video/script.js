let video = document.querySelector('.video__video'),
      fullTimeline = document.querySelector('.video__timeline'),
      currTimeline = document.querySelector('.timeline'),
      volume = document.querySelector('.video__volume__level'),
      currVolume = document.querySelector('.volume__line'),
      btnPlay = document.querySelector('.button__play'),
      btnPause = document.querySelector('.button__pause'),
      btnPlayBig = document.querySelector('.video__play'),
      btnVolume = document.querySelector('.button__volume');

const playVideo = function() {
    video.play();

    btnPlay.classList.add('btn__hide')
    btnPlayBig.classList.add('btn__hide')
    btnPause.classList.remove('btn__hide')

    videoPlay = setInterval(function() {
        let currVideoTime = Math.round(video.currentTime);
        let totalVideoTime = Math.round(video.duration);

        currTimeline.style.width = (currVideoTime * 100) / totalVideoTime + '%';
    }, 10)
}

btnPlay.addEventListener('click', playVideo)

btnPlayBig.addEventListener('click', playVideo)

btnPause.addEventListener('click', function() {
    video.pause();

    btnPlay.classList.remove('btn__hide')
    btnPlayBig.classList.remove('btn__hide')
    btnPause.classList.add('btn__hide')
})


