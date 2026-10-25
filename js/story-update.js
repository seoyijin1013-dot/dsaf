'use strict';
const beforeStoryReply = generateReply;
const PHONE_STORY = { savedNameKnown:false };
function storyReply(lines, c, topic) { c.dialogue.topic=topic; return lines; }
generateReply = function(name,text,c) {
 const who=chatIdentity(name); if(!who)return [];
 const st=c.dialogue ||= {found:!!c.foundPhone,topic:null,counts:{},stage:'start'};
 const s=text.replace(/\s+/g,'');
 const say=(a,t)=>storyReply(a,c,t);
 const disclosure=/주웠|주우|주운|습득/.test(s)&&!/안주웠|못주웠/.test(s);
 if(disclosure){st.handoff=false;st.ownerSpeaking=false;return beforeStoryReply(name,text,c);}
 if(st.found){
  if(who==='donghyeon'&&/저장명|좋아해.*(저장|연락처|번호)|저장.*좋아해/.test(s))PHONE_STORY.savedNameKnown=true;
  if(st.handoff && !st.ownerSpeaking){
   st.ownerSpeaking=true;
   if(who==='donghyeon'){
    c.pendingStoryCall={name:c.name,kind:'owner',known:PHONE_STORY.savedNameKnown};
    return say(['저 동민인데요','제가 폰 주인이에요','제발 아무 말도 하지 말아주세요','지금 전화드릴게요'],'owner-handoff');
   }
   return say(['저 동민인데요','제가 주인이에요','지금 친구 폰으로 보내고 있어요','제발 좋아해라고 저장돼 있는 번호로는 연락하지 말아주세요'],'owner-handoff');
  }
  if(st.ownerSpeaking){
   if(who==='donghyeon'){c.pendingStoryCall={name:c.name,kind:'owner',known:PHONE_STORY.savedNameKnown};return say(['제가 금방 갈게요','전화로 말씀드릴게요','제발 아무 말도 하지 말아주세요'],'owner-handoff');}
   return say(['제가 직접 받으러 갈게요','그 번호에는 연락 안 하신 거죠?','지금 보신 건 비밀로 해주세요'],'owner-handoff');
  }
  if(who!=='donghyeon' && /좋아해|그연락처|그번호|그사람/.test(s)){
   if(/사이|관계/.test(s))return say(['지인의 개인사라 제가 말씀드리기는 힘들어요','폰만 돌려주시면 감사하겠습니다'],'finder-private');
   if(/누구|누군|연락처|번호|저장/.test(s))return say(['그건 알려드릴 수 없어요','동민이 개인 연락처라서요','폰 주인에게 직접 확인해 주세요'],'finder-private');
  }
  if(/(동민|주인).*(어디|행방|만났|찾았|위치)|어디.*(동민|주인)/.test(s)){
   st.handoff=true;
   return say(['방금 동민이랑 만났어요','지금 같이 폰 찾으러 갈 거예요','잠깐만요 본인이 직접 말씀드린대요'],'handoff');
  }
  return beforeStoryReply(name,text,c);
 }
 // Finding one's own phone never discloses the finder identity
 if(/(폰|핸드폰|휴대폰).*(찾았|찾음|찾앗|되찾)|찾았.*(폰|핸드폰|휴대폰)/.test(s))return beforeStoryReply(name,text,c);
 if(who==='donghyeon'&&st.topic==='since-question'){
  if(/모르겠|몰라|말하기싫|비밀/.test(s))return say(['지금 말하기 어려우면','만나서 얘기해도 돼','피하려는 건 아니야'],'since-question');
  c.pendingStoryCall={name:c.name,kind:'confession'};
  return say(['그때부터?','나 진짜 몰랐어','잠깐 전화할게'],'confession-call');
 }
 if(who==='donghyeon'&&/티.*(안났|안낫|안나|났)|진짜.*몰랐|정말.*몰랐|몰랐어|몰랐냐|눈치.*못/.test(s))return say(['진짜 몰랐어','그냥 나랑 잘 맞아서 같이 다니는 줄 알았지','언제부터 좋아했는데?'],'since-question');
 if(who!=='donghyeon'&&/티(가|좀|많이)?(나|났|낫)|어디서.*티|티.*(보여|보였|남)|눈치.*(챘|챗|보여)/.test(s)){
  if(st.topic==='obvious')return say(who==='woonhak'?['그냥 딱 보면 보여요','아직 안 들킨 게 신기한데요 형']:['그냥 딱 보면 보여','아직 안 들킨 게 신기하다'],'obvious');
  return say({jaehyeon:['ㅋㅋㅋㅋㅋㅋ 티 나지','너 동현이 얘기만 나오면 바로 반응하잖아'],seongho:['응 티 나','동현이한테만 유독 그러잖아'],sanghyeok:['응 솔직히 티 나','네가 걔 신경 많이 쓰는 게 보여'],woonhak:['형 진짜 티 나요','동현이형 얘기하면 바로 오면서요']}[who],'obvious');
 }
 if(who==='jaehyeon'&&/성호/.test(s)&&/밥|먹/.test(s))return say(['성호가 먹을 사람 없대서ㅋㅋㅋㅋ','같이 먹는 중','왜 너도 올래?'],'food');
 if(who==='seongho'){
  if(/재현/.test(s)&&/밥|먹/.test(s))return say(['걔가 자꾸 귀찮게 따라와','같이 먹자고 계속 그래서','그냥 같이 먹었어'],'food');
  if(/밥.*먹|먹었/.test(s))return say(['응 먹었어','재현이가 졸라서 같이 먹었어'],'food');
  if(/안쨌|안짼|안째|안쨋|안빠졌/.test(s))return say(['그치? 나 놀랐어','동현이가 너랑 째고 아쿠아리움 간대서'],'class');
  if(/쨌|쨋|째고|짼|빠졌/.test(s))return say(['동민아 너 그러면 안 돼','출석은 챙겨야지','아쿠아리움은 수업 끝나고 가'],'class');
 }
 if(who==='woonhak'){
  if(/바보|돼지|눈사람|고릴라|아기|귀요미/.test(s))return say(['아 형 갑자기 뭐예요!!','또 저 놀리는 거죠'],'nickname');
  if(/잠바|겉옷|점퍼|자켓/.test(s)&&/줄|준|돌려|가져가|챙겨|받아/.test(s))return say(['진짜 주는 거죠?','조금만 기다려요','제가 금방 갈게요'],'coat');
  if(/동현|고백/.test(s)&&/좋아|고백|말하고/.test(s))return say(['동현이형은 망설이는 거 안 좋아해요','형 진심이면 그냥 말해봐요','제가 먼저 얘기하지는 않을게요'],'affection');
 }
 return beforeStoryReply(name,text,c);
};
// Deduplicate only this seeded line, preserving all other history
for(const c of social.kakao){if(chatIdentity(c.name)!=='seongho')continue;let seen=false;c.messages=c.messages.filter(m=>{if(m.out||m.text!=='너 동민이랑 수업 쨌어?')return true;if(seen)return false;seen=true;return true;});}
function storyCallLines(call){
 if(call.kind==='confession')return ['만나서 얘기해 동민아'];
 if(call.kind==='owner')return call.known?['여보세요? 제가 폰 주인인데요','금방 갈게요','[뒤에서 동현] 아니 동민아 내 저장명이 왜 그러냐니까?','[뒤에서 동현] 너 나 좋아해?','아 잠깐만','저 진짜 금방 갈 테니까 조금만 기다려주세요']:['여보세요? 제가 폰 주인인데요','금방 갈게요','혹시 지금 보신 건 전부 비밀로 해주시면 안 될까요?','[뒤에서 동현] 뭔데 그런 부탁을 해?','아 아무것도 아니야','제발 부탁드릴게요 금방 갈게요'];
 return ['여보세요?','폰 주우신 분 맞으시죠?','찾아주셔서 감사합니다','계신 곳 알려주시면 그쪽으로 갈게요'];
}
let storyCallToken=0;
function playStoryCall(call){
 clearInterval(callTimer); const token=++storyCallToken;
 const b=shell('전화',true);panel.classList.add('incall');
 const lines=storyCallLines(call);
 b.innerHTML=`<div class="callperson">${esc(call.name)}</div><div class="callstate" id="callState">통화 중</div><div class="callportrait">${esc(call.name[0])}</div><div class="callcaption" id="callCaption" aria-live="polite">${esc(lines[0])}</div><button class="endcall" aria-label="통화 종료" onclick="endCall()">${phoneIcon}</button><small class="callmock">음성 없는 통화 시뮬레이션</small>`;
 CALLS.unshift({name:call.name,date:new Date(),missed:false});let seconds=0;
 callTimer=setInterval(()=>{if(token!==storyCallToken||!$('#callCaption')){clearInterval(callTimer);return;}seconds++;$('#callState').textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');$('#callCaption').textContent=lines[Math.min(lines.length-1,Math.floor(seconds/3))];},1000);
}
const STORY_CALL_QUEUE=[];let incomingStoryCall=null;
function flushStoryCalls(){if(incomingStoryCall||!STORY_CALL_QUEUE.length)return;incomingStoryCall=STORY_CALL_QUEUE.shift();const el=document.createElement('div');el.id='storyIncoming';el.innerHTML=`<small>전화 · 수신 중</small><strong>${esc(incomingStoryCall.name)}</strong><div><button id="storyReject">거절</button><button id="storyAccept">받기</button></div>`;document.querySelector('.phone').append(el);el.querySelector('#storyAccept').onclick=()=>{const call=incomingStoryCall;el.remove();incomingStoryCall=null;playStoryCall(call);};el.querySelector('#storyReject').onclick=()=>{el.remove();incomingStoryCall=null;flushStoryCalls();};}
function finishStoryReply(c){if(!c.pendingStoryCall)return;STORY_CALL_QUEUE.push(c.pendingStoryCall);delete c.pendingStoryCall;flushStoryCalls();}
const beforeStoryStartCall=startCall;
startCall=function(name='좋아해'){
 const who=chatIdentity(name);const cs=[...social.kakao,...social.dm].filter(c=>who&&chatIdentity(c.name)===who);
 const owner=cs.find(c=>c.dialogue?.ownerSpeaking);
 if(owner)return playStoryCall({name,kind:'owner',known:PHONE_STORY.savedNameKnown});
 if(cs.some(c=>c.dialogue?.found||c.foundPhone))return playStoryCall({name,kind:'finder'});
 beforeStoryStartCall(name);
};
const beforeStoryEndCall=endCall;
endCall=function(){storyCallToken++;beforeStoryEndCall();flushStoryCalls();};
