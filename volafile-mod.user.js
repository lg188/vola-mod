// ==UserScript==
// @name        volafile-mod
// @namespace   org.lg188.volafile-mod
// @description Aids the current volafile moderators
// @include     https://volafile.io/*
// @version     0.1.1
// @grant       none
// @require     https://code.jquery.com/jquery-2.1.3.js
// @require	http://notifyjs.com/dist/notify-combined.js
// ==/UserScript==

// Default Settings
var config =  { interval : 60, threshold : 72, debug : true};

/*
 * Save a value int the local storage
 */
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

/*
 * Load a value from the local storage
 */
function load(key) { return JSON.parse(localStorage.getItem(key));}

var path = window.location.pathname;
var loc = "undetected";
var roomID = "";
var counter = 0;
var help = "n next room (preceded by history) \n N next room in new tab\n p go back into history\n r reload\n q quit \n F1 help";
switch(path){
	case "/adiscover":
		loc = "adiscover";
	break;
	case "reports":
		loc = "reports";
	break;
	default:
		if(path.match(/^\/r\/.{1,}/)){
			loc = "room";
			counter = -1;
			roomID = path.match(/^\/r\/(.{1,})/)[1];
			window.addEventListener('unload', saveData);
			window.addEventListener('keypress',keyHandler);
		}

}

setInterval(tick, 1000);

function saveData(e,state){
	if(typeof state === 'undefined'){
		state = "closed";
	}
	//collect data;
	var data = {"state" : state};

	var strgID = "meta:" + roomID;
	data.date = Date.now();
	data.private =  window.config.private;
	data.disabled =  window.config.disabled;
	data.risk = 1;
	save(strgID, data);
}

function tick(){
	$("a").each(colourLinks);
	if(loc == "room"){
		saveData(null, "open");
	}
	if(counter > -1){
		counter++;
		if(counter >= config.interval){
			window.location.reload(true);
		}
	}
}



function colourLinks(){
	var dest = $(this).context.pathname;
	if(dest.match(/^\/r\/.{1,}/)){
		var id = dest.match(/^\/r\/(.{1,})/)[1];
		var strgID = "meta:" + id;
		var roomData = load(strgID);
		if(roomData !== null){
			if(!roomData.disabled){
				$(this).css({color: "cyan"});
				if(roomData.state == "open"){
					$(this).css({color: "#D880FC"});
				}else if(roomData.date !== null && roomData.state == "closed"){
					var now = Math.floor(Date.now() / 1000);
					var diff = now - Math.floor(roomData.date/1000);
					var value = (diff / (config.threshold * 60 * 60 )) * 255;
					if(value > 255) {
						value = 255;
					} else {
						value = Math.ceil(value);
					}
					var r = value;
					var g = 255-value;
					var b = 50;
					var rgb = "rgb(" + r + "," + g + "," + b + ")";
					$(this).css({color:rgb});

				}
			}else{
				$(this).css({color: "grey"});
			}

		}else{
			if( !load(strgID) ){
				strgID = "config:next";
				save(strgID, id);
			}
		}

	}
}

function keyHandler(e){
	var key = e.key;
	var target = e.target.toString();
	var TextArea = target.search(/TextAreaElement/);
	var input =  target.search(/InputElement/);
	if(TextArea < 0 && input < 0 ){
		var next , nextURL;

		switch(key){
			case "n":
				next = load("config:next");
				if(window.history.next !== window.history.length){
					window.history.go(1);
				}else if(next){
					nextURL = "/r/" + next;
					save("config:next", null);
					window.location = nextURL;
				}else{
					$.notif("There are no rooms left! Good work!","warn");
				}
				break;
			case "N":
				next = load("config:next");
				if(next){
					nextURL = "/r/" + next;
					save("config:next", null);
					window.open(nextURL);

				}
				break;
			case "p":
				history.go(-1);
				break;
			case "F1":
				$.notify(help, "info");
				break;
			case "q":
				window.close();
				break;
			case "r":
				window.location.reload(true);
				break;
			default:
				$.notify(key + " is not bound", "info");
		}
	}
}
