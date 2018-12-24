'use strict';

(function () {
	var DEBOUNCE_INTERVAL = 500;

	var lastTimeout;

	var debounce = function (callback) {
		if (lastTimeout) {
			window.clearTimeout(lastTimeout);
		}

		lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
	};

	window.debounce = debounce;
})();
