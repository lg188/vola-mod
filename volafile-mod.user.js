// ==UserScript==
// @name        volafile-mod
// @namespace   org.lg188.volafile-mod
// @description Aids the current volafile moderators
// @include     https://volafile.io/*
// @version     0.1.0
// @grant       none
// @require     https://code.jquery.com/jquery-2.1.3.js
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
			roomID = path.match(/^\/r\/(.{1,})/)[1];
		}

}

setInterval(tick, 1000);

function saveData(state){
	//collect data;
	var data = {"state" : state};

	var strgID = "meta:" + roomID;
	data.date = Date.now();
	data.private =  window.config.private;
	data.disabled =  window.config.private;
	data.risk = 1;
	save(strgID, data);
}

function tick(){
	$("a").each(colourLinks);
	if(loc == "room"){
		saveData("open");
		//window.unload(saveData("close"));
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
				if(roomData.date !== null){
					var now = Math.floor(Date.now() / 1000);
					var diff = now - roomData.date;
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
		}

	}
}
