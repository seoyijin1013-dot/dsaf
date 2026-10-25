// chat-cleanup — execution order 9
for(let i=CHATS.length-1;i>=0;i--){if(/작사/.test(CHATS[i].title))CHATS.splice(i,1);}
