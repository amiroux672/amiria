module.exports.config = {
  name: "تعزيز_صورة",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "Abdulla Rahaman",
  description: "( 𝙀𝙣𝙝𝙖𝙣𝙘𝙚 𝙄𝙢𝙖𝙜𝙚𝙨 )",
  commandCategory: "enhance",
  usages: "( تعزيز الصور)",
  cooldowns: 3
};

let eta = 3;

module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule["axios"];
  let send = msg => api.sendMessage(msg, event.threadID, event.messageID);

  if (event.type != "message_reply") return send("الرجاء الرد على الصورة!");

  send(`معالجة ترقية دقة الصورة لـ${event.messageReply.attachments.length} الصورة (الصور) (${event.messageReply.attachments.length * eta}s)`);

  let stream = [];
  let exec_time = 0;

  for (let i of event.messageReply.attachments) {
    try {
      let res = await axios.get(encodeURI(`https://nams.live/upscale.png?{"image":"${i.url}","model":"4x-UltraSharp"}`), {
        responseType: "stream"
      });

      exec_time += +res.headers.exec_time;
      eta = res.headers.exec_time / 1000 << 0;
      res.data.path = "tmp.png";
      stream.push(res.data);
    } catch (e) {}
  }

  send({
    body: `نجاح(${exec_time / 1000 << 0}s)`,
    attachment: stream
  });
};
        