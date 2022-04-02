const TelegramBot = require("node-telegram-bot-api");

const token = "5162314638:AAFrt6eYZ1rJxtmyfHzTj9q7_h1-H6ES5Ys"; // User Verification BOT

const bot = new TelegramBot(token, { polling: true });

process.env.PORT 

const Tesseract =  require('tesseract.js');

API_URL = `https://api.telegram.org/file/bot${token}/`



String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var time    = hours+':'+minutes+':'+seconds;
  return time;
}




bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  console.log(msg);

  console.log(process.env.PORT);

  bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
  });


  if (msg.text === "/id") {
    const obj = {
      reply_to_message_id: msg.message_id,
      protect_content:true
    };


    bot.sendMessage(chatId, msg.from.id, obj);
  } else if (msg.text === "/chatid") {
    const obj = {
      reply_to_message_id: msg.message_id,
      protect_content:true
    };


    bot.sendMessage(chatId, chatId, obj);
  } else if(msg.text==='/uptime'){

    const obj = {
      reply_to_message_id: msg.message_id,
      protect_content:true
    };

    var time = process.uptime();
    var uptime = (time + "").toHHMMSS();
    console.log(uptime);

    bot.sendMessage(chatId,uptime, obj);


  } else if (msg.forward_from) {
    const obj = {
      reply_to_message_id: msg.message_id,
      protect_content:true
    };

    console.log("Enters Here ");

    const res = `@${msg.forward_from.username}  ${msg.forward_from.id}`;

    bot.sendMessage(chatId, res, obj);
  }
   else if (msg.forward_sender_name) {
    const obj = {
      reply_to_message_id: msg.message_id,
      protect_content:true
    };

    console.log("enters here");
    // console.log(msg.forward_sender_name != NULL);

    const res = ` @${msg.forward_sender_name} user restricted to sharing their ID `;

    bot.sendMessage(chatId, res, obj);
  }
  
  else {
    bot.sendMessage(chatId, "Received your message");
  }

  console.log(msg.photo[0].file_id);

  bot.getFileLink(msg.photo[2].file_id).then((image_url)=>{


    Tesseract.recognize(
      image_url,
      'eng',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log(text);

      let res = text.split(" ")

      bot.sendMessage(chatId,res[1])
    })

    
  })

});






