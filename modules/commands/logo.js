const API = "https://api--n4y4n7.repl.co/api/textpro?number=1111&text="
module.exports.config = {
	name: "شعار",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "",
	description: "logo",
	commandCategory: "text maker",
	usages: "blood<text>",
	cooldowns: 10
};
module.exports.run = async function ({ api, event, args,}) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const qs = require("querystring");
    tukhoa = args.join(" ");
    (event.type == "message_reply") ? tukhoa = event.messageReply.attachments[0].url: tukhoa = args.join(" ");
    const pathsave = __dirname + `/cache/banner.png`;
    let imageBuffer;
    api.sendMessage(`🦋جارٍ إنشاء شعارك\n\nالرجاء الانتظار🦋`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 3000));
    axios.get(`${API}${encodeURI(tukhoa)}`, {responseType: "arraybuffer"}) .then(data => {const imageBuffer = data.data;
    fs.writeFileSync(pathsave, Buffer.from(imageBuffer));
    api.sendMessage({body: `⏩شعارك في Xit⏩\n\n➤AAmiroux`, attachment: fs.createReadStream(pathsave)}, event.threadID, () => fs.unlinkSync(pathsave), event.messageID);}).catch(error => {

          
            let err;
            if (error.response) err = JSON.parse(error.response.data.toString());
            else err = error;
            return api.sendMessage(`خطأ! حدث خطأ. اذا سمحت حاول مرة أخرى لاحقا ${err.error} ${err.message}`, event.threadID, event.messageID);
        })
};