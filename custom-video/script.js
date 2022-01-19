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
        poster.classList.add('btn__hide')
        video.play();

        btnPlay.classList.add('button__pause')
        btnPlayBig.classList.add('btn__hide')
    }
}

btnPlay.addEventListener('click', playVideo)
btnPlayBig.addEventListener('click', playVideo)

function timeline () {
    let currTime = (Math.floor(video.currentTime) / (Math.floor(video.duration) / 100));
    fullTimeline.value = currTime;
}

function setVideoTime (ev) {
    console.log(ev, ev.pageX, fullTimeline.offsetLeft)
    let progressValue = Math.floor(ev.offsetX);
    let progress = progressValue / (fullTimeline.offsetWidth / 100);
    video.currentTime = video.duration * (progress / 100);
}

video.addEventListener('timeupdate', timeline);
fullTimeline.addEventListener('click', setVideoTime);

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

volume.addEventListener('input', videoVolume);




