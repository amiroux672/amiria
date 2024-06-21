module.exports.config = {
	name: "تحديث",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "",
	commandCategory: "system",
	cooldowns: 500
};

module.exports.run = async ({ event, api, Threads }) => {
    const threadInfo = await api.getThreadInfo(event.threadID);
	await Threads.setData(event.threadID, { name: threadInfo.name, threadInfo });
	global.data.threadInfo.set(parseInt(event.threadID), threadInfo);
    return api.sendMessage("تم تحديث معلومات المجموعة بنجاح!", event.threadID, event.messageID);
}