module.exports.config = {
	name: "اعادة_التشغيل",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "manhIT",
	description: "Restart Bot",
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`${global.config.BOTNAME} جاري اعادة التشغيل...`, threadID, () => process.exit(1));
}