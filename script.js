let play_btn=document.querySelector("#play-btn");
let audioElement=new Audio("./assets/daylight.mp3");
let ProgressBar=document.querySelector(".progress-bar");
let cards=Array.from(document.querySelectorAll(".song-card"));

let songs=[
    {songName:"Daylight", singerName:"David kushner", filepath:"./assets/daylight.mp3", coverPath:"./assets/card1img.png"},
    {songName:"Mahiye Jinna Sohna", singerName:"Darshan Raval", filepath:"./assets/mahiye_jinna_sohna.mp3", coverPath:"./assets/card2img.jpeg"},
    {songName:"Shikayat", singerName:"AUR", filepath:"./assets/shikayat.mp3", coverPath:"./assets/card3img.png"},
    {songName:"Pee Loon", singerName:"Pritam, Mohit Chauhan", filepath:"./assets/pee_loon.mp3", coverPath:"./assets/card4img.png"},
    {songName:"Counting Stars", singerName:"OneRepublic", filepath:"./assets/counting_stars.mp3", coverPath:"./assets/card7img.png"}
]

let index=0;

cards.forEach((card,i)=>{
    card.addEventListener('click',()=>{
        audioElement.src=songs[i].filepath;
        audioElement.currentTime=0;
        audioElement.play();
        play_btn.classList.remove("fa-circle-play");
        play_btn.classList.add("fa-circle-pause");
        document.querySelector("#playing-img").src=songs[i].coverPath;
        document.querySelector(".album-title").innerText=songs[i].songName;
        document.querySelector(".album-artist").innerText=songs[i].singerName;
        index=i;
    })
    card.querySelector("img").src=songs[i].coverPath;
    card.querySelector(".card-title").innerText=songs[i].songName;
    card.querySelector(".card-content").innerText=songs[i].singerName;
})

document.querySelector("#previous").addEventListener('click',()=>{
    if(index<=0){
        index=4;
    }
    else{
        index--;
    }
    audioElement.src=songs[index].filepath;
    audioElement.currentTime=0;
    audioElement.play();
    play_btn.classList.remove("fa-circle-play");
    play_btn.classList.add("fa-circle-pause");
    document.querySelector("#playing-img").src=songs[index].coverPath;
    document.querySelector(".album-title").innerText=songs[index].songName;
    document.querySelector(".album-artist").innerText=songs[index].singerName;
})

document.querySelector("#next").addEventListener('click',()=>{
    if(index>=4){
        index=0;
    }
    else{
        index++;
    }
    audioElement.src=songs[index].filepath;
    audioElement.currentTime=0;
    audioElement.play();
    play_btn.classList.remove("fa-circle-play");
    play_btn.classList.add("fa-circle-pause");
    document.querySelector("#playing-img").src=songs[index].coverPath;
    document.querySelector(".album-title").innerText=songs[index].songName;
    document.querySelector(".album-artist").innerText=songs[index].singerName;
})

play_btn.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        play_btn.classList.remove("fa-circle-play");
        play_btn.classList.add("fa-circle-pause");
    }
    else{
        audioElement.pause();
        play_btn.classList.remove("fa-circle-pause");
        play_btn.classList.add("fa-circle-play");
    }
})

let like_btn=document.querySelector("#like-btn");
like_btn.addEventListener("click",()=>{
    if(like_btn.style.color!="red"){
        like_btn.style.color="red";
    }
    else{
        like_btn.style.color="black";
    }
})

function convert(n) {
    n = String(n)
    if (n.length == 1)
      n = '0' + n
    return n
}

audioElement.addEventListener('timeupdate',()=>{
    let progress=((audioElement.currentTime/audioElement.duration)*100);
    ProgressBar.value=progress;
    var value = (ProgressBar.value - ProgressBar.min) / (ProgressBar.max - ProgressBar.min) * 100;
    ProgressBar.style.background = 'linear-gradient(to right, #1bd760 0%, #1bd760 ' + value + '%, #ddd ' + value + '%, #ddd 100%)';
    if(ProgressBar.value==100){
        play_btn.classList.remove("fa-circle-pause");
        play_btn.classList.add("fa-circle-play");
    }
    document.querySelector(".curr-time").innerText=convert(Math.floor(Math.round(audioElement.currentTime)/60))+":"+convert(Math.round(audioElement.currentTime)%60);
    document.querySelector(".tot-time").innerText=convert(Math.floor(Math.round(audioElement.duration)/60))+":"+convert(Math.round(audioElement.duration)%60);
})

ProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=ProgressBar.value*audioElement.duration/100;
})