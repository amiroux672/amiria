module.exports.config = {
	name: "ادمن",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "Abdulla Rahaman",
	description: "Abdulla Tech 49",
	commandCategory: "...",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
var link =["", 
            
            "", 
            
"",
            
            ""];
  
var callback = () => api.sendMessage({body:`ادمن البوت\n
------------------------------------------------\nاسم       : امير\nالقب: بوعزة\n𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : https://www.facebook.com/amir.x.i.2024\nليس حساب اساسي فقط لتواصل\n العمر: 23\n اصل: وهران\nالعلاقات : (𝗦𝗶𝗻𝗴𝗹𝗲)`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };