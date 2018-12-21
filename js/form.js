'use strict';

(function () {
	var PIN_INITIAL_VALUE = 100;
	var MAX_HASH_TAG_LENGTH = 20;
	var MAX_HASH_TAGS_AMOUNT = 5;

	var uploadFileInput = document.querySelector('#upload-file');
	var uploadFilePopup = document.querySelector('.img-upload__overlay');
	var imageUploadClose = uploadFilePopup.querySelector('.img-upload__cancel');
	var effectLevelSlider = uploadFilePopup.querySelector('.effect-level');
	var effectLevelPin = uploadFilePopup.querySelector('.effect-level__pin');
	var effectLevelDepth = uploadFilePopup.querySelector('.effect-level__depth');
	var effectLevelInput = uploadFilePopup.querySelector('.effect-level__value');
	var effectsList = uploadFilePopup.querySelector('.effects__list');
	var previewImage = uploadFilePopup.querySelector('.img-upload__preview img');
	var previewImageWrapper = uploadFilePopup.querySelector('.img-upload__preview');
	var hashTagsInput = uploadFilePopup.querySelector('.text__hashtags');

	var uploadFilePopupEscPressHandler = function (evt) {
		if (evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description') {
			window.util.isEscEvent(evt, closeUploadFilePopup);
		}
	};

	var openUploadFilePopup = function () {
		effectLevelSlider.classList.add('hidden');
		uploadFilePopup.classList.remove('hidden');
		document.addEventListener('keydown', uploadFilePopupEscPressHandler);
	};

	var closeUploadFilePopup = function () {
		uploadFilePopup.classList.add('hidden');
		uploadFileInput.value = '';
		document.removeEventListener('keydown', uploadFilePopupEscPressHandler);
	};

	uploadFileInput.addEventListener('change', function () {
		openUploadFilePopup();
	});

	imageUploadClose.addEventListener('click', function () {
		closeUploadFilePopup();
	});

	var setPinPosition = function (pinPosition) {
		if (pinPosition < 0 || pinPosition > 100) {
			return;
		}

		effectLevelPin.style.left = pinPosition + '%';
		effectLevelDepth.style.width = pinPosition + '%';
		effectLevelInput.value = Math.round(pinPosition);
	};

	var effectLevelPinMouseDownHandler = function (evt) {
		evt.preventDefault();

		var startCoordX = evt.clientX;

		var mouseMoveHandler = function (moveEvt) {
			moveEvt.preventDefault();

			var shift = startCoordX - moveEvt.clientX;
			startCoordX = moveEvt.clientX;
			var pinPosition = (effectLevelPin.offsetLeft - shift) * 100 / 453; // 453?
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

	var setEffectLevel = function () {
		switch (previewImage.className) {
			case 'effects__preview--chrome':
				previewImageWrapper.style.filter = 'grayscale(' + effectLevelInput.value / 100 + ')';
				break;
			case 'effects__preview--sepia':
				previewImageWrapper.style.filter = 'sepia(' + effectLevelInput.value / 100 + ')';
				break;
			case 'effects__preview--marvin':
				previewImageWrapper.style.filter = 'invert(' + effectLevelInput.value + '%)';
				break;
			case 'effects__preview--phobos':
				previewImageWrapper.style.filter = 'blur(' + effectLevelInput.value / 100 * 3 + 'px)';
				break;
			case 'effects__preview--heat':
				previewImageWrapper.style.filter = 'brightness(' + ((effectLevelInput.value / 100 * 2) + 1) + ')';
				break;

			default:
				previewImageWrapper.style.filter = '';
				break;
		}
	};

	effectLevelPin.addEventListener('mousedown', effectLevelPinMouseDownHandler);

	var effectsListClickHandler = function (evt) {
		if (evt.target.nodeName === 'INPUT') {
			previewImage.className = 'effects__preview--' + evt.target.value;
			setPinPosition(PIN_INITIAL_VALUE);
		}

		if (evt.target.value === 'none') {
			effectLevelSlider.classList.add('hidden');
		} else {
			effectLevelSlider.classList.remove('hidden');
		}
	};

	effectsList.addEventListener('click', effectsListClickHandler);

	var isArrayWithoutDuplicates = function (array) {
		var arrayToLowerCase = array.map(function (element) {
			return element.toLowerCase();
		});

		arrayToLowerCase.sort();

		var arrayWithoutDuplicates = [];
		var _temp;

		for (var i = 0; i < arrayToLowerCase.length; i += 1) {
			if (arrayToLowerCase[i] !== _temp) {
				arrayWithoutDuplicates.push(arrayToLowerCase[i]);
				_temp = arrayToLowerCase[i];
			} else {
				return false;
			}
		}

		return true;
	};

	var validateHashTagsInput = function () {
		if (hashTagsInput.value === '') {
			return;
		}

		var hashTags = hashTagsInput.value.split(' ');

		if (hashTags.length > MAX_HASH_TAGS_AMOUNT) {
			hashTagsInput.setCustomValidity('Количество хеш-тегов не должно быть больше пяти');
		} else if (!isArrayWithoutDuplicates(hashTags)) {
			hashTagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
		} else {
			for (var i = 0; i < hashTags.length; i += 1) {
				if (hashTags[i][0] !== '#') {
					hashTagsInput.setCustomValidity('Каждый хеш-тег должен начинаться с символа #');
					break;
				} else if (hashTags[i] === '#') {
					hashTagsInput.setCustomValidity('Хеш-тег не может состоять только из одной #');
					break;
				} else if (hashTags[i].length > MAX_HASH_TAG_LENGTH) {
					hashTagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая #');
					break;
				} else if (hashTags[i].indexOf('#', 1) !== -1) {
					hashTagsInput.setCustomValidity('Хэш-теги должны быть разделены пробелами');
					break;
				} else {
					hashTagsInput.setCustomValidity('');
				}
			}
		}
	};

	hashTagsInput.addEventListener('blur', function () {
		validateHashTagsInput();
	});
})();
