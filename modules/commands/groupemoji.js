module.exports.config = {
	name: "ايموجي_المجموعة",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "D",
	description: "i",
	commandCategory: "Box", 
	usages: "groupemoji [name]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var emoji = args.join(" ")
	if (!emoji) api.sendMessage("لم تقم بإدخال الرموز التعبيرية", event.threadID, event.messageID)
	else api.changeThreadEmoji(emoji, event.threadID, () => api.sendMessage(`🔨 نجح الروبوت في تغيير الرموز التعبيرية إلى: ${emoji}`, event.threadID, event.messageID));
}