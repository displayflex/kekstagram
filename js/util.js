'use strict';

(function () {
	var ESC_KEYCODE = 27;
	// var ENTER_KEYCODE = 13;

	var getRandomNumber = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	var isEscEvent = function (evt, action) {
		if (evt.keycode === ESC_KEYCODE) {
			action();
		}
	};

	// var isEnterEvent = function (evt, action) {
	// 	if (evt.keycode === ENTER_KEYCODE) {
	// 		action();
	// 	}
	// };

	window.util = {
		getRandomNumber: getRandomNumber,
		isEscEvent: isEscEvent
	};
})();
