'use strict';

(function () {
	var PICTURE_COUNT = 25;

	var gallery = document.querySelector('.pictures');

	var renderGallery = function (pictures) {
		var galleryFragment = document.createDocumentFragment();

		for (var i = 0; i < pictures.length; i += 1) {
			galleryFragment.appendChild(window.picture.renderPicture(pictures[i]));
		}

		gallery.appendChild(galleryFragment);
	};

	var pictures = window.data.generatePictures(PICTURE_COUNT);
	renderGallery(pictures);
	var allPictures = document.querySelectorAll('.picture');

	allPictures.forEach(function (picture, index) {
		picture.addEventListener('click', function () {
			window.preview.openBigPicturePopup(pictures[index]);
		});
	});
})();
