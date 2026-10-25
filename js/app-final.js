'use strict';
// Spotify is removed; the original dock Music app and lock-screen player remain
const openAppBeforeFinal = openApp;
openApp = function(name) {
  if(name === '스포티파이') return;
  if(name === '음악') { musicScreen(); return; }
  openAppBeforeFinal(name);
};
function musicScreen(){
  const body=shell('음악',true);
  panel.classList.add('music-final');
  body.innerHTML=`<img class="music-artwork" src="${$('.cover').src}" alt="Champagne Supernova 앨범 커버"><h2>Champagne Supernova</h2><p>Oasis</p><input id="musicSeekFinal" aria-label="재생 위치" type="range" min="0" max="447" value="${seconds}"><div class="music-times"><span id="musicElapsedFinal">${fmt(seconds)}</span><span>7:27</span></div><div class="music-controls"><button id="musicStartFinal" aria-label="처음부터">↤</button><button id="musicPlayFinal" aria-label="재생 또는 일시 정지">${playing?PLAYER_ICONS.pause:PLAYER_ICONS.play}</button></div><label class="audio-load10">음원 파일 선택<input type="file" accept="audio/*" onchange="loadSong10(this)"><small>음원은 포함되어 있지 않아요</small></label>`;
  $('#musicSeekFinal').oninput=e=>{seconds=Number(e.target.value);if(songAudio10.src)songAudio10.currentTime=seconds;};
  $('#musicStartFinal').onclick=()=>{seconds=0;if(songAudio10.src)songAudio10.currentTime=0;};
  $('#musicPlayFinal').onclick=()=>$('#play').click();
}
setInterval(()=>{if($('#musicSeekFinal')){$('#musicSeekFinal').value=seconds;$('#musicElapsedFinal').textContent=fmt(seconds);$('#musicPlayFinal').innerHTML=playing?PLAYER_ICONS.pause:PLAYER_ICONS.play;}},500);
// Read-state markers should never survive after all DMs have been read
const finalDmList=dmList;
dmList=function(){finalDmList();syncUnread13();};
