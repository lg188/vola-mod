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
vm_dcfg.bondary = 72;
vm_dcfg.debug = false;
vm_dcfg.rate = 1;

// Configuration
function cfgSave(key,value){ localStorage.vm_cfg[key] = value;}
function cfgLoad(key){ return localStorage.vm_cfg[key];}
function cfgClear(key){localStorage.vm_cfg[key] = "";}

vm_dcfg.map(function(key){
	console.log(key);
});
