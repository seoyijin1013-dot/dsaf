'use strict';
// 규칙은 위에서부터 검사하며 대화방별 주제와 진행 상태를 저장합니다
const CHAT_PEOPLE = {
  '좋아해': 'donghyeon', 'kdhxxn_': 'donghyeon',
  '똥개의 일상': 'jaehyeon', 'myeongmyeong': 'jaehyeon',
  '돼지': 'woonhak', 'freshboyy._.': 'woonhak',
  '펌킨팍': 'seongho', '펌킨박': 'seongho', '상혁이형': 'sanghyeok'
};
const REPLY_BANK = {
  donghyeon: {
    greet: [['왜','나 인문관인데'],['어','너 어디야'],['지금 봤어','무슨 일인데']],
    food: [['밥 아직 안 먹었어','같이 먹게'],['라면?','너네 집 가면 됨?'],['오늘은 국밥 먹자','정문 앞으로 나와']],
    aqua: [['인어쇼 2시래','나 그거 봐야 됨'],['코리도라스 있는 쪽부터 보자','너도 보면 좋아할걸'],['이번엔 다른 데 가자','내가 찾아볼게']],
    work: [['나도 아직 안 냈어','왜 이렇게 하기 싫지'],['물레 작업하다가 시간 다 감','교양은 언제 하지'],['너 먼저 했으면 알려줘','그대로 베끼진 않고']],
    location: [['나 인문관 앞','너 어디냐고'],['아직 학교','너 기다리는 중'],['정문까지 갈까?','어디로 나오는데']],
    date: [['엥','누가 그래','나 여친 없는데'],['뭐래','갑자기 왜 물어봐'],['그냥 친구랑 간 건데','너도 아는 애는 아님']],
    affection: [['뭐래','장난치냐?'],['갑자기?','무슨 일 있어?'],['전화로 말해봐','채팅으로 뭔 소린지 모르겠음']],
    thanks: [['뭘ㅋㅋ','밥이나 사'],['ㅇㅋ','다음엔 네가 사'],['됐어','늦지나 마']],
    joke: [['ㅋㅋㅋㅋㅋㅋ','아니 진짜로'],['뭐래ㅋㅋ','말 돌리지 말고'],['황당하네','그래서 올 거야?']],
    tired: [['어제 늦게 잤어?','밥은 먹고 자'],['그러면 오늘은 쉬어','아쿠아리움은 다음에 가고'],['무리하지 말고','필요한 거 있으면 말해']],
    default: [['?','왜'],['뭔데','좀 자세히 말해봐'],['아니 그래서','너 언제 와?'],['나 인문관 앞이라니까','카톡 좀 봐'],['전화할까?','말로 해봐'],['ㅇㅇ 보고 있어','계속 말해']]
  },
  jaehyeon: {
    food:[['ㅋㅋㅋㅋ 또 동현이랑 먹냐','난 성호랑 먹을 건데'],['제육 말고 다른 거 먹자ㅋㅋㅋㅋ','운학이한테 말해봐'],['정문으로 와','다 같이 먹게']],
    aqua:[['ㅋㅋㅋㅋㅋㅋ 또?','동현이가 가자고 했냐'],['너네 진짜 그만 붙어다녀ㅋㅋㅋㅋ','이번엔 어디 가는데'],['물고기 보러 간다면서','사진엔 맨날 둘만 있더라ㅋㅋㅋㅋ']],
    work:[['나도 과제 중ㅋㅋㅋㅋ','아니 왜 맨날 마감이냐'],['성호한테 물어봐','걔는 해놨을걸'],['일단 제출부터 해ㅋㅋㅋㅋ','완벽하게 하려다가 늦지 말고']],
    affection:[['ㅋㅋㅋㅋㅋㅋ','동민아 너 티 좀 나'],['난 뭐 말 안 했다ㅋㅋㅋㅋ','네가 알아서 해'],['직접 얘기해봐','술 먹고 하지 말고ㅋㅋㅋㅋ']],
    location:[['나 경영관ㅋㅋㅋㅋ','왜'],['성호 찾으러 가는 중','너 걔 봤냐'],['동방엔 동현이 없다ㅋㅋㅋㅋ','또 찾냐']],
    greet:[['ㅋㅋㅋㅋ 왔냐','폰은 찾았고?'],['야 동민아','무슨 일이냐']],
    thanks:[['뭘ㅋㅋㅋㅋ','나중에 밥 사'],['ㅇㅋㅋㅋㅋㅋ','다음엔 폰 잘 챙기고']],
    joke:[['ㅋㅋㅋㅋㅋㅋㅋㅋ','너 진짜 웃긴다'],['이런 거 보내지 마라ㅋㅋㅋㅋ','수업 중에 봤잖아']],
    tired:[['ㅋㅋㅋㅋ 일단 좀 자','밥도 먹고'],['무슨 일 있냐','장난 안 칠 테니까 말해봐']],
    default:[['ㅋㅋㅋㅋ 그래서?','계속 말해봐'],['야 동민아','그건 네가 직접 물어봐'],['성호한테도 물어볼까?','걔 지금 옆에 있음'],['ㅋㅋㅋㅋ 알겠어','그래서 뭐 도와주면 되는데']]
  },
  woonhak: {
    food:[['형 제육 먹을래요?','정문 앞 백반집이요'],['오늘은 국밥이에요','동현이형이 고름'],['안 온다면서요!!','동현이형 얘기하면 바로 오네']],
    aqua:[['또 가요?','동현이형 진짜 좋아하네'],['저도 사진 보여줘요','물고기 말고 밥 사진도'],['형 이번에도 밥 사주는 거예요?','아니 그냥 궁금해서요']],
    work:[['저도 과제 있어요 형','이번 주 진짜 많아요'],['아직 안 끝났어요','끝나면 연락할게요'],['형 제출부터 해요','마감 지나면 진짜 안 받아요']],
    coat:[['형 제 잠바요!!','언제 주실 건데요'],['도서관이요?','제가 가지러 갈게요'],['이번엔 진짜 챙겨줘요','저 추워요 형']],
    affection:[['네?','그걸 왜 저한테 물어봐요'],['동현이형한테 물어봐요','제가 어떻게 알아요!!'],['형 일단 직접 말해봐요','저는 아무 말 안 할게요']],
    location:[['저 체육관이요','왜요 형'],['과방인데요','동현이형 찾는 거예요?'],['정문 앞이에요','5분이면 와요?']],
    greet:[['형!!','폰 찾은 거예요?'],['왜요 형','무슨 일인데요']],
    thanks:[['그럼 잠바 돌려줘요','진짜로'],['네ㅋㅋ','밥 사줘요 형']],
    joke:[['아 형 진짜!!','저 또 속이는 거죠'],['그만 놀려요','이번엔 안 믿어요']],
    tired:[['형 밥은 먹었어요?','안 먹었으면 같이 먹어요'],['오늘은 좀 쉬어요','내일 봐도 되잖아요']],
    default:[['네?','무슨 말이에요 형'],['형 천천히 말해요','저 지금 보고 있어요'],['아니 왜 저한테만 그래요!!','진짜 억울하네'],['그래서 제가 뭐 하면 돼요?','말해봐요']]
  },
  seongho: {
    food:[['밥은 먹었어?','안 먹었으면 같이 먹자'],['메뉴부터 정하자','어디가 괜찮아?'],['정문에서 볼까?','몇 시에 끝나는데?']],
    aqua:[['동현이랑 가는 거야?','과제는 끝냈고?'],['몇 시에 돌아와?','수업 겹치지는 않아?'],['다녀와','물건 놓고 오지 말고']],
    work:[['어떤 과제인데?','마감부터 확인해봐'],['제출 형식은 확인했어?','파일도 다시 열어보고'],['급한 것부터 해','끝나면 연락하고']],
    affection:[['동민아','그건 동현이한테 직접 물어보는 게 낫지 않을까'],['확실히 들은 얘기야?','짐작만 하고 있는 건 아니고?'],['지금 바로 결론 내리지 말고','천천히 생각해봐']],
    location:[['나 도서관','무슨 일 있어?'],['재현이 찾는 거야?','나도 못 봤어'],['정문으로 나갈게','어디쯤이야?']],
    greet:[['동민아','폰은 찾았어?'],['왜?','무슨 일인데?']],
    thanks:[['괜찮아','다음부터 잘 챙겨'],['응','필요하면 다시 연락해']],
    joke:[['재현이가 시켰어?','또 무슨 장난인데'],['동민아','그건 안 할게']],
    tired:[['어디 아픈 건 아니지?','밥은 먹었어?'],['일단 쉬어','급한 일은 내가 확인할게']],
    default:[['어떤 얘기인지 조금 더 말해줄래?'],['그건 확인해봐야겠네','언제 있었던 일이야?'],['알겠어','그럼 어떻게 할 생각인데?'],['동민아','필요한 게 있으면 정확하게 말해줘']]
  },
  sanghyeok: {
    food:[['아직 안 먹었으면 같이 먹자','뭐 먹고 싶어?'],['동현이도 부를까?','너 괜찮으면'],['이번엔 네가 사는 거지','전에 한 말 기억한다']],
    aqua:[['동현이랑 가는 거구나','잘 다녀와'],['너도 즐거워야지','걔가 좋아해서만 가지 말고'],['사진 잘 찍고','무리해서 일정 맞추지는 마']],
    work:[['어디까지 했어?','막히는 부분부터 말해봐'],['일단 초안이라도 만들어','같이 확인해줄게'],['오늘은 과제부터 끝내자','나머지는 내일 생각하고']],
    affection:[['동민아','술 먹고 얘기하지는 말고','멀쩡할 때 네 말로 해'],['걔 마음까지 내가 알 수는 없지','너도 너무 먼저 겁먹지는 마'],['급하게 결론 내리지 마','네가 편하게 말할 수 있을 때 해'],['재현이가 눈치챈 것 같긴 해','그래도 내가 먼저 말할 일은 없어']],
    location:[['나 도서관','동현이는 지금 옆에 없어'],['정문 쪽으로 갈게','너 수업 끝났어?'],['겉옷 갖고 있으면 기다려','내가 가지러 갈게']],
    greet:[['동민아','폰 찾았어?'],['응','무슨 일이야']],
    thanks:[['괜찮아','너무 신경 쓰지 마'],['밥 산다는 말은 기억할게','일단 오늘 할 일부터 해']],
    joke:[['너 또 무슨 생각 하는데','말해봐'],['그 장난은 동현이한테 해','나는 안 속는다']],
    tired:[['괜찮아?','무슨 일 있었어?'],['지금 혼자 있어?','필요하면 내가 갈게'],['오늘은 좀 쉬어','혼자 다 해결하려고 하지 말고']],
    default:[['응 듣고 있어','편하게 말해봐'],['그때 너는 어땠는데?','그게 더 중요하지'],['알겠어','내가 뭘 도와주면 될까?'],['급하게 답 안 해도 돼','생각 정리되면 말해']]
  }
};
function chatIdentity(name) { return CHAT_PEOPLE[name] || null; }
function nextBank(state, person, topic) {
  const bank = REPLY_BANK[person][topic] || REPLY_BANK[person].default;
  state.counts ||= {};
  const count = state.counts[topic] || 0;
  state.counts[topic] = count + 1;
  return bank[count % bank.length];
}
function generateReply(name, text, conversation) {
  const person = chatIdentity(name);
  if (!person) return [];
  const state = conversation.dialogue ||= { topic: null, found: !!conversation.foundPhone, stage: 'start', counts: {} };
  const s = text.trim().toLowerCase();
  const pick = topic => { state.topic = topic; return nextBank(state, person, topic); };
  if (/주웠|주우|주운|습득|폰.*발견/.test(s) && !/안\s*주웠|못\s*주웠|안\s*주운/.test(s)) {
    state.found = true; conversation.foundPhone = true; state.stage = 'location';
    return {
      donghyeon:['아 동민이 폰을 주우신 거예요?','지금 어디 계세요?'],
      jaehyeon:['아 주우셨구나','동민이 아는 형이에요ㅋㅋㅋㅋ','제가 받으러 가도 될까요?'],
      woonhak:['아 형 폰 주우셨어요?','저 동민이형 동생이에요','어디로 가면 돼요?'],
      seongho:['알려주셔서 감사합니다','동민이 지인이에요','어디에서 주우셨나요?'],
      sanghyeok:['아 주우셨구나','동민이 아는 형이에요','제가 대신 받으러 가도 될까요?']
    }[person];
  }
  if (person === 'donghyeon' && /저장명|좋아해로|좋아해라고/.test(s)) {
    state.topic = 'savedname';
    return nextBank(state, person, 'savedname').length && [
      ['제 저장명이요?','좋아해라고 돼 있다고요?','아','일단 폰부터 받을 수 있을까요?'],
      ['저도 지금 처음 알았어요','그건 동민이한테 직접 물어볼게요'],
      ['저는 그냥 친구인데','지금은 폰부터 받아야 할 것 같아요']
    ][(state.counts.savedname-1)%3];
  }
  if (state.found) {
    if (/사랑|고백|짝사랑|사귀|좋아하|저장명/.test(s)) return person==='donghyeon'?['그건 동민이한테 직접 물어볼게요','제가 대신 대답할 수는 없어서요']:['그건 제가 함부로 말씀드릴 얘기는 아닌 것 같아요','폰만 전해주시면 감사하겠습니다'];
    if (/돈|사례|보상/.test(s)) return ['찾아주셔서 감사해요','사례는 동민이랑 직접 이야기해주실 수 있을까요?'];
    if (/비번|비밀번|잠금/.test(s)) return ['잠금은 그대로 두셔도 돼요','제가 가서 동민이한테 전해줄게요'];
    if (/누구|성함|이름|관계/.test(s)) return {
      donghyeon:['김동현이요','동민이랑 같은 학년 친구예요'],jaehyeon:['명재현이에요','동민이 아는 형이에요'],woonhak:['김운학이요','동민이형 아는 동생이에요'],seongho:['박성호입니다','동민이 아는 형이에요'],sanghyeok:['이상혁이에요','동민이랑 친한 형이에요']
    }[person];
    if (/전화|연락처|번호/.test(s)) return ['이 채팅으로 연락 주시면 돼요','도착하면 여기로 다시 연락드릴게요'];
    if (/못\s*기다|바빠|급해|가야/.test(s)) return ['그러시면 근처 안내데스크에 맡겨주실 수 있을까요?','맡긴 곳만 알려주시면 제가 찾아갈게요'];
    if (/안내데스크|경비실|분실물|맡겼|맡겨/.test(s)) { state.stage='deposited'; return ['네 어디에 맡기셨는지 확인했어요','제가 가서 찾아볼게요','알려주셔서 감사합니다']; }
    if (/배터리|꺼질|충전/.test(s)) return ['충전까지 해주실 필요는 없어요','꺼지기 전에 위치만 알려주실 수 있을까요?'];
    if (/언제|몇\s*분|얼마나|도착했/.test(s)) return state.stage==='location'?['계신 곳부터 알려주시면','걸리는 시간 확인해볼게요']:['5분 정도 걸릴 것 같아요','도착하면 채팅드릴게요'];
    if (/어디|어느\s*쪽/.test(s)) return person==='donghyeon'?['저는 지금 인문관 앞이에요','계신 곳 알려주시면 그쪽으로 갈게요']:['저는 지금 학교에 있어요','어디로 가면 될까요?'];
    if (/인문관|정문|후문|도서관|카페|학교|\d+층|앞에|앞이|옆에|주소|편의점|건물/.test(s)) { state.stage='meeting';state.place=text;return ['네 위치 확인했어요','그쪽으로 갈게요','잠깐만 기다려 주세요']; }
    if (/고마|감사|천만/.test(s)) return ['저희가 더 감사하죠','찾아주셔서 정말 감사합니다'];
    if (/^(네|넵|넹|예|응|ㅇㅇ|ㅇㅋ|알겠|기다|오케)/.test(s)) return state.stage==='meeting'?['네 출발했어요','도착하면 다시 연락드릴게요']:state.stage==='deposited'?['네 감사합니다','제가 가서 확인할게요']:['감사합니다','계신 곳 알려주시면 제가 갈게요'];
    return state.stage==='meeting'?['네 말씀하신 곳으로 가고 있어요','조금만 기다려 주세요']:['혹시 지금 계신 곳을 알려주실 수 있을까요?','제가 직접 받으러 가겠습니다'];
  }
  if (/고백|짝사랑|좋아하|사귀|마음.*말/.test(s)) return pick('affection');
  if (person==='donghyeon' && /여친|여자친구/.test(s)) return pick('date');
  if (/아쿠아리움|물고기|코리도라스|인어|수조/.test(s)) return pick('aqua');
  if (person==='woonhak' && /잠바|겉옷|점퍼|자켓/.test(s)) return pick('coat');
  if (/밥|라면|제육|국밥|점심|저녁|배고|뭐\s*먹|먹을/.test(s)) return pick('food');
  if (/과제|교양|제출|마감|팀플|물레|작업/.test(s)) return pick('work');
  if (/피곤|힘들|아파|우울|잠이|졸려|쉬고/.test(s)) return pick('tired');
  if (/어디|ㅁㅎ|뭐\s*해|뭐해/.test(s)) return pick('location');
  if (/고마|감사/.test(s)) return pick('thanks');
  if (/ㅋㅋ|ㅎㅎ|장난|릴스/.test(s)) return pick('joke');
  if (/전화|통화/.test(s)) return person==='donghyeon'?['왜','걸어']:['지금 말해도 돼','무슨 일이야?'];
  if (/몇\s*시|언제|시간|내일|오늘/.test(s)) {
    if(state.topic==='aqua') return person==='donghyeon'?['2시','인문관 앞에서 보자']:['수업 끝나고 갈까?','몇 시가 괜찮아?'];
    if(state.topic==='food') return person==='woonhak'?['1시 반이요','정문 앞 백반집']:['수업 끝나고 보자','끝나는 시간 알려줘'];
    if(state.topic==='work') return ['오늘 안에 끝내야 돼','너는 어디까지 했어?'];
    return person==='donghyeon'?['지금 나와','기다리고 있어']:['언제가 편해?','네 일정부터 알려줘'];
  }
  if (/^(응|ㅇㅇ|ㅇㅋ|네|넵|넹|알겠|오케|좋아|갈게|그래)[! ?ㅋㅋㅎ]*$/.test(s)) {
    if(state.topic==='food') return person==='woonhak'?['자리 잡아둘게요','빨리 와요 형']:['ㅇㅋ','자리 잡아둘게'];
    if(state.topic==='aqua') return person==='donghyeon'?['ㅇㅋ','늦지 마']:['다녀와','사진도 보여줘'];
    if(state.topic==='affection') return person==='sanghyeok'?['응','네가 정한 대로 해','내가 먼저 말하지는 않을게']:['그래','너무 급하게 생각하지 말고'];
    if(state.topic==='work') return ['끝나면 연락해','나도 마저 할게'];
    return ['ㅇㅋ','무슨 일 있으면 다시 말해'];
  }
  if (/왜|어떻게|뭔데|무슨\s*뜻|그다음|더\s*말/.test(s) && state.topic) return nextBank(state,person,state.topic);
  if (!state.prompted && person!=='donghyeon') { state.prompted=true;return {jaehyeon:['ㅋㅋㅋㅋ 동민이 폰 찾았냐?','어디 두고 온 건데'],woonhak:['형 폰 찾았어요?','진짜 찾은 거예요?'],seongho:['동민아 폰은 찾았어?','어디에 두고 온 거야?'],sanghyeok:['동민아 폰 찾았어?','걱정했잖아']}[person]; }
  if (/안녕|하이|야$|형$/.test(s)) return pick('greet');
  return nextBank(state,person,'default');
}
// Pending tasks are transient and never serialized into localStorage
const CHAT_QUEUES = new Map();
queueReplies10 = function(type, index, text) {
  const conversation=social[type][index];
  if(!chatIdentity(conversation.name)) return;
  const key=type+':'+index;
  let queue=CHAT_QUEUES.get(key);
  if(!queue) {queue={items:[],busy:false};CHAT_QUEUES.set(key,queue);}
  queue.items.push(text);
  if(queue.busy) return;
  queue.busy=true;
  function process() {
    if(!queue.items.length){queue.busy=false;return;}
    const lines=generateReply(conversation.name,queue.items.shift(),conversation).map(s=>s.replace(/\./g,''));
    let cursor=0;
    function emit(){
      if(cursor>=lines.length){if(typeof finishStoryReply==='function')finishStoryReply(conversation);process();return;}
      setTimeout(()=>{
        conversation.messages.forEach(m=>{if(m.out)m.delivered=true;});
        conversation.messages.push({out:false,text:lines[cursor++],ts:Date.now(),user10:true});
        const visible=visibleConversation();
        conversation.read=!!visible&&visible.c===conversation;
        saveSocial();
        if(conversation.read)renderVisibleMessages();
        emit();
      },850);
    }
    emit();
  }
  process();
};

'use strict';
const previousGenerateReply = generateReply;
generateReply = function(name, text, conversation) {
  const person = chatIdentity(name);
  if (!person) return [];
  const state = conversation.dialogue ||= {topic:null,found:!!conversation.foundPhone,stage:'start',counts:{}};
  const s = text.trim().toLowerCase();
  const cycle = (topic, bank) => {
    state.topic = topic;
    state.counts ||= {};
    const n = state.counts[topic] || 0;
    state.counts[topic] = n + 1;
    return bank[n % bank.length];
  };
  const disclosure = /주웠|주우|주운|습득|폰.*발견/.test(s) && !/안\s*주웠|못\s*주웠|안\s*주운/.test(s);
  if (disclosure) return previousGenerateReply(name, text, conversation);
  const relation = /무슨\s*사이|어떤\s*사이|뭔\s*사이|사이가|사이야|사이예|사이에|관계|친구야|친구예|친구인|애인|남자친구|남친/.test(s);
  const affection = /좋아해|좋아하|사랑해|사랑하|고백|마음.*있|마음.*알/.test(s);
  const shortFollow = /^(왜|왜요|그래서|그럼|진짜|진심|정말|응|ㅇㅇ|네|어|맞아|장난\s*아니야|뭐라고|뭔데|말해봐|계속|어떻게)[? !ㅋㅎ]*$/.test(s);
  if (state.found) {
    if (person === 'donghyeon' && relation) return cycle('finder-relation', [
      ['동민이랑 친구예요','같은 학년이고요','제가 받으러 가도 괜찮을까요?'],
      ['네 친구 맞아요','평소에도 같이 다녀서요','동민이한테 제가 받는다고 전해둘게요'],
      ['다른 사이는 아니고 친구예요','혹시 본인한테 확인이 필요하시면','제가 동민이 연락할 방법부터 찾아볼게요']
    ]);
    if (person === 'donghyeon' && (affection || /저장명|좋아해로|좋아해라고/.test(s))) return cycle('finder-affection', [
      ['잠깐만요','그렇게 저장돼 있다고요?','저는 처음 듣는 얘기라서요','그건 동민이한테 직접 물어볼게요'],
      ['동민이가 저를요?','제가 여기서 무슨 말을 하기는 좀 그래서요','일단 폰부터 받을 수 있을까요?'],
      ['네 무슨 말씀인지는 알겠어요','근데 동민이 없는 데서 얘기하고 싶지는 않아요','직접 만나서 물어볼게요']
    ]);
    if (person === 'donghyeon' && shortFollow && /^finder-/.test(state.topic || '')) return cycle('finder-follow', [
      ['저도 지금 처음 안 거라서요','친구인 건 맞아요','나머지는 동민이랑 얘기할게요'],
      ['제가 대신 대답할 얘기는 아닌 것 같아요','혹시 폰은 어디로 받으러 가면 될까요?']
    ]);
    return previousGenerateReply(name,text,conversation);
  }
  if (/(폰|핸드폰|휴대폰).*(찾았|찾음|찾앗|찾았어|되찾)|찾았.*(폰|핸드폰|휴대폰)/.test(s)) {
    return cycle('phone-recovered', {
      donghyeon:[['아 찾았어?','다행이네','어디 두고 온 건데'],['한참 연락 안 돼서','나 계속 인문관 앞에 있었잖아','폰 챙기고 나와'],['ㅇㅇ 찾았으면 됐어','또 놓고 다니지 말고','지금 어디야']],
      jaehyeon:[['ㅋㅋㅋㅋㅋㅋ 찾았냐','다행이다 진짜','어디서 나왔는데'],['야 다음엔 잘 챙겨ㅋㅋㅋㅋ','다들 너 찾고 있었잖아']],
      woonhak:[['형 찾았어요?','와 다행이다','제가 얼마나 연락했는데요!!'],['이제 진짜 잘 챙겨요','폰 찾았으면 제 잠바도 찾아줘요']],
      seongho:[['찾아서 다행이네','어디 있었어?','다른 건 잃어버린 거 없고?'],['응 다행이다','걱정한 사람들한테 연락부터 해줘']],
      sanghyeok:[['찾았구나','다행이다','많이 놀랐지'],['이제 잘 챙기고','다른 애들한테도 찾았다고 알려줘']]
    }[person]);
  }
  if (person === 'sanghyeok' && /들켰|들킨|눈치|알아챘|알아버|알게\s*된|알게\s*됐/.test(s) && (/동현|좋아|마음|고백/.test(s) || state.topic === 'exposed')) return cycle('exposed', [
    ['동현이가 뭐라고 했는데?','네가 좋아하는 걸 알았다고 직접 말했어?','일단 있었던 일부터 말해봐'],
    ['동민아 아직 모르는 거잖아','당황해서 먼저 장난이었다고 하지는 말고','걔가 어떻게 반응했는지 보자'],
    ['알게 됐다고 해서 바로 나쁜 쪽으로 생각하지 마','걔 마음은 걔한테 들어야 아는 거니까','네가 말할 준비가 됐는지가 먼저야']
  ]);
  if (person === 'sanghyeok' && state.topic === 'exposed' && !/밥|과제|아쿠아리움|어디/.test(s)) return cycle('exposed', [
    ['갑자기 알게 된 거면 걔도 놀랐겠지','바로 대답 안 했다고 싫다는 뜻은 아니야','너는 지금 어떻게 하고 싶어?'],
    ['네 마음까지 없던 일로 만들지는 마','얘기할 거면 둘이 있을 때 해','내가 먼저 동현이한테 말하지는 않을게'],
    ['응 나한테는 편하게 말해','걔한테 뭐라고 보낼지 같이 생각해보자','지금 답장 왔어?']
  ]);
  if (person === 'donghyeon' && relation) return cycle('our-relation', [
    ['갑자기?','우리?','왜 그런 걸 물어봐'],
    ['아니','친구긴 한데','네가 물으니까 뭐라고 해야 될지 모르겠네'],
    ['너는 어떻게 생각하는데','나만 대답해야 됨?'],
    ['동민아','그건 만나서 얘기하자','너 지금 어디야']
  ]);
  if (person === 'donghyeon' && affection && !/안\s*좋아|안\s*사랑/.test(s)) return cycle('confession', [
    ['나를?','잠깐','지금 장난치는 거 아니지?'],
    ['아','생각을 못 해서','뭐라고 답해야 될지 모르겠어'],
    ['언제부터?','아니 싫다는 게 아니라','갑자기 들어서 그래'],
    ['동민아','그 얘기 채팅으로만 하기는 좀 그런데','얼굴 보고 얘기하면 안 돼?']
  ]);
  if (person === 'donghyeon' && state.topic === 'confession' && (/장난|진심|진짜|언제|몇\s*달|오래|싫어|부담|대답|미안|왜|응|ㅇㅇ/.test(s))) return cycle('confession', [
    ['장난 아닌 거 알겠어','나도 대충 대답하고 싶지는 않아','조금만 생각할 시간 줘'],
    ['싫어서 이러는 건 아니야','네가 그런 생각 하는 줄은 몰랐으니까','나도 좀 정리해야지'],
    ['미안하다고 하지 마','네가 잘못한 것도 아니잖아','우리 만나서 얘기하자'],
    ['지금 나올 수 있어?','나 인문관 앞에 있을게','피하려는 거 아니니까 와']
  ]);
  if (person === 'donghyeon' && state.topic === 'our-relation' && shortFollow) return cycle('our-relation', [
    ['아니 대답 안 하겠다는 게 아니라','갑자기 물으니까 그렇지','너는 어떤 대답 듣고 싶은데'],
    ['나도 생각 좀 하자','평소처럼 얘기하다가 갑자기 그러니까','너 무슨 일 있는 줄 알았어'],
    ['동민아','이건 얼굴 보고 얘기하자','나 기다리고 있을게']
  ]);
  return previousGenerateReply(name,text,conversation);
};
