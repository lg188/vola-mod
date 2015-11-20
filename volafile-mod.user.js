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

// Configuration
function cfgClear(key){localStorage.vm_cfg[key] = "";}
function cfgSave(key,value){
	if(value === vm_dcfg[key]){
		cfgClear(key);
	}else{
		localStorage.vm_cfg[key] = value;
	}
}

function cfgLoad(key){
	if( localStorage.vm_cfg[key] !== null ){
		if(localStorage.vm_cfg[key] == vm_dcfg[key]){ cfgClear(key);}
		return localStorage.vm_cfg[key];
	}else if( vm_dcfg[key] !== null){
		return vm_dcfg[key];
	}else{
		return null;
	}
}

console.log("Configuration loaded");

var path = window.location.pathname;

console.log("defining tick function");

function tick(){
	switch(path){
		case "/adiscover":
			console.log("derp page");
		break;
		default:
			console.log("default page");

	}
}

console.log("tick function defined");
var derp = cfgLoad("rate");
console.log(derp);
setInterval( tick, cfgLoad("rate") * 10000);

console.log("EOF");
