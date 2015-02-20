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
var config  { interval : 60, threshold : 72, debug : true};

/*
 * Save a value int the local storage
 */
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

/*
 * Load a value from the local storage
 */
function load(key) { return JSON.parse(localStorage.getItem(key));}

var path = window.location.pathname;

switch(path){
	case "/adiscover":
		console.log("adis found");
		break;
	case "reports":
		console.log("reports found");
		break;
	default:
		console.log("other page found");
}
