// ==UserScript== 
// @name Volafile Mod_ng
// @namespace org.lg188.volafile_mod_ng
// @description Volafile moderation tools
// @verion 0.1.0
// @grant none
// @author lg188
// @require https://cdn.rawgit.com/dmauro/Keypress/master/keypress.js
// @license GPLv2
// ==/UserScript== 

try{
	"use strict"; //jshint ignore:line
	var vola_mod_ng = {} ;
	function s_Load(){ vola_mod_ng = JSON.parse(localStorage.vola_mod_ng); if(vola_mod_ng.config.debug) { console.debug(vola_mod_ng);} } //jshint ignore:line
	function s_Save(){ localStorage.vola_mod_ng = JSON.stringify(vola_mod_ng); if(vola_mod_ng.config.debug){ console.debug(vola_mod_ng);} } //jshint ignore:line

	if( typeof localStorage.vola_mod_ng === 'undefined' ){
		console.debug("no config found, creating new ");
		vola_mod_ng.config = { interval : 60 * 1000 , debug : false };
		s_Save();
	}
	s_Load();



	if(this.config){
		var id = this.config.room_id;
		// TODO: set key listener 
		window.setInterval(() => {
			s_Load();
			if(typeof vola_mod_ng.data === 'undefined'){ vola_mod_ng.data = {};}
			if(typeof vola_mod_ng.data[id] === 'undefined'){ vola_mod_ng.data['' + id] = {};}
			vola_mod_ng.data['' + id].open = true;
			vola_mod_ng.data['' + id].id = id;
			vola_mod_ng.data['' + id].time = new Date().getTime();
			s_Save();
		}, 10000);
	}else{
		window.setInterval(() => location.reload(true)	, vola_mod_ng.config.interval);
		s_Load();


		for (var room in vola_mod_ng.data ){
			if(document.getElementById("#" + room)){
				console.log("recognised: " + room);
			}
		}

	}
	console.debug("EOF");

}catch(e){
	console.debug(e);
}



// NodeList.prototype.filter = Array.prototype.filter;
// document.querySelectorAll("td > a").filter(function(item){ return /\/r\/.*/.test(item.href); }); 
