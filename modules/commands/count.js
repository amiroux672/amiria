module.exports.config = {
  name: "عدد",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "", 
  description: "count all", 
  commandCategory: "group", 
  usages: `Please enter some category\n\nHow to use?\n${global.config.PREFIX}count <category>\n\nCategory's available:\n\nmessage, admin, member, male, female, gei, allgroup, alluser, boxdata, boxleave\n`,
  cooldowns: 5,  
  envConfig: {
  }
};

module.exports.run = async function ({ api, Threads, Users, event, args, client, __GLOBAL }) {
  const { threadID, messageID, participantIDs } = event;
  var input = args.join();
  var nameMen = [];
  var gendernam = [];
  var gendernu = [];
  var nope = [];
  let threadInfo = await api.getThreadInfo(threadID);
  for (let z in threadInfo.userInfo) {
    var gioitinhone = threadInfo.userInfo[z].gender;
    if (gioitinhone == "MALE") {
      gendernam.push(gioitinhone)
    } else {
      if (gioitinhone == "FEMALE") {
        gendernu.push(gioitinhone)
      } else { nope.push(gioitinhone) }
    }
  }
  ///////////////////////
      var threadList = [];
      var inbox = await api.getThreadList(150, null, ['INBOX']);
      let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

      for (var groupInfo of list) {
          threadList.push({
              id: groupInfo
          });
      } 
  ///////////////////////

  ///////////////////////
      var listLeave = [];
      var inbox = await api.getThreadList(100, null, ['ARCHIVED']);

      for (var groupInfo of inbox) {
          listLeave.push({
              id: groupInfo
          });
      } 
  ///////////////////////

  var threadData = (await Threads.getData(threadID)).threadInfo;
  var out = (msg) => api.sendMessage(msg, threadID, messageID);
  var boxget = await Threads.getAll(['threadID']);
  var userget = await Users.getAll(['userID']);
  if (input == "") { out(`الرجاء إدخال بعض الفئات\n\nكيف تستعمل?\n${global.config.PREFIX}عدد <category>\n\nالفئة متاحة:\nالرسائل, ادمن, عضو, ذكر, انثى, ڨاي, جميع, جميع2, صندوق, صندوق2\n`) }
  if (input == "الرسائل") { out(`هذه المجموعة لديها ${threadInfo.messageCount} رسالة`) }
  if (input == "اكمن") { out(`المجموعة التي لديك ${threadData.adminIDs.length} ادمن`) }
  if (input == "عضو") { out(`المجموعة التي لديك ${participantIDs.length} عضو`) }
  if (input == "ذكر") { out(`المجموعة التي لديك ${gendernam.length} من ذكر`) }
  if (input == "انثى") { out(`المجموعة التي لديك ${gendernu.length} من انثى`) }
  if (input == "ڨاي") { out(`المجموعة التي لديك ${nope.length} من ڨاي ههه`) }
  if (input == "جميع") { out(`مجموع: ${threadList.length} الدردشة الجماعية باستخدام الروبوتات`) }
  if (input == "جميع2") { out(`مجموع: ${userget.length} المستخدمون الذين يستخدمون الروبوتات `) }
  if (input == "صندوق") { out(`محموع ${boxget.length} الدردشة الجماعية [البيانات] استخدم الروبوتات`) }
  if (input == "صندوق2") { out(`مجموع: ${listLeave.length} لقد غادر`) }
  }