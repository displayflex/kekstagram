'use strict';

(function () {
	var MAX_HASH_TAG_LENGTH = 20;
	var MAX_HASH_TAGS_AMOUNT = 5;
	var HashTagErrorMessage = {
		TOO_BIG_QUANTITY: 'Количество хеш-тегов не должно быть больше пяти',
		HAVE_DUPLICATES: 'Один и тот же хэш-тег не может быть использован дважды',
		NOT_BEGINS_WITH_HASH: 'Каждый хеш-тег должен начинаться с символа #',
		NO_CONTENT_AFTER_HASH: 'Хеш-тег не может состоять только из одной #',
		TOO_LONG: 'Максимальная длина одного хэш-тега 20 символов, включая #',
		NOT_SEPARATED_WITH_SPACE: 'Хэш-теги должны быть разделены пробелами'
	};

	var uploadForm = document.querySelector('.img-upload__form');
	var uploadFileInput = uploadForm.querySelector('#upload-file');
	var uploadFilePopup = uploadForm.querySelector('.img-upload__overlay');
	var imageUploadClose = uploadFilePopup.querySelector('.img-upload__cancel');
	var effectLevelSlider = uploadFilePopup.querySelector('.effect-level');
	var effectNone = uploadFilePopup.querySelector('#effect-none');
	var hashTagsInput = uploadFilePopup.querySelector('.text__hashtags');
	var commentInput = uploadFilePopup.querySelector('.text__description');

	var uploadFilePopupEscPressHandler = function (evt) {
		if (evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description') {
			window.util.isEscEvent(evt, closeUploadFilePopup);
		}
	};

	var openUploadFilePopup = function () {
		effectLevelSlider.classList.add('hidden');
		window.scalePhoto.activate();
		window.effects.activate();
		uploadFilePopup.classList.remove('hidden');
		document.addEventListener('keydown', uploadFilePopupEscPressHandler);
	};

	var resetInputData = function () {
		uploadFileInput.value = '';
		hashTagsInput.value = '';
		commentInput.value = '';
		window.effects.resetData();
		effectNone.checked = true;
	};

	var closeUploadFilePopup = function () {
		uploadFilePopup.classList.add('hidden');
		resetInputData();
		window.scalePhoto.deactivate();
		window.effects.deactivate();
		document.removeEventListener('keydown', uploadFilePopupEscPressHandler);
	};

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
			hashTagsInput.style.border = 'none';
			hashTagsInput.setCustomValidity('');
			return;
		}

		var hashTags = hashTagsInput.value.split(' ');

		if (hashTags.length > MAX_HASH_TAGS_AMOUNT) {
			hashTagsInput.setCustomValidity(HashTagErrorMessage.TOO_BIG_QUANTITY);
		} else if (!isArrayWithoutDuplicates(hashTags)) {
			hashTagsInput.setCustomValidity(HashTagErrorMessage.HAVE_DUPLICATES);
		} else {
			for (var i = 0; i < hashTags.length; i += 1) {
				if (hashTags[i][0] !== '#') {
					hashTagsInput.setCustomValidity(HashTagErrorMessage.NOT_BEGINS_WITH_HASH);
					break;
				} else if (hashTags[i] === '#') {
					hashTagsInput.setCustomValidity(HashTagErrorMessage.NO_CONTENT_AFTER_HASH);
					break;
				} else if (hashTags[i].length > MAX_HASH_TAG_LENGTH) {
					hashTagsInput.setCustomValidity(HashTagErrorMessage.TOO_LONG);
					break;
				} else if (hashTags[i].indexOf('#', 1) !== -1) {
					hashTagsInput.setCustomValidity(HashTagErrorMessage.NOT_SEPARATED_WITH_SPACE);
					break;
				} else {
					hashTagsInput.setCustomValidity('');
				}
			}
		}

		if (!hashTagsInput.validity.valid) {
			hashTagsInput.style.border = '3px solid red';
		} else {
			hashTagsInput.style.border = 'none';
		}
	};

	var saveSuccessHandler = function () {
		closeUploadFilePopup();
	};

	var saveErrorHandler = function (errorMessage) {
		window.util.renderErrorMessage(errorMessage);
	};

	var uploadFormSubmitHandler = function (evt) {
		window.backend.save(new FormData(uploadForm), saveSuccessHandler, saveErrorHandler);
		evt.preventDefault();
	};

	imageUploadClose.addEventListener('click', function () {
		closeUploadFilePopup();
	});

	hashTagsInput.addEventListener('blur', function () {
		validateHashTagsInput();
	});

	uploadForm.addEventListener('submit', uploadFormSubmitHandler);

	window.form = {
		openPopup: openUploadFilePopup
	};
})();
