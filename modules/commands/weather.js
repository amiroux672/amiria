module.exports.config = {
	name: "طقس",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "See weather information in the area",
	commandCategory: "other",
	usages: "[Location]",
	cooldowns: 5,
	dependencies: {
		"moment-timezone": "",
		"request": ""
	},
	envConfig: {
		"OPEN_WEATHER": "b7f1db5959a1f5b2a079912b03f0cd96"
	}
};

module.exports.languages = {

	"en": {
		"locationNotExist": "Can't find %1.",
		"returnResult": "🌡 درجة حرارة: %1℃\n🌡 أحس كأنني: %2℃\n☁️ سماء: %3\n💦 رطوبة: %4%\n💨 سرعة الرياح: %5km/h\n🌅 شروق الشمس: %6\n🌄 غروب الشمس: %7"
	}
}

module.exports.run = async ({ api, event, args, getText }) => {
	const request = global.nodemodule["request"];
	const moment = global.nodemodule["moment-timezone"];
	const { throwError } = global.utils;
	const { threadID, messageID } = event;
	
	var city = args.join(" ");
	if (city.length == 0) return throwError(this.config.name, threadID, messageID);
	return request(encodeURI("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + global.configModule[this.config.name].OPEN_WEATHER + "&units=metric&lang=" + global.config.language), (err, response, body) => {
		if (err) throw err;
		var weatherData = JSON.parse(body);
		if (weatherData.cod !== 200) return api.sendMessage(getText("locationNotExist", city), threadID, messageID);
		var sunrise_date = moment.unix(weatherData.sys.sunrise).tz("Asia/Kolkata");
		var sunset_date = moment.unix(weatherData.sys.sunset).tz("Asia/Kolkata");
		api.sendMessage({
			body: getText("returnResult", weatherData.main.temp, weatherData.main.feels_like, weatherData.weather[0].description, weatherData.main.humidity, weatherData.wind.speed, sunrise_date.format('HH:mm:ss'), sunset_date.format('HH:mm:ss')),
			location: {
				latitude: weatherData.coord.lat,
				longitude: weatherData.coord.lon,
				current: true
			},
		}, threadID, messageID);
	});
}