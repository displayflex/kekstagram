'use strict';

(function () {
	var PIN_INITIAL_VALUE = 100;
	var EFFECT_LEVEL_INPUT_INITIAL_VALUE = 100;
	var EFFECT_LEVEL_LINE_WIDTH = 453;

	var effectLevelSlider = document.querySelector('.effect-level');
	var effectLevelPin = document.querySelector('.effect-level__pin');
	var effectLevelDepth = document.querySelector('.effect-level__depth');
	var effectLevelInput = document.querySelector('.effect-level__value');
	var previewImage = document.querySelector('.img-upload__preview img');
	var effectsList = document.querySelector('.effects__list');

	var setPinPosition = function (pinPosition) {
		if (pinPosition < 0 || pinPosition > 100) {
			return;
		}

		effectLevelPin.style.left = pinPosition + '%';
		effectLevelDepth.style.width = pinPosition + '%';
		effectLevelInput.value = Math.round(pinPosition);
	};

	var setEffectLevel = function () {
		switch (previewImage.className) {
			case 'effects__preview--chrome':
				previewImage.style.filter = 'grayscale(' + effectLevelInput.value / 100 + ')';
				break;
			case 'effects__preview--sepia':
				previewImage.style.filter = 'sepia(' + effectLevelInput.value / 100 + ')';
				break;
			case 'effects__preview--marvin':
				previewImage.style.filter = 'invert(' + effectLevelInput.value + '%)';
				break;
			case 'effects__preview--phobos':
				previewImage.style.filter = 'blur(' + effectLevelInput.value / 100 * 3 + 'px)';
				break;
			case 'effects__preview--heat':
				previewImage.style.filter = 'brightness(' + ((effectLevelInput.value / 100 * 2) + 1) + ')';
				break;

			default:
				previewImage.style.filter = '';
				break;
		}
	};

	var effectLevelPinMouseDownHandler = function (evt) {
		evt.preventDefault();

		var startCoordX = evt.clientX;

		var mouseMoveHandler = function (moveEvt) {
			moveEvt.preventDefault();

			var shift = startCoordX - moveEvt.clientX;
			startCoordX = moveEvt.clientX;
			var pinPosition = (effectLevelPin.offsetLeft - shift) * 100 / EFFECT_LEVEL_LINE_WIDTH;
			setPinPosition(pinPosition);
			setEffectLevel();
		};

		var mouseUpHandler = function (upEvt) {
			upEvt.preventDefault();

			document.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseup', mouseUpHandler);
		};

		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	};

	var effectsListClickHandler = function (evt) {
		if (evt.target.nodeName === 'INPUT') {
			previewImage.className = 'effects__preview--' + evt.target.value;
			effectLevelInput.value = EFFECT_LEVEL_INPUT_INITIAL_VALUE;
			setEffectLevel();
			setPinPosition(PIN_INITIAL_VALUE);
		}

		if (evt.target.value === 'none') {
			effectLevelSlider.classList.add('hidden');
		} else {
			effectLevelSlider.classList.remove('hidden');
		}
	};

	window.effects = {
		resetData: function () {
			previewImage.className = 'effects__preview--none';
			previewImage.style.filter = '';
			effectLevelInput.value = 100;
		},
		activate: function () {
			effectLevelPin.addEventListener('mousedown', effectLevelPinMouseDownHandler);
			effectsList.addEventListener('click', effectsListClickHandler);
		},
		deactivate: function () {
			effectLevelPin.removeEventListener('mousedown', effectLevelPinMouseDownHandler);
			effectsList.removeEventListener('click', effectsListClickHandler);
		}
	};
})();
