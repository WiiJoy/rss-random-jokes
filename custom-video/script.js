let video = document.querySelector('.video__video'),
      fullTimeline = document.querySelector('.video__timeline'),
      currTimeline = document.querySelector('.timeline'),
      volume = document.querySelector('.video__volume__level'),
      currVolume = document.querySelector('.volume__line'),
      btnPlay = document.querySelector('.button__play'),
      btnPause = document.querySelector('.button__pause'),
      btnPlayBig = document.querySelector('.video__play'),
      btnVolume = document.querySelector('.button__volume');

btnPlay.addEventListener('click', function() {
    video.play();

    videoPlay = setInterval(function() {
        let currVideoTime = Math.round(video.currentTime);
        let totalVideoTime = Math.round(video.duration);

        currTimeline.style.width = (currVideoTime * 100) / totalVideoTime + '%';
    }, 10)
})
