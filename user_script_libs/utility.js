/* Usage: 
 *  myLog.init('TW116'); // before you use myLog, set the title of your script. 
 *  myLog.log('hello world!'); // print any message you want, then it will display in chrome console.
 */
var myLog = {
    title: 'YOUR_SCRIPT',
    init: function(title) {
        myLog.title = title;
    },
    log: function(text) {
        try {
            var d = new Date();
            var n = d.toLocaleString();
            console.log(n + ' [' + myLog.title + '] ' + text);
        } catch (err) {}
    }
};
