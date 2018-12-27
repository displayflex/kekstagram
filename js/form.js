'use strict';

(function () {
	var uploadForm = document.querySelector('.img-upload__form');
	var uploadFileInput = uploadForm.querySelector('#upload-file');
	var uploadFilePopup = uploadForm.querySelector('.img-upload__overlay');
	var imageUploadClose = uploadFilePopup.querySelector('.img-upload__cancel');
	var effectLevelSlider = uploadFilePopup.querySelector('.effect-level');
	var effectNone = uploadFilePopup.querySelector('#effect-none');
	var commentInput = uploadFilePopup.querySelector('.text__description');

	var uploadFilePopupEscPressHandler = function (evt) {
		if (evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description') {
			window.util.isEscEvent(evt, closeUploadFilePopup);
		}
	};

	var uploadFilePopupClickHandler = function (evt) {
		if (evt.target.className === 'img-upload__overlay') {
			closeUploadFilePopup();
		}
	};

	var openUploadFilePopup = function () {
		effectLevelSlider.classList.add('hidden');
		document.body.classList.add('js-no-scroll');
		window.scalePhoto.activate();
		window.effects.activate();
		uploadFilePopup.classList.remove('hidden');
		document.addEventListener('keydown', uploadFilePopupEscPressHandler);
		uploadFilePopup.addEventListener('click', uploadFilePopupClickHandler);
	};

	var resetInputData = function () {
		uploadFileInput.value = '';
		commentInput.value = '';
		window.effects.resetData();
		window.hashtags.resetData();
		effectNone.checked = true;
	};

	var closeUploadFilePopup = function () {
		uploadFilePopup.classList.add('hidden');
		document.body.classList.remove('js-no-scroll');
		resetInputData();
		window.scalePhoto.deactivate();
		window.effects.deactivate();
		document.removeEventListener('keydown', uploadFilePopupEscPressHandler);
		uploadFilePopup.removeEventListener('click', uploadFilePopupClickHandler);
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

	uploadForm.addEventListener('submit', uploadFormSubmitHandler);

	window.form = {
		openPopup: openUploadFilePopup
	};
})();
