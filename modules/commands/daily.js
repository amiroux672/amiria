module.exports.config = {
	name: "يومي",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "",
	commandCategory: "economy",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 40,
        rewardCoin: 100000
    }
};

module.exports.languages = {
    "vi": {
        "cooldown": "أنت في انتظار الوقت\nيرجى المحاولة مرة أخرى لاحقًا: %1 ساعة %2 دقيقة %3 ثانية!",
        "rewarded": "لقد تلقيت %1$، لمواصلة الاستلام، يرجى العودة بعد 12 ساعة"
    },
    "en": {
        "cooldown": "لقد تلقيت مكافآت اليوم، يرجى العودة بعد: %1 ساعة %2 دقيقة %3 ثانية.",
        "rewarded": "لقد تلقيت %1$، لمواصلة الاستلام، يرجى المحاولة مرة أخرى بعد 12 ساعة"
    }
}

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { daily } = global.configModule,
        cooldownTime = daily.cooldownTime,
        rewardCoin = daily.rewardCoin;

    var { senderID, threadID } = event;

    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldownTime - (Date.now() - (data.dailyCoolDown || 0)) > 0) {
        var time = cooldownTime - (Date.now() - data.dailyCoolDown),
            seconds = Math.floor( (time/1000) % 60 ),
            minutes = Math.floor( (time/1000/60) % 60 ),
            hours = Math.floor( (time/(1000*60*60)) % 24 );

		return api.sendMessage(getText("cooldown", hours, minutes, (seconds < 10 ? "0" : "") + seconds), threadID);
    }

    else return api.sendMessage(getText("rewarded", rewardCoin), threadID, async () => {
        await Currencies.increaseMoney(senderID, rewardCoin);
        data.dailyCoolDown = Date.now();
        await Currencies.setData(senderID, { data });
        return;
    });
}