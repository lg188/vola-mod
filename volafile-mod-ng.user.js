// ==UserScript== 
// @name Volafile Mod_ng
// @namespace org.lg188.volafile_mod_ng
// @description Volafile moderation tools
// @verion 0.1.1
// @grant none
// @author lg188
// @license GPLv2
// ==/UserScript== 

// @require https://cdn.rawgit.com/dmauro/Keypress/master/keypress.js
// NodeList.prototype.filter = Array.prototype.filter;
// document.querySelectorAll("td > a").filter(function(item){ return /\/r\/.*/.test(item.href); }); 

try{
	"use strict"; //jshint ignore:line
	var vola_mod_ng = {} ;
	function s_Load(){ vola_mod_ng = JSON.parse(localStorage.vola_mod_ng);}  //jshint ignore:line
	function s_Save(){ localStorage.vola_mod_ng = JSON.stringify(vola_mod_ng);} //jshint ignore:line

	if( typeof localStorage.vola_mod_ng === 'undefined' ){
		console.debug("no config found, creating new ");
		vola_mod_ng.config = { interval : 60 * 1000 , debug : false };
		s_Save();
	}
	s_Load();


	function doRoom(){ //jshint ignore:line
		s_Load();
		if(typeof vola_mod_ng.data === 'undefined'){ vola_mod_ng.data = {} ;}
		if(typeof vola_mod_ng.data[id] === 'undefined'){ vola_mod_ng.data[id] = {};}
		vola_mod_ng.data[id].open = true;
		vola_mod_ng.data[id].id = id;
		vola_mod_ng.data[id].time = new Date().getTime();
		if(typeof this.config.disabled !== 'undefined') {vola_mod_ng.data[id].disabled = this.config.disabled;}
		s_Save();
	}


	if(this.config){
		var id = this.config.room_id;
		// TODO: set key listener 
		doRoom(id);
		window.setInterval(doRoom() , 10000);
	}else{
		//window.setInterval(() => location.reload(true)	, vola_mod_ng.config.interval);
		s_Load();
		var links = document.getElementsByTagName('a'); // TODO: reduce to actual room lists  TODO: remove from list once it has been edited
		
		for (var room in vola_mod_ng.data ){
		       for(var link in links){
			       
				if(links[link].pathname == "/r/" + room){
					if(vola_mod_ng.data[room].disabled){
						links[link].style.color = 'rgb(50, 50, 50)';

					}else if(vola_mod_ng.data[room].open){
						links[link].style.color = 'rgb(216, 128, 252)';
						
					} // TODO: else colour with treshold
				}
		       }
		}

	}
	console.debug("EOF");
}catch(e){
	console.debug(e);
}
