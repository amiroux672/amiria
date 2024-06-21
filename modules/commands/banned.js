module.exports.config = {
	name: "banned",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "",
	description: "عرض قائمة المجموعات أو المستخدمين المحظورين\nالاعتمادات: NTKhang",
	commandCategory: "",
	usages: "[thread], [user]",
	cooldowns: 5,
};
module.exports.run = async function({api, args, Users, event, Threads, client}) {

	if (args[0] == "user") {
		var list = client.allUser || [];
		var listuserbanned = [];
		for (var iduser of list) {
			const banned = (await Users.getData(iduser))
				.banned;
			if (banned == 1) {
				listuserbanned.push({
					id: iduser
				});
			}
		}
		var msg = "";
		for (let i = 0; i < listuserbanned.length; i++) {
			const name = (await Users.getData(listuserbanned[i].id))
				.name;
			msg += `${i+1}. اسم: ${name}\nID: ${listuserbanned[i].id}\n`
		}
		msg == "" ? api.sendMessage("حاليا، لم يتم حظر أي مستخدم", event.threadID, event.messageID) : api.sendMessage("❎من بين المستخدمين الذين تم حظرهم من نظام الروبوت:\n\n" + msg, event.threadID, event.messageID);
	}
	else if (args[0] == "thread") {
		var list = client.allThread || [];
		var listthreadbanned = [];
		for (var idthread of list) {
			const banned = (await Threads.getData(idthread))
				.banned;
			if (banned == 1) {
				listthreadbanned.push({
					id: idthread
				});
			}
		}
		var msg = "";
		for (let i = 0; i < listthreadbanned.length; i++) {
			let namethread = (await api.getThreadInfo(listthreadbanned[i].id))
				.threadName;
			msg += `${i+1}. اسم: ${namethread}\nID: ${listthreadbanned[i].id}`;
		}
		msg.length == 0 ? api.sendMessage("لا يوجد حاليا أي مواضيع محظورة", event.threadID, event.messageID) : api.sendMessage("❎المواضيع التي تم حظرها من نظام الروبوت تشمل:\n\n" + msg, event.threadID, event.messageID);
	}
	else api.sendMessage("خطأ", event.threadID, event.messageID);
}
