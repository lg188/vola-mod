// ==UserScript==
// @name        volafile-mod
// @namespace   org.lg188.volafile-mod
// @description Aids the current volafile moderators
// @include     https://volafile.io/*
// @version     0.3.0
// @grant       none
// ==/UserScript==

// Default Configuration
var vm_dcfg = {};

vm_dcfg.interval = 60;
vm_dcfg.boundary = 72;
vm_dcfg.debug = false;
vm_dcfg.rate = 1;

if(localStorage.vm_cfg === null){ localStorage.vm_cfg = {}; console.log("fixed empty config");}

// Configuration
function cfgClear(key){localStorage.vm_cfg[key] = null;}
function cfgExists(key){
	if(typeof localStorage.vm_cfg !== "undefined" && typeof localStorage.vm_cfg[key] !== "undefined"){ 
		return true;
	} else {
		return false;
	}
}
function cfgSave(key,value){
	if(value === vm_dcfg[key]){
		cfgClear(key);
	}else{
		localStorage.vm_cfg[key] = value;
	}
}

function cfgLoad(key){
	if( cfgExists(key)){
		if(localStorage.vm_cfg[key] == vm_dcfg[key]){ cfgClear(key);}
		return localStorage.vm_cfg[key];
	}else if( vm_dcfg[key] !== null){
		return vm_dcfg[key];
	}else{
		return null;
	}
}


// Runtime information
var path = window.location.pathname;
var reload = false;
var timer = 0;

// Determine the environment based on location
switch(path){
	case "/adiscover":
	case "/reports":
		reload = true;
		break;
	default:
		console.log("default page");
}

// Define the tick
function tick(){
	if(timer >= cfgLoad("interval")){
		timer = 0;
		console.log("reload page");
	}else{
		timer++;
	}
	colourLinks();
	//console.log("tick " + timer);
}



function colourLinks(){
	var elements = getElements("a");
	for( var element in elements){
	}
}

// Execute tick once per second

setInterval( tick, cfgLoad("rate") * 1000);

// Utility functions;
function getElements(T){
	return document.getElementsByTagName(T);
}

console.log("End of File");

