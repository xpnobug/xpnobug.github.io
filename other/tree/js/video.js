var v = {
    video: document.getElementById("video"), // video 标签
    box: document.getElementById("video-box"), // video 容器
    // 按钮
    play: document.getElementById("play"), // 播放按钮
    bigPlay: document.getElementById("bigPlay"), // 中央播放按钮
    pause: document.getElementById("pause"), // 暂停按钮
    sound: document.getElementById("sound"), // 音量喇叭
    mute: document.getElementById("mute"), // 静音
    fullScreen: document.getElementById("fullScreen"), // 全屏按钮
    // 其他
    duration: document.getElementById("duration"), // 总时长
    currentTime: document.getElementById("currentTime"), // 当前播放时间
    progress: document.getElementById("progress"), // 时间容器
    timeBar: document.getElementById("timeBar"), // 时间进度
    soundBox: document.getElementById("soundBox"), // 音量容器
    soundBar: document.getElementById("soundBar"), // 音量大小
    playSpeed: document.getElementById("playSpeed"), // 播放速率
    soundPercent: 0, //音量百分比
};

// ======================  函数封装  ======================

// 显示与隐藏
function toggle (a, b) {
    a.style.display = "none";
    b.style.display = "block";
}
// 时间格式化
function timer (seconds) {
    var minute = Math.floor(seconds / 60);
    if (minute < 10) {
        minute = "0" + minute;
    }
    var second = Math.floor(seconds % 60);
    if (second < 10) {
        second = "0" + second;
    }
    return minute + ":" + second;
}
// 进度条拖拽
function updateprogress (x) {
    var percent = x / v.progress.clientWidth * 100;
    if (percent > 100) {
        percent = 100;
    } else if (percent < 0) {
        percent = 0;
    }
    v.timeBar.style.width = percent + "%";
    v.video.currentTime = v.video.duration * percent / 100;

}
// 进度条获取坐标调用 拖拽实现方法
var enableProgressDrag = function (e) {
    var progressDrag = false;
    v.progress.onmousedown = function (e) {
        progressDrag = true;
        updateprogress(e.offsetX);
    }
    document.onmouseup = function (e) {
        if (progressDrag) {
            progressDrag = false;
            updateprogress(e.offsetX);
        }
    }
    v.progress.onmousemove = function (e) {
        if (progressDrag) {
            updateprogress(e.offsetX);
        }
    }
};
// 判断是否静音
function isSound () {
    if (v.video.volume == 0) {
        toggle(v.sound, v.mute)
    } else {
        toggle(v.mute, v.sound)
    }
}
// 切换静音
v.sound.onclick = function () {
    toggle(v.sound, v.mute);
    v.video.volume = 0;
    v.soundBar.style.width = 0;
}
// 去除静音 音量回到之前选定区域
v.mute.onclick = function () {
    toggle(v.mute, v.sound);
    v.soundBar.style.width = v.soundPercent + "%";
    v.video.volume = v.soundPercent / 100;
}
// 音量拖拽
function updatesound (x, n) {
    if (n) {
        v.soundPercent = n;
    } else {
        v.soundPercent = x / v.soundBox.clientWidth * 100;
    }
    if (v.soundPercent > 100) {
        v.video.volume = 100;
    }
    if (v.soundPercent < 0) {
        v.video.volume = 0;
    }
    v.video.volume = v.soundPercent / 100;
    v.soundBar.style.width = v.soundPercent + "%";
    isSound();
}
// 音量获取坐标调用 拖拽实现方法
var enableSoundDrag = function (e) {
    var soundDrag = false;
    v.soundBox.onmousedown = function (e) {
        soundDrag = true;
        updatesound(e.offsetX, null);
    }
    v.soundBox.onmouseup = function (e) {
        if (soundDrag) {
            soundDrag = false;
            updatesound(e.offsetX, null);
        }
    }
    v.soundBox.onmousemove = function (e) {
        if (soundDrag) {
            updatesound(e.offsetX, null);
        }
    }
};
// 全屏
function requestFullscreen (ele) {
    // 全屏兼容代码
    if (ele.requestFullscreen) {
        ele.requestFullscreen();
    } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
    } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
    } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
    }
}
// ======================  函数封装  ======================



// 视频播放完毕返回未播放状态
v.video.addEventListener('ended', function () {
    toggle(v.pause, v.play)
    v.timeBar.style.width = 0;
    video.src = video.currentSrc
})

// 监测是否处于播放状态，点击暂停
v.video.addEventListener('playing', function () {
    v.box.style.cursor = 'pointer'
    v.video.addEventListener('click', function () {
        if (!v.video.paused || !v.video.ended) {
            v.video.pause();
            toggle(v.pause, v.play)
            v.bigPlay.style.display = 'block'
        }
    })
})

// 双击全屏
v.video.addEventListener('dblclick', function () {
    requestFullscreen(v.video);
})

v.video.addEventListener('pause', function () {
    v.box.style.cursor = 'default'
})

v.video.onloadedmetadata = function () {
    // 播放
    v.play.onclick = function () {
        if (v.video.paused || v.video.ended) {
            v.video.play();
            toggle(v.play, v.pause)
            v.bigPlay.style.display = 'none'
        }
    }
    // 中央播放按钮
    v.bigPlay.onclick = function () {
        if (v.video.paused || v.video.ended) {
            v.video.play();
            toggle(v.play, v.pause)
            v.bigPlay.style.display = 'none'
        }
    }

    // 暂停
    v.pause.onclick = function () {
        if (!v.video.paused || !v.video.ended) {
            v.video.pause();
            toggle(v.pause, v.play)
            v.bigPlay.style.display = 'block'
        }
    }
    // 获取时长
    v.duration.innerHTML = timer(v.video.duration);
    v.currentTime.innerHTML = timer(v.video.currentTime);
    // 进度条跟随
    v.video.ontimeupdate = function () {
        var currentTime = v.video.currentTime;
        var duration = v.video.duration;
        var percent = currentTime / duration * 100;
        v.timeBar.style.width = percent + "%";
        v.currentTime.innerHTML = timer(currentTime);
    }
    // 执行时间拖拽和音量拖拽，音量初始化
    enableProgressDrag();
    enableSoundDrag();
    updatesound(null, 20);
    // 全屏
    v.fullScreen.addEventListener("click", function () {
        requestFullscreen(v.video);
    })
}