'use strict';

(function () {
	var bigPicture = document.querySelector('.big-picture');
	var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
	var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
	var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
	var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

	var renderBigPicture = function (picture) {
		bigPictureImage.src = picture.url;
		bigPictureLikesCount.textContent = picture.likes;
		bigPictureSocialCaption.textContent = picture.description;
		window.comments.render(picture.comments);
	};

	var bigPicturePopupEscPressHandler = function (evt) {
		if (evt.target.className !== 'social__footer-text') {
			window.util.isEscEvent(evt, closeBigPicturePopup);
		}
	};

	var bigPictureClickHandler = function (evt) {
		if (evt.target.className === 'big-picture overlay') {
			closeBigPicturePopup();
		}
	};

	var openBigPicturePopup = function (picture) {
		renderBigPicture(picture);
		bigPicture.classList.remove('hidden');
		document.body.classList.add('js-no-scroll');
		document.addEventListener('keydown', bigPicturePopupEscPressHandler);
		bigPicture.addEventListener('click', bigPictureClickHandler);
	};

	var closeBigPicturePopup = function () {
		bigPicture.classList.add('hidden');
		document.body.classList.remove('js-no-scroll');
		window.comments.clear();
		document.removeEventListener('keydown', bigPicturePopupEscPressHandler);
		bigPicture.removeEventListener('click', bigPictureClickHandler);
	};

	bigPictureClose.addEventListener('click', function () {
		closeBigPicturePopup();
	});

	window.picture = {
		open: openBigPicturePopup
	};
})();
