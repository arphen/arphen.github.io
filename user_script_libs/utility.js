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


/* Usage:
 *  addScript('http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js');  // 允許插入和原page不同domain的js
 */
function addScript(url) {
	var scriptElement = document.createElement( "script" );
	scriptElement.type = "text/javascript";
	scriptElement.src = url;
	document.body.appendChild( scriptElement );
}

/* Usage:
 *  var v = getUrlParam('p1'); // (Ex) http://foo.bar/somepage?p1=abc&p2=def..., the value of v will be "abc"
 */
function getUrlParam(param) {
	var result = "",
		tmp = [];
	var items = location.search.substr(1).split("&");
	for (var index = 0; index < items.length; index++) {
		tmp = items[index].split("=");
		if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
	}
	return result;
}
