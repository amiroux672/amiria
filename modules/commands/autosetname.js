module.exports.config = {
    name: "كنية",
    version: "1.0.1",
    hasPermssion: 1,
    credits: "",
    description: "تعيين أسماء الأعضاء الجدد تلقائيًا",
    commandCategory: "",
    usages: "[add <name> /remove] ",
    cooldowns: 0
}

module.exports.onLoad = () => {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const pathData = join(__dirname, "cache", "autosetname.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = async function  ({ event, api, args, permssionm, Users })  {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const pathData = join(__dirname, "cache", "autosetname.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: [] };
    switch (args[0]) {
        case "add": {
            if (content.length == 0) return api.sendMessage("[⚜️]→ لا يمكن ترك قسم تكوين اسم العضو الجديد فارغًا!", threadID, messageID);
            if (thisThread.nameUser.length > 0) return api.sendMessage("[⚜️]→ يرجى حذف تكوين الاسم القديم قبل تعيين اسم جديد!!!", threadID, messageID); 
            thisThread.nameUser.push(content);
            const name = (await Users.getData(event.senderID)).name
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage(`[⚜️]→ تكوين اسم العضو الجديد بنجاح\n[⚜️]→ معاينة: ${content}`, threadID, messageID);
            break;
        }
        case "اضف":
        case "ازل":
        case "حذف": {
                if (thisThread.nameUser.length == 0) return api.sendMessage("[⚜️]→ لم تقم مجموعتك بتكوين اسم عضو جديد بعد!!", threadID, messageID);
                thisThread.nameUser = [];
                api.sendMessage(`[⚜️]→ تم حذف قسم تكوين اسم العضو الجديد بنجاح`, threadID, messageID);
                break;
        }
        default: {
                api.sendMessage(`[⚜️]→ استخدم: autosetname أضف <name> لتكوين لقب للأعضاء الجدد\n[]→ استخدم: إزالة autosetname لحذف تكوين اللقب للأعضاء الجدد`, threadID, messageID);
        }
    }
    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
}