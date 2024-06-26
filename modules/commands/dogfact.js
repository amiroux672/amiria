module.exports.config = {
    name: "كلاب",
    version: "1.0.0",
    hasPermision: 0,
    credit: "",
    description: "شاهد صور الكلاب",
    commandCategory: "random-img",
    cooldowns: 0,
};

module.exports.run = async function({api, event, args, utils, Users, Threads}) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
	const res = await axios.get(`https://some-random-api.ml/animal/dog`);
	console.log(res.data);
	var data = res.data;
	let callback = function() {
            return api.sendMessage({
                body:`Dog Fact: ${data.fact}`,
                attachment: fs.createReadStream(__dirname + `/cache/image.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), event.messageID);
        };
		return request(encodeURI(data.image)).pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close", callback);
		} catch (err) {
        return console.log(`خطأ: ${err}`)
    }
}