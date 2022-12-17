console.log("welcome to spotify");
// Initialize the variable
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myprogressbar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songitem = Array.from(document.getElementsByClassName("songitem"));
let songItemPlay = document.getElementsByClassName("songItemPlay");
let next = document.getElementById("next");
let previous = document.getElementById("previous");

let songs = [
  {
    SongName: "Warriyo - Mortals (feat. Laura Brehm) ",
    filePath: "songs/1.mp3",
    coverpath: "covers/1.jpg",
  },
  {
    SongName: "Cielo - Huma-Huma",
    filePath: "songs/2.mp3",
    coverpath: "covers/2.jpg",
  },
  {
    SongName: "DEAF KEV - Invincible ",
    filePath: "songs/3.mp3",
    coverpath: "covers/3.jpg",
  },
  {
    SongName: "Different Heaven & EH!DE - My Heart ",
    filePath: "songs/4.mp3",
    coverpath: "covers/4.jpg",
  },
  {
    SongName: "Janji - Heroes Tonight (feat. Johnning) ",
    filePath: "songs/5.mp3",
    coverpath: "covers/5.jpg",
  },
  {
    SongName: "Nede Nede - slowed",
    filePath: "songs/6.mp3",
    coverpath: "covers/6.jpg",
  },
  {
    SongName: "sanam ree - Atif Aslam",
    filePath: "songs/7.mp3",
    coverpath: "covers/7.jpg",
  },
  {
    SongName: "invisible - Sindu mosewala",
    filePath: "songs/8.mp3",
    coverpath: "covers/8.jpg",
  },
  {
    SongName: "Chances - 8D by Ap - Dhillon",
    filePath: "songs/9.mp3",
    coverpath: "covers/9.jpg",
  },
];

songitem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songname")[0].innerText = songs[i].SongName;
});
// console.log(audioElement.play());

// handle play/pause click

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

// listen to event
audioElement.addEventListener("timeupdate", () => {
  // update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myprogressbar.value = progress;
});
myprogressbar.addEventListener("change", () => {
  audioElement.currentTime =
    (myprogressbar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      if (audioElement.paused) {
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].SongName;
        audioElement.play();
        gif.style.opacity = 1;
        audioElement.currentTime = 0;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
      } else {
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
      }
    });
  }
);
next.addEventListener("click", () => {
  if (songIndex >= 8) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  masterSongName.innerText = songs[songIndex].SongName;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
previous.addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].SongName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
