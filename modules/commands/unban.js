
module.exports.config = {
  name: "فك_الحظر",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ManhG",//Mod by H.Thanh
  description: "Remove groups and users in 1 note",
  commandCategory: "Admin",
  usages: "unban",
  cooldowns: 2,
  denpendencies: {}
};

module.exports.run = async ({ event, api, Users, Threads, args }) => {
  var { threadID, messageID, senderID } = event;
  
  const { commands } = global.client;
  const command = commands.get(("فك").toLowerCase());
  const credit = command.config.credits;
  var mangG = "ManhG";
  if(credit != mangG) return api.sendMessage(`ساي الائتمان!!`, event.threadID, event.messageID);
  
  const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  switch (args[0]) {
    case 'admin':
    case 'ad':
      {
        const listAdmin = global.config.ADMINBOT;
        for (var idad of listAdmin) {
          const data = (await Users.getData(idad)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(idad, { data });
          global.data.userBanned.delete(idad, 1);
        }
        api.sendMessage("𝗠𝗢𝗗𝗘 - محظور لجميع برامج الروبوت الإدارية"، threadID, messageID)
        break;
      }

    case 'ndh':
      {
        const listNDH = global.config.NDH;
        for (var idNDH of listNDH) {
          const data = (await Users.getData(idNDH)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(idNDH, { data });
          global.data.userBanned.delete(idNDH, 1);
        }
        api.sendMessage("𝗠𝗢𝗗𝗘 - محظور على جميع المؤيدين", threadID, messageID)
        break;
      }


    case 'allbox':
    case 'allthread':
      {
        const threadBanned = global.data.threadBanned.keys();
        for (const singleThread of threadBanned) {
          const data = (await Threads.getData(singleThread)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Threads.setData(singleThread, { data });
          global.data.userBanned.delete(singleThread, 1);
        }
        api.sendMessage("𝗠𝗢𝗗𝗘 - محظور للمجموعة بأكملها على الخادم", threadID, messageID)
        break;
      }

    case 'box':
    case 'thread':
      {
        var idbox = event.threadID;
        var data = (await Threads.getData(idbox)).data || {};
        data.banned = 0;
        data.reason = null;
        data.dateAdded = null;
        await Threads.setData(idbox, { data });
        global.data.userBanned.delete(idbox, 1);
        api.sendMessage("𝗠𝗢𝗗𝗘 - تمت إزالة الحظر لهذه المجموعة", threadID, messageID)
        break;
      }

    case 'allmember':
    case 'alluser':
      {
        const userBanned = global.data.userBanned.keys();
        for (const singleUser of userBanned) {
          const data = (await Users.getData(singleUser)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(singleUser, { data });
          global.data.userBanned.delete(singleUser, 1);
        }
        api.sendMessage("𝗠𝗢𝗗𝗘 - محظور لجميع المستخدمين على الخادم", threadID, messageID)
        break;
      }

    case 'qtvall':
    case 'Qtvall':
    case 'allqtv':
      {
        var data = [];
        data = await Threads.getAll();

        for (let i = 0; i < data.length; i++) {
          const idAdmins = (data[i].threadInfo).adminIDs;
          for (let i = 0; i < idAdmins.length; i++) {
            const idad = idAdmins[i].id;

            const data = (await Users.getData(idad)).data || {};
            data.banned = 0;
            data.reason = null;
            data.dateAdded = null;
            await Users.setData(idad, { data });
            global.data.userBanned.delete(idad, 1);
          }
        }
        api.sendMessage('𝗠𝗢𝗗𝗘- محظور على كافة المسؤولين على الخادم', threadID, messageID);
        break;
      }

    case 'qtv':
    case 'Qtv':
      {
        //var threadInfo = await api.getThreadInfo(event.threadID);
        var threadInfo = (await Threads.getData(event.threadID)).threadInfo;
        var listQTV = threadInfo.adminIDs;
        for (let i = 0; i < listQTV.length; i++) {
          const idQtv = listQTV[i].id;
          const data = (await Users.getData(idQtv)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(idQtv, { data });
          global.data.userBanned.delete(idQtv, 1);
        }
        api.sendMessage("𝗠𝗢𝗗𝗘 - محظور على جميع مسؤولي هذه المجموعة", threadID, messageID)
        break;
      }

    case 'member':
    case 'mb':
    case 'user':
      {
        if (!args[1]) {
         // var threadInfo = await api.getThreadInfo(event.threadID);
          //var threadInfo = (await Threads.getData(event.threadID)).threadInfo;
          var listMember = event.participantIDs;
          for (let i = 0; i < listMember.length; i++) {
            const idMember = listMember[i];
            const data = (await Users.getData(idMember)).data || {};
            data.banned = 0;
            data.reason = null;
            data.dateAdded = null;
            await Users.setData(idMember, { data });
            global.data.userBanned.delete(idMember, 1);
          }
          return api.sendMessage("𝗠𝗢𝗗𝗘 - محظور لجميع أعضاء هذه المجموعة", threadID, messageID);
        }
        if (args.join().indexOf('@') !== -1) {
          var mentions = Object.keys(event.mentions)
          var userID = (await Users.getData(mentions)).userID;
          var nameUser = (await Users.getData(mentions)).name;
          const data = (await Users.getData(userID)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(userID, { data });
          global.data.userBanned.delete(userID, 1);
          return api.sendMessage(`𝗠𝗢𝗗𝗘 - User ${nameUser} ban has been removed`, threadID, messageID)
        }
        break;
      }

    default:
      api.sendMessage(`「 ؟؟؟؟؟؟ 」\n◆━━━━━━━━━━━◆\n\n؟؟ - رفع الحظر عن المشرف => إزالة الحظر عن كل الروبوتات الإدارية\n؟؟ - إلغاء الحظر ndh => إلغاء حظر جميع الداعمين\n؟؟ - إلغاء حظر allbox => إلغاء حظر المجموعة بأكملها على الخادم\n؟؟ - unban box => إلغاء حظر المجموعة الحالية ( مجموعة واحدة \n؟؟ - إلغاء حظر alluser => إلغاء حظر كافة المستخدمين على الخادم\n؟؟ - إلغاء حظر allqtv => إزالة الحظر عن كافة اللوحات عبر مسؤول خادم الخادم\n؟؟ - unban qtv => إزالة الحظر لجميع المسؤولين (مجموعة واحدة)\n؟؟ - إلغاء الحظر عن العضو > اكتب الحظر لجميع أعضاء الفريق (مجموعة واحدة)\n؟؟ - إلغاء الحظر عن علامة العضو => إزالة الحظر عن الشخص صاحب العلامة `, threadID, messageID);
      break;
  }
}
