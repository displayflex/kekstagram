'use strict';

(function () {
	var MIN_VALUE = 25;
	var MAX_VALUE = 100;
	var SCALE_STEP = 25;

	var previewImage = document.querySelector('.img-upload__preview img');
	var scaleSmaller = document.querySelector('.scale__control--smaller');
	var scaleBigger = document.querySelector('.scale__control--bigger');
	var scaleValue = document.querySelector('.scale__control--value');

	var createScaleClick = function (stepValue) {
		var value = parseInt(scaleValue.value.substring(0, scaleValue.value.indexOf('%')), 10);
		value += stepValue;

		if (value >= MAX_VALUE) {
			value = MAX_VALUE;
		}

		if (value <= MIN_VALUE) {
			value = MIN_VALUE;
		}

		scaleValue.value = value + '%';
		previewImage.style.transform = 'scale(' + value / 100 + ')';
	};

	var scaleBiggerClickHandler = function () {
		createScaleClick(SCALE_STEP);
	};

	var scaleSmallerClickHandler = function () {
		createScaleClick(-SCALE_STEP);
	};

	window.scalePhoto = {
		activate: function () {
			scaleValue.value = MAX_VALUE + '%';
			previewImage.style.transform = 'scale(' + MAX_VALUE / 100 + ')';

			scaleBigger.addEventListener('click', scaleBiggerClickHandler);
			scaleSmaller.addEventListener('click', scaleSmallerClickHandler);
		},
		deactivate: function () {
			scaleBigger.removeEventListener('click', scaleBiggerClickHandler);
			scaleSmaller.removeEventListener('click', scaleSmallerClickHandler);
		}
	};
})();
