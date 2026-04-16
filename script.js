const songs = [
  {
    title: "देशले रगत मागे मलाई बलि चढाऊ",
    artist: "Gopal Yongan",
    src: "/songs/m3.mpeg"
  },
  {
    title: "रातो र चन्द्र सूर्य",
    artist: "Gopal Prasad Rimal",
    src: "/songs/m2.mpeg"
  },
  {
    title: "लाग्दछ मलाई रमाइलो",
    artist: "Madhab Prasad Ghimire",
    src: "/songs/m1.mpeg"
  },
  {
    title: "Neon Lights",
    artist: "Dinesh",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  
];

let songIndex = 0;
const audio = new Audio();
const playBtn = document.getElementById('play-btn');

function loadSong(index) {
    songIndex = index;
    const song = songs[songIndex];
    audio.src = song.src;
    document.getElementById('title').innerText = song.title;
    document.getElementById('artist').innerText = song.artist; // FIX 1: was innertext
    updatePlaylistUI();
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
    playBtn.innerText = "⏸";
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // FIX 3: was songIndexx
    loadSong(songIndex);
    audio.play();
    playBtn.innerText = "⏸";
}

function changeVolume() {
    audio.volume = document.getElementById('volume').value;
}

audio.ontimeupdate = () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress').value = progress || 0;
    document.getElementById('current-time').innerText = formatTime(audio.currentTime);
    document.getElementById('duration').innerText = formatTime(audio.duration || 0);
};

audio.onended = () => {
    nextSong();
};

function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    let m = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function updatePlaylistUI() {
    const list = document.getElementById('playlist');
    list.innerHTML = '<strong>Playlist</strong>';
    songs.forEach((song, i) => {
        const div = document.createElement('div'); // FIX 2: was getElementById('div')
        div.className = `playlist-item ${i === songIndex ? 'active' : ''}`;
        div.innerText = `${i + 1}. ${song.title} — ${song.artist}`;
        div.onclick = () => {
            loadSong(i);
            audio.play();
            playBtn.innerText = "⏸";
        };
        list.appendChild(div);
    });
}

document.getElementById('progress').addEventListener('input', function () {
    audio.currentTime = (this.value / 100) * audio.duration;
});

loadSong(0);