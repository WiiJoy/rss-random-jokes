let video = document.querySelector('.video__video'),
    fullTimeline = document.querySelector('.video__timeline'),
    volume = document.querySelector('.video__volume__level'),
    btnPlay = document.querySelector('.button__play'),
    btnPlayBig = document.querySelector('.video__play'),
    btnVolume = document.querySelector('.button__volume'),
    poster = document.querySelector('.video__poster');

videoVolume ();

const playVideo = function() {

    if (btnPlay.classList.contains('button__pause')) {
        video.pause();

        btnPlay.classList.remove('button__pause')
        btnPlayBig.classList.remove('btn__hide')
    } else {
        
        poster.style.opacity = 0;
        video.play();

        btnPlay.classList.add('button__pause')
        btnPlayBig.classList.add('btn__hide')

        poster.classList.add('btn__hide')
    }
}

btnPlay.addEventListener('click', playVideo)
btnPlayBig.addEventListener('click', playVideo)
video.addEventListener('click', playVideo)
poster.addEventListener('click', playVideo)

function timeline () {
    let currTime = (Math.floor(video.currentTime) / (Math.floor(video.duration) / 100));
    fullTimeline.value = currTime;

    fullTimeline.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${fullTimeline.value}%, rgb(200, 200, 200) ${fullTimeline.value}%, rgb(200, 200, 200) 100%)`;

    if (video.currentTime === video.duration) {
        video.currentTime = 0;
        video.pause()
        btnPlay.classList.remove('button__pause')
        btnPlayBig.classList.remove('btn__hide')
    }
}

function setVideoTime () {
    let currTime = fullTimeline.value * (Math.floor(video.duration) / 100);
    video.currentTime = currTime;
}

video.addEventListener('timeupdate', timeline);
fullTimeline.addEventListener('input', setVideoTime);

function videoVolume () {
    let currVolume = volume.value / 100;
    video.volume = currVolume;

    volume.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${volume.value}%, rgb(200, 200, 200) ${volume.value}%, rgb(200, 200, 200) 100%)`;

    if (video.volume === 0) {
        btnVolume.classList.remove('volume__on');
        btnVolume.classList.add('volume__off');
    } else {
        btnVolume.classList.add('volume__on');
        btnVolume.classList.remove('volume__off');
    }
}

function videoMute () {
    if (btnVolume.classList.contains('volume__off')) {
        video.volume = volume.value / 100;
        btnVolume.classList.add('volume__on');
        btnVolume.classList.remove('volume__off');
    } else {
        video.volume = 0;
        btnVolume.classList.remove('volume__on');
        btnVolume.classList.add('volume__off');
    }
}

volume.addEventListener('input', videoVolume);
btnVolume.addEventListener('click', videoMute);

