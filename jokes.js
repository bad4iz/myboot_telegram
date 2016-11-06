/**
 * Created by bad4iz on 06.11.16.
 */
/**
 * Created by bad4iz on 06.11.16.
 */
var TelegramBot = require('node-telegram-bot-api'),
    Cron = require('cron').CronJob,
    request = require('request'),
    token = '262716090:AAGN9kIGVfKExc42-LIKUBAKmhUjZHtwNvE';

var bot = new TelegramBot(token, {
    polling: true
});

var id;

bot.on('message', function (msg) {
    id = msg.from.id;
    if(msg.text == 'сколько стоит'){
        bot.sendMessage(id, "какой именно кирпич вас интересует? вот <a href='http://vk-zavod.ru/price'>наш прайс лист</a>" );
    }

     bot.sendMessage(id, msg.from.first_name + ' пишет что ' + msg.text);
    bot..sendChatAction(chatId, 'action');
    console.log(msg);
})


var cron = new Cron('0,30 * * * * *', function(){

    var chatId =  id,
        url = 'http://www.umori.li/api/random?num=1';

    request(url, function (error, response, body) {
        var data = JSON.parse(body)
        console.log(data[0].body);
        console.log('****************');
        console.log(data[0].elementPureHtml);
    })
});

cron.start();
