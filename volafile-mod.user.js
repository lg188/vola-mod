
// ==UserScript==
// @name        volafile-mod
// @namespace   org.lg188.volafile-mod
// @description Aids the current volafile moderators
// @include     https://volafile.io/*
// @version     0.3.0
// @grant       none
// @require     https://code.jquery.com/jquery-2.1.3.js
// @require	http://notifyjs.com/dist/notify-combined.js
// ==/UserScript==

// Default Configuration
var vm_dcfg = {};

vm_dcfg.interval = 60;
vm_dcfg.bondary = 72;
vm_dcfg.debug = false;
vm_dcfg.rate = 1;

// Configuration
function cfgSave(key,value){ localstorage['vm_cfg'][key] = value;}
function cfgLoad(key){ return localstorage['vm_cfg'][key];}
function cfgClear(key){localstorage['vm_cfg'][key] = "";}

vm_dcfg.forEach( (function(){
	consloe.log(this);
})
