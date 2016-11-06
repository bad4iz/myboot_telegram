/**
 * Created by bad4iz on 06.11.16.
 */
var TelegramBot = require('node-telegram-bot-api'),
    request = require('request'),
    Entities  = require('html-entities').XmlEntities,
    entities = new Entities(),
     token = '262716090:AAGN9kIGVfKExc42-LIKUBAKmhUjZHtwNvE';

var bot = new TelegramBot(token, {
    polling: true
});

// var cron = new Cron('* * * * * *', function(){
//     console.log('привет ');
// });
//
//     cron.start();

//
bot.on('message', function (msg) {
    var id = msg.from.id;
    if(msg.text == 'сколько стоит'){
        // bot.sendMessage(id, "какой именно кирпич вас интересует? вот <a href='http://vk-zavod.ru/price'>наш прайс лист</a>" );
        bot.sendMessage(id, '/photo' );
    }
    // bot.sendChatAction(chatId, msg.text);
    bot.sendMessage(id, msg.from.first_name + ' пишет что ' + msg.text);
    console.log(msg);
});
//
// bot.on('message', function (msg) {
// console.log(msg);
// });


bot.getMe().then(function (me) {
    console.log('Hi my name is %s!', me.username);
});

bot.onText(/\/photo/, function (msg) {
    var chatId = msg.chat.id;
    // From file
    var photo = 'a7782fbc59e7cc05a19aa3dcf6beca49.png';
    bot.sendPhoto(chatId, photo, {caption: "I'm a bot!"});
});


bot.onText(/помощь/, function (msg) {
    var chatId = msg.chat.id;
    // From file
    // bot.sendMessage(id, msg.from.first_name + 'мы тебе поможем');
    bot.sendMessage(chatId, '/photo показать фото' );
});


// Matches /audio
bot.onText(/\/audio/, function (msg) {
    var chatId = msg.chat.id;
    var url = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg';
    // From HTTP request!
    var audio = request(url);
    // console.log(audio);
    bot.sendAudio(chatId, audio)
        .then(function (resp) {
            // Forward the msg
            var messageId = resp.message_id;
            bot.forwardMessage(chatId, chatId, messageId);
        });
});

// Matches /love
bot.onText(/\/love/, function (msg) {
    var chatId = msg.chat.id;
    var opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [
                ['Yes, you are the bot of my life ❤'],
                ['No, sorry there is another one...']]
        })
    };
    bot.sendMessage(chatId, 'Do you love me?', opts);
});
// Matches /анекдот
bot.onText(/\/юмор/, function (msg) {
    var chatId = msg.chat.id;
    url = 'http://www.umori.li/api/random?num=10';

    request(url, function (error, response, body) {
        var data = JSON.parse(body);
        // var opts = {
        //     reply_to_message_id: msg.message_id,
        //     reply_markup: JSON.stringify(body)
        // };
        // bot.sendMessage(chatId, 'Do you love me?', opts);

        bot.sendMessage(chatId, data[5].elementPureHtml, HTML);
        console.log(data);
        console.log('dddddddddddddddddddddddddddddddddddd');


    })
});

bot.onText(/\/echo (.+)/, function (msg, match) {
    var chatId = msg.chat.id;
    var resp = match[1];
    bot.sendMessage(chatId, resp);
});