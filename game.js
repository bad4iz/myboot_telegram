var TelegramBot = require('node-telegram-bot-api'),
    dbConfig = 'mongodb://bot_vk_zavod:XYNjR3Be@ds151917.mlab.com:51917/telegram_bot',
    token = '262716090:AAGN9kIGVfKExc42-LIKUBAKmhUjZHtwNvE';
    var bot = new TelegramBot(token, {    polling: true});
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var    _login = null;
var    _password = null;
var    field = null;


bot.on('message', function (msg) {
   var chatId = msg.from.id;

    if (msg.text == '/sss' ){
        field = 'login';
        login(chatId);
    }
    else if (login != null){
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
    MongoClient.connect(dbConfig, function (err, db) {
        console.log("соеденение к базе данных установленно");
        var collection = db.collection('user');

        collection.find({
            login: _login
        }).toArray(function(err, docs) {
           var user = docs[0];

            if(user){
                console.log('нет документа');
            }

            if (user && user.password == _password){
                bot.sendMessage(chatId, 'вы вошли');
            } else {
                bot.sendMessage(chatId, 'неверное имя или пароль');

            }
            _login = null;
            _password = null;
            field = null;
        });


        db.close();
    });
}

function defaultCommand(chatId) {
    bot.sendMessage(chatId, 'добрый день ');
}

