'use strict';

(function () {
	var ESC_KEYCODE = 27;
	// var ENTER_KEYCODE = 13;

	window.util = {
		getRandomNumber: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},

		isEscEvent: function (evt, action) {
			if (evt.keycode === ESC_KEYCODE) {
				action();
			}
		},

		// isEnterEvent: function (evt, action) {
		// 	if (evt.keycode === ENTER_KEYCODE) {
		// 		action();
		// 	}
		// }
	};
})();
