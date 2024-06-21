module.exports.config = {
	name: "بية",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "",
	description: "Change bot's bio",
	commandCategory: "admin",
	usages: "bio [text]",
  cooldowns: 5
  
}
  
  module.exports.run = async ({ api, event, global, args, permssion, utils, client, Users }) => {
    api.changeBio(args.join(" "), (e) => {
      if(e) api.sendMessage("حدث خطأ" + e, event.threadID); return api.sendMessage("تم تغيير السيرة الذاتية للبوت إلى: \n"+args.join(" "), event.threadID, event.messgaeID)
    }
    )
  }