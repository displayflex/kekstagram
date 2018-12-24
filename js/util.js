'use strict';

(function () {
	var ESC_KEYCODE = 27;
	// var ENTER_KEYCODE = 13;

	var getRandomNumber = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	var getSomeRandomElemets = function (array, amountOfElements) {
		var arrayCopy = array.slice();
		var newArray = [];
		var arrayLength = arrayCopy.length;
		var _arrayIndex;

		for (var i = 0; i < arrayLength; i += 1) {
			if (newArray.length < amountOfElements) {
				_arrayIndex = (Math.floor(Math.random() * arrayCopy.length));
				newArray.push(arrayCopy.splice(_arrayIndex, 1)[0]);
			} else {
				break;
			}
		}

		return newArray;
	};

	var renderErrorMessage = function (errorMessage) {
		var node = document.createElement('div');
		node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff4d4d;';
		node.style.position = 'absolute';
		node.style.left = 0;
		node.style.right = 0;
		node.style.fontSize = '25px';
		node.style.height = '35px';
		node.style.lineHeight = '35px';
		node.textContent = errorMessage;
		document.body.insertAdjacentElement('afterbegin', node);
	};

	var isEscEvent = function (evt, action) {
		if (evt.keyCode === ESC_KEYCODE) {
			action();
		}
	};

	// var isEnterEvent = function (evt, action) {
	// 	if (evt.keyCode === ENTER_KEYCODE) {
	// 		action();
	// 	}
	// };

	window.util = {
		getRandomNumber: getRandomNumber,
		isEscEvent: isEscEvent,
		renderErrorMessage: renderErrorMessage,
		getSomeRandomElemets: getSomeRandomElemets
	};
})();
