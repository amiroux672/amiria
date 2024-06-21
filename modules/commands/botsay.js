module.exports.config = {
	name: "اكتب",
	version: "1.1.1",
	hasPermssion: 2,
	credits: "",
	description: "تقليد الدردشة الخاصة بك",
	commandCategory: "Imitation",
	usages: "[text/message/chat]",
	cooldowns: 4
};

module.exports.run = async ({ api, event,args }) => {
var say = args.join(" ")
	if (!say) api.sendMessage("من فضلك أدخل رسالة 😑", event.threadID, event.messageID)
	else api.sendMessage(`${say}`, event.threadID, event.messageID);
}
