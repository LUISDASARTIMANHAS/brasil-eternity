const autoscriptsUser = document.querySelector("autoscriptsuser");
const fonteUser = "https://brasil-eternity.glitch.me/user/"
const srcsUser = [
  "auth"
]


for(let i = 0; i < srcsUser.length; i++){
var newScriptUser = document.createElement('script');
  
newScriptUser.setAttribute('src',fonteUser+srcsUser[i]+".js");
autoscriptsUser.appendChild(newScriptUser)
  
console.log(" Novo User Script Num: " + srcsUser[i])
}
