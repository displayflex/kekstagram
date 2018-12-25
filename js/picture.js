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

	var openBigPicturePopup = function (picture) {
		renderBigPicture(picture);
		bigPicture.classList.remove('hidden');
		document.addEventListener('keydown', bigPicturePopupEscPressHandler);
	};

	var closeBigPicturePopup = function () {
		bigPicture.classList.add('hidden');
		document.removeEventListener('keydown', bigPicturePopupEscPressHandler);
		window.comments.clear();
	};

	bigPictureClose.addEventListener('click', function () {
		closeBigPicturePopup();
	});

	window.picture = {
		open: openBigPicturePopup
	};
})();
