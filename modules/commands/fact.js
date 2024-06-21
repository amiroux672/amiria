module.exports.config = {
	name: "حقيقة",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "",
	description: "random facts",
	commandCategory: "fact",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
const res = await axios.get(`https://api.popcat.xyz/fact`);
var fact = res.data.fact;
return api.sendMessage(`Did you know? ${fact}`, event.threadID, event.messageID)
}