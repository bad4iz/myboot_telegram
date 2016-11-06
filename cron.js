/**
 * Created by bad4iz on 06.11.16.
 */
var Cron = require('cron').CronJob;

while (true){

var cron = new Cron('* * * * * *', function(){
    console.log('привет ');
});
    cron.start();

}
