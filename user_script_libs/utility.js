/*******************************************************************
 * (c) Arphen Lin, arphenlin@gmail.com
 ********************************************************************/
/*******************************************************************
 * String extension
 *******************************************************************/
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, '');
};

String.prototype.triml = function(){
	return this.replace(/(^\s*)/g, '');
};

String.prototype.trimr = function(){
	return this.replace(/(\s*$)/g, "");
};

// format string:
// (Ex) 'Hello {0}!'.format('World');  --> return 'Hello World!'
String.prototype.format = function(args){
	var msg = this;
	for(var i=0; i<arguments.length; i++){
		var rx = new RegExp('\\{'+i+'\\}', 'g');
		msg = msg.replace(rx, arguments[i]);
	}
	return msg;
};

// append to url [?|&]hash=xxx
// (Ex) "http://foo.bar/".hashUrl()  --> "http://foo.bar/?hash=asdfasdfasfsaf"
String.prototype.hashUrl = function(hashLen){
	var url = this;
	if(hashLen===undefined){ hashLen=20; }
	return url + (url.indexOf('?')>0? '&': '?') + 'hash=' + Math.random().toString().substr(2, hashLen);
};

// append params to url
// param = {key1: value1, key2: value2, ...}
// (Ex) "http://foo.bar/".addUrlParam({debug_mode: 1})  --> "http://foo.bar/?debug_mode=1"
String.prototype.addUrlParam = function(params){
	var url = this;
	for(var key in params){
		if(key){
			var param = key + '=' + params[key];
			if(url.indexOf(param)<0){
				url += (url.indexOf('?')>0? '&': '?') + param;
			}
		}
	}
	return url;
};

/*******************************************************************
 * Object
 *******************************************************************/

/*******************************************************************
 * Array extension
 * http://4umi.com/web/javascript/array.htm
 *******************************************************************/

// boolean = Array.once() - try until the callback function return true, or to the end of array
// callback: f(v, i, a){ return (true|false); }
Array.prototype.once = function( f ) {
	for(var i=0; i<this.length; i++){
		if( f(this[i], i, this) ) {return true;} // done once
	}
	return false; // never done
};

// void Array.each(f) - invoke the callback function with each array elements
// callback: f(v, i, a){ return (true|false); }
Array.prototype.each = function( f ) {
	for(var i=0; i<this.length; i++){
		f(this[i], i, this);
	}
};

// Array.insert( index, value ) - Insert value at index of this array
Array.prototype.insert = function( i, v ) {
	if( i>=0 ) {
		// eg. this = [0,1,2,3]
		var a = this.splice(i);	// eg. i=2, this = [0,1], a = [2,3]
		this[i++] = v;					// this = [0,1,v]
		for(var j=0; j<a.length; j++){
			this[i++] = a[j];
		}
	}
};

// i = Array.indexOf( value, begin, strict ) - Return index of the first element that matches value
Array.prototype.indexOf = function( v, b, s ) {
	b = +b || 0;
	for(var i=b; i<this.length; i++){
		if( this[i]===v || s && this[i]==v ) { return i; }
	}
	return -1;
};

// i = Array.lastIndexOf( value, begin, strict ) - Return index of the last element that matches value
Array.prototype.lastIndexOf = function( v, b, s ) {
	b = +b || 0;
	var i = this.length;
	while(i-->b) {
		if( this[i]===v || s && this[i]==v ) { return i; }
	}
	return -1;
};

// [i] = Array.random( range ) - Return a random element, optionally up to or from range
Array.prototype.random = function( r ) {
	var i = 0, l = this.length;
	if( !r ) { r = this.length; }
	else if( r > 0 ) { r = r % l; }
	else { i = r; r = l + r % l; }
	return this[ Math.floor( r * Math.random() - i ) ];
};

// Array.shuffle( deep ) - Randomly interchange elements of this array
Array.prototype.shuffle = function( b ) {
	var i = this.length, j, t;
	while( i ) {
		j = Math.floor( ( i-- ) * Math.random() );
		t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
		this[i] = this[j];
		this[j] = t;
	}
};

// new[] = Array.unique( strict ) - Remove duplicate values and return the new array
Array.prototype.unique = function( b ) {
	var a = [], i, l = this.length;
	for( i=0; i<l; i++ ) {
		if( a.indexOf( this[i], 0, b ) < 0 ) { a.push( this[i] ); }
	}
	return a;
};

// new[] = Array.walk() - Change each value according to a callback function, and return the new array
Array.prototype.walk = function( f ) {
	var a = [], i = this.length;
	while(i--) { a.push( f( this[i] ) ); }
	return a.reverse();
};


/*******************************************************************
 * Utility
 *******************************************************************/
var UTIL = {};

// return a hash string
UTIL.hash = function(len) {
	if(len===undefined){ len=20; }
	return Math.random().toString().substr(2, len);
};

// destroy dom element and clear allocated memory, Ex: destroyElement([tr, tr, ...])
UTIL.IEDestroyElements = function(elems) {
	var garbageBin = document.getElementById('IEMemoryLeakGarbageBin');
	if(!garbageBin) { 
		garbageBin = document.createElement('DIV'); 
		garbageBin.id = 'IEMemoryLeakGarbageBin'; 
		garbageBin.style.display = 'none'; 
		document.body.appendChild(garbageBin); 
	} 
	for(var i=0; i<elems.length; i++){
		if(elems[i]){
			garbageBin.appendChild(elems[i]);
		}
		//elems[i]=null;
	}
	garbageBin.innerHTML = ''; 
};

// Clone object: (note) don't use this function, IE will be error!
// What is the most efficent way to clone a JavaScript object? - Stack Overflow
// http://stackoverflow.com/questions/122102/what-is-the-most-efficent-way-to-clone-a-javascript-object


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


/* Note: 必須原始網站沒有限制CSP(Content Security Policy)才能允許引用其它domain之js
 * Usage:
 *  addScript('http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js');
 */
function addScript(url) {
	try{
		var scriptElement = document.createElement( "script" );
		scriptElement.type = "text/javascript";
		scriptElement.src = url;
		document.body.appendChild( scriptElement );
	}catch(err){ // unable to catch exception if blocked by CSP, but can see error in console
		alert('addScript failed: '+url + '\n' + err.message);
	}
}

/* Usage:
 *　if you have a function aFunction(a, b){ return true; }
 *  you can convert it to string and add to the page:
 *    var s = " " + aFunction; // convert to string
 *    addScriptCode(s);        // add to the page
 *
 *  you can also add a function variable
 *    addScriptCode(aFunction);
 */
function addScriptCode(code) {
	// inject my code in page
	var str = '';
	if(typeof code != 'string'){
		str = '' + code; // convert to string
	}else{
		str = code;
	}

	var script = document.createElement('script');
	script.appendChild(document.createTextNode(str));
	(document.body || document.head || document.documentElement).appendChild(script);
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
