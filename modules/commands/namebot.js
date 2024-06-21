module.exports.config = {
	name: "اسم_بوت",
	version: "1.0.1",
	hasPermssion: 2,
	credits: "Mr Chand",
	description: "Change bot's nickname in all bots!",
	commandCategory: "system",
	usages: "[nickname to set]",
	cooldowns: 20,
};

module.exports.run = async ({ event, api, args, Threads }) => {
    const custom = args.join(" "),
            allThread = await Threads.getAll(["threadID"]),
            idBot = global.data.botID;
    var threadError = [],
        count = 0;
    if (custom.length != 0) {
        for (const idThread of allThread) {
            api.changeNickname(custom, idThread.threadID, idBot, (err) => (err) ? threadError.push(idThread.threadID) : '');
            count+=1;
            await new Promise(resolve => setTimeout(resolve, 500));
      //      api.sendMessage(`[Broadcast] The Bot has changed the nickname to "${custom}".`, idThread.threadID)
        }
        return api.sendMessage(`تمت إعادة تسمية مجموعة ${count} بنجاح`, event.threadID, () => {
            if (threadError != 0) return api.sendMessage("[!] غير قادر على تغيير الاسم في " + threadError.lenght + " مجموعة",event.threadID, event.messageID)
        }, event.messageID);
    }
    else {
        for (const idThread of allThread) {
            const threadSetting = global.client.threadData.get(idThread.threadID) || {};
            api.changeNickname(`〖  ${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX} 〗 ➺ ${(!global.config.BOTNAME) ? "amiroux" : global.config.BOTNAME}`, idThread.threadID, idBot, (err) => (err) ? threadError.push(idThread.threadID) : '');
            count+=1;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        return api.sendMessage(`تمت إعادة تسمية مجموعة ${count} بنجاح`, event.threadID, () => {
            if (threadError != 0) return api.sendMessage("[!]غير قادر على تغيير الاسم في " + threadError.length + " مجموعة",event.threadID, event.messageID)
        }, event.messageID);
    }
}