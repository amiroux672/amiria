module.exports.config = {
	name: "ip",	
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "",
	description: "View your ip information or other ip", 
	commandCategory: "other",
	usages: "",
	cooldowns: 5, 
	dependencies: "",
};

module.exports.run = async function({ api, args, event, __GLOBAL }) {
  const timeStart = Date.now();
  
    const axios = require("axios");
  if (!args[0]) {api.sendMessage("الرجاء إدخال عنوان IP الذي تريد التحقق منه",event.threadID, event.messageID);}
  else {
var infoip = (await axios.get(`http://ip-api.com/json/${args.join(' ')}?fields=66846719`)).data;
       if (infoip.status == 'fail')
         {api.sendMessage(`خطأ! حدث خطأ. الرجاء معاودة المحاولة في وقت لاحق: ${infoip.message}`, event.threadID, event.messageID)}
          else {
            /////////////////
          //////////////////
 api.sendMessage({body:`======${(Date.now()) - timeStart}ms=====
 🗺️Continent: ${infoip.continent}
🏳️Nation: ${infoip.country}
🎊Country Code: ${infoip.countryCode}
🕋Area: ${infoip.region}
⛱️Region/State: ${infoip.regionName}
🏙️City: ${infoip.city}
🛣️District: ${infoip.district}
📮ZIP code: ${infoip.zip}
🧭Latitude: ${infoip.lat}
🧭Longitude: ${infoip.lon}
⏱️Timezone: ${infoip.timezone}
👨‍✈️Organization Name: ${infoip.org}
💵Currency unit: ${infoip.currency}
`,location: {
				latitude: infoip.lat,
				longitude: infoip.lon,
				current: true
			}}
,event.threadID, event.messageID);}
        }
    
                  }

  
  
  
  
  
  
  