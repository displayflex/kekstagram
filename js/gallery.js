'use strict';

(function () {
	var gallery = document.querySelector('.pictures');

	var renderGallery = function (pictures) {
		var galleryFragment = document.createDocumentFragment();

		for (var i = 0; i < pictures.length; i += 1) {
			galleryFragment.appendChild(window.preview.render(pictures[i]));
		}

		gallery.appendChild(galleryFragment);
	};

	var loadSuccessHandler = function (pictures) {
		renderGallery(pictures);

		var allPictures = document.querySelectorAll('.picture');

		allPictures.forEach(function (picture, index) {
			picture.addEventListener('click', function () {
				window.picture.open(pictures[index]);
			});
		});
	};

	var loadErrorHandler = function (errorMessage) {
		window.util.renderErrorMessage(errorMessage);
	};

	window.backend.load(loadSuccessHandler, loadErrorHandler);
})();
