module.exports.config = {
	name: "اموال",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "",
	commandCategory: "economy",
	usages: "[Tag]",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"sotienbanthan": "مقدار المال الذي لديك: %1$",
		"sotiennguoikhac": "المبلغ %1 المتاح حاليًا هو:%2$"
	},
	"en": {
		"sotienbanthan": "مقدار المال الذي لديك: %1$",
		"sotiennguoikhac": "المبلغ %1 المتاح حاليًا هو:%2$."
	}
}

module.exports.run = async function({ api, event, args, Currencies, getText }) {
	const { threadID, messageID, senderID, mentions } = event;

	if (!args[0]) {
		const money = (await Currencies.getData(senderID)).money;
		return api.sendMessage(getText("sotienbanthan", money), threadID);
	}

	else if (Object.keys(event.mentions).length == 1) {
		var mention = Object.keys(mentions)[0];
		var money = (await Currencies.getData(mention)).money;
		if (!money) money = 0;
		return api.sendMessage({
			body: getText("sotiennguoikhac", mentions[mention].replace(/\@/g, ""), money),
			mentions: [{
				tag: mentions[mention].replace(/\@/g, ""),
				id: mention
			}]
		}, threadID, messageID);
	}

	else return global.utils.throwError(this.config.name, threadID, messageID);
                   }