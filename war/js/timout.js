$(document).ready(function(){

	var SOUND = true;
	var POPUP_CANCEL_TIMEOUT = 10000;

	var currentTaskTitle = 'n/a';
	var currentTaskDesc = 'n/a';
	var timerStart = null;
	var timerName = 'n/a';
	var finalTaskMillis = 0;

	var viewGroups = [
		"breakGroup", "inputGroup", "timeGroup"
	];

	var timers = [
//		{ name: "pomodoro", title: "Pomodoro", time: 1500 },
		{ name: "pomodoro", title: "Pomodoro", time: 5 },
		{ name: "long_break", title: "Long break", time: 600 },
		{ name: "short_break", title: "Short break", time: 300 }
	];

	function getTimer(name) {
		console.log("getTimer: " + name);
		var timer, _i, _len;
		for (_i = 0, _len = timers.length; _i < _len; _i++) {
			timer = timers[_i];
			if (timer.name == name) {
				console.log("=> getTimer: " + timer);
				return timer;
			}
		}
	};

	function initTimer(name) {
		console.log("initTimer: " + name);

		for (_i = 0, _len = timers.length; _i < _len; _i++) {
			timer = timers[_i];
			if (timer.name == name) {
				$('#currentTime').addClass(timer.name);
			} else {
				$('#currentTime').removeClass(timer.name);
			}
		}

		var timer = getTimer(name);
		timerStart = new Date();
		timerName = name;

		$('#currentTime').html(formatTimeSec(timer.time));
		$('#currentTitle').html(timer.title);
		$('#currentTaskStart').html(formatTimeDate(timerStart));

		finalTaskMillis = timerStart.getTime() + (timer.time * 1000)
		console.log("finalTaskMillis: " + finalTaskMillis + " => " + (new Date (finalTaskMillis)));

		return setTimeout("onTick()", 1000);
	};


	function formatTimeSec(secs) {
		var minutes, secs_remainder;
//		secs = millis / 1000;
		minutes = Math.round(secs / 60);
//		if (minutes < 10) minutes = "0" + minutes;
		secs_remainder = secs - (minutes * 60);
		if (secs_remainder < 10) secs_remainder = "0" + secs_remainder;
		return minutes + ":" + secs_remainder;
	};

	function formatTimeDate(date) {
		console.log("formatTimeDate: " + date);

		var h=date.getHours();
		var m=date.getMinutes();
		var s=date.getSeconds();
		// add a zero in front of numbers<10
		m=checkTime(m);
		s=checkTime(s);
		return h+":"+m+":"+s;
	};

	function checkTime(i) {
		if (i<10) {
			i="0" + i;
		}
		return i;
	}

	function initViewGroup(name) {
		for (_i = 0, _len = viewGroups.length; _i < _len; _i++) {
			viewGroup = viewGroups[_i];
			if (viewGroup == name) {
				$('#' + viewGroup).show("slow");
			} else {
				$('#' + viewGroup).hide("slow");
			}
		}
	}

	window.onTick = function() {
		var currentTime = new Date();
		var remTime = Math.round((finalTaskMillis - currentTime.getTime()) / 1000);
		if ( remTime < 0 ) {
			remTime = 0;
		}
		$('#currentTime').html(formatTimeSec(remTime));

		console.log("onTick: " + (new Date()) + " - remTime: " + remTime);

		if (remTime > 0) {
			return setTimeout("onTick()", 1000);
		} else {
			return setTimeout("onTimeout()", 0);
		}
	};

	window.onTimeout = function() {
		var permission;
		permission = window.webkitNotifications.checkPermission();
		console.log("Permission: " + permission);
		if (permission == 0) {
			displayNotification();
		} else {
		console.log("Průšvih - nemám permission!");
		}
		//    $('#btn-run').button('reset');
		return enable();
	};

	window.displayNotification = function() {
		var permission;
		permission = window.webkitNotifications.checkPermission();
		console.log("Permission: " + permission);
		window.popup = window.webkitNotifications.createHTMLNotification("popup.html");
		popup.show();
		return setTimeout("popup.cancel()", POPUP_CANCEL_TIMEOUT);
	};

	window.ding = function(mp3) {
		var snd;
		snd = new Audio(mp3);
		if (SOUND) return snd.play();
	};


	$('#taskStart').click(function(event){
		event.preventDefault();

		initViewGroup('timeGroup');
//		$('#inputGroup').hide("slow");
//		$('#timeGroup').show("slow");

//		$('#display').html('25:00');
//		$('#display').addClass('pomodoro');
//		$('#display').removeClass('short_break');
//		$('#display').removeClass('long_break');

		currentTaskDesc = $('#taskDescription').val();
		if ( currentTaskDesc == '' ) {
			currentTaskDesc = 'n/a';
		}
		$('#currentTaskDesc').html(currentTaskDesc);
//		$('#currentTitle').html('Running task');

		initTimer('pomodoro');

		// pridat task do seznamu pislednich/nejcastejsich
		// nastartovat casomiru

	});

	$('#taskStorno').click(function(event){
		event.preventDefault();
	});

	$('#breakShortStart').click(function(event){
		event.preventDefault();

		$('#inputGroup').hide("slow");
		$('#timeGroup').show("slow");

		$('#display').html('5:00');
		$('#display').removeClass('pomodoro');
		$('#display').addClass('short_break');
		$('#display').removeClass('long_break');
	});

	$('#breakLongStart').click(function(event){
		event.preventDefault();

		$('#inputGroup').hide("slow");
		$('#timeGroup').show("slow");

		$('#display').html('15:00');
		$('#display').removeClass('pomodoro');
		$('#display').removeClass('short_break');
		$('#display').addClass('long_break');
	});

	$('#breakStorno').click(function(event){
		event.preventDefault();
	});

});
