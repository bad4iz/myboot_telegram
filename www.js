var TelegramBot = require('node-telegram-bot-api'),
    // открывает доступ к файловому хранилешю
    fs = require('fs'),

    dbConfig = 'mongodb://bot_vk_zavod:XYNjR3Be@ds151917.mlab.com:51917/telegram_bot',
    request = require('request'),
    token = '262716090:AAGN9kIGVfKExc42-LIKUBAKmhUjZHtwNvE';


var bot = new TelegramBot(token, {
    polling: true
});

bot.onText(/\/start/, function (msg) {
    var id = msg.from.id;

    start(id);

});



var _login = null,
    _password = null,
    field = null;

bot.on('message', function (msg) {
    var chatId = msg.from.id;

    if (msg.text == '/войти' ){
        field = 'login';
        login(chatId);
    }
    else if (_login != null){
        login(chatId,  msg.text)
    }
    else {
        defaultCommand(chatId);
    }
});

function  login(chatId, text){
    if(field == 'login'){
        if(text){
            _login = text;
            field = 'password';
            text = null;
        }else {
            bot.sendMessage(chatId, 'введите ваш логин');
        }
    }
    if (field == 'password'){
        if (text){
            _password = text;
            checkAccess(chatId);
        } else {
            bot.sendMessage(chatId, 'введите ваш пароль');

        }
    }
}

function  checkAccess(chatId) {
    bot.sendMessage(chatId, 'заглушка');
}

function defaultCommand(chatId) {
    bot.sendMessage(chatId, 'добрый день ');
}


function start(id) {
    bot.sendMessage(id, 'ваш герой \n оказался вокруг замка', {
        reply_markup: JSON.stringify({
            keyboard:[
                [{
                    text: 'Иследовать',
                    callback_data: '147'
                }],
                ['направо']
            ]
        })
    });

}