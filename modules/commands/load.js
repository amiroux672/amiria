module.exports.config = {
	name: "ريديماري",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "𝐩",
	description: "إعادة تحميل بيانات ملف التكوين",
	commandCategory: "Admin",
	usages: "[]",
	cooldowns: 30
};
module.exports.run = async function({ api, event, args,Threads, Users }) {
delete require.cache[require.resolve(global.client.configPath)];
global.config = require(global.client.configPath);
return api.sendMessage("[OK] إعادة تحميل التكوين...", event.threadID, event.messageID);    
} 