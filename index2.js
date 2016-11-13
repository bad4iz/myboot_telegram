/**
 * Created by bad4iz on 06.11.16.
 */
var TelegramBot = require('node-telegram-bot-api'),
    // открывает доступ к файловому хранилешю
    fs = require('fs'),
    request = require('request'),
    token = '262716090:AAGN9kIGVfKExc42-LIKUBAKmhUjZHtwNvE';

var bot = new TelegramBot(token, {
    polling: true
});

bot.onText(/музыка/, function (msg) {
    var id = msg.from.id,
        file = __dirname + '/music.mp3';

    bot.sendAudio(id, file);

});
bot.onText(/документ/, function (msg) {
    var chatId = msg.chat.id;
    file = __dirname + 'readme.html';
        bot.document(chatId, file);
});
