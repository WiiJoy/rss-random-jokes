let video = document.querySelector('.video__video'),
    fullTimeline = document.querySelector('.video__timeline'),
    volume = document.querySelector('.video__volume__level'),
    btnPlay = document.querySelector('.button__play'),
    btnPlayBig = document.querySelector('.video__play'),
    btnVolume = document.querySelector('.button__volume'),
    poster = document.querySelector('.video__poster'),
    currTimeHud = document.querySelector('.time__current'),
    durationTimeHud = document.querySelector('.time__duration');

videoVolume ();

function durationHud(time) {
    let minutes = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : '' + Math.floor(time / 60);
    let seconds = Math.floor(time - parseInt(minutes) * 60) < 10 ? '0' + Math.floor(time - parseInt(minutes) * 60) : '' + Math.floor(time - parseInt(minutes) * 60);

    return `${minutes}:${seconds}`
}

const playVideo = function() {
    durationTimeHud.innerHTML = durationHud(video.duration)

    if (btnPlay.classList.contains('button__pause')) {
        video.pause();

        btnPlay.classList.remove('button__pause')
        btnPlayBig.classList.remove('btn__hide')
    } else {
        
        poster.style.opacity = 0;
        video.play();

        btnPlay.classList.add('button__pause')
        btnPlayBig.classList.add('btn__hide')

        setTimeout(function() {
            poster.classList.add('btn__hide')
        }, 300)        
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

    currTimeHud.innerHTML = durationHud(video.currentTime)

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
    currTimeHud.innerHTML = durationHud(Math.floor(video.currentTime))
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

console.log(
    'Вёрстка, дизайн, UI +20\nвнешний вид приложения соответствует предложенному образцу или является его улучшенной версией +5\nвёрстка адаптивная. Приложения корректно отображается и отсутствует полоса прокрутки при ширине страницы от 1920рх до 768рх +5\nинтерактивность элементов, с которыми пользователи могут взаимодействовать, изменение внешнего вида самого элемента и состояния курсора при наведении, использование разных стилей для активного и неактивного состояния элемента, плавные анимации +5\nв футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\nКнопка Play/Pause +10\nесть кнопка Play/Pause при клике по которой можно запустить или остановить проигрывание видео +5\nвнешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5\nЕсть прогресс-бар ползунок которого перемещается отображая прогресс проигрывания видео. При перемещении ползунка вручную меняется время текущего проигрывания видео +10\nЕсть кнопка Volume/Mute при клике по которой можно включить или отключить звук +10\nЕсть регулятор громкости звука +10\nФункционал плеера соответствует демо или является его улучшенной версией +5'
)