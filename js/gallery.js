'use strict';

(function () {
	var gallery = document.querySelector('.pictures');
	var imgFilters = document.querySelector('.img-filters');
	var filterButtons = imgFilters.querySelectorAll('.img-filters__button');

	var popularPictures;
	var newPictures;
	var discussedPictures;

	var renderGallery = function (pictures) {
		var galleryFragment = document.createDocumentFragment();

		for (var i = 0; i < pictures.length; i += 1) {
			galleryFragment.appendChild(window.preview.render(pictures[i]));
		}

		gallery.appendChild(galleryFragment);
	};

	var removePictures = function () {
		var pictures = gallery.querySelectorAll('.picture');

		pictures.forEach(function (picture) {
			gallery.removeChild(picture);
		});
	};

	var generateNewPictures = function (pictures) {
		if (pictures.length > 10) {
			newPictures = window.util.getSomeRandomElemets(pictures, 10);
		} else {
			newPictures = pictures;
		}
	};

	var generateDiscussedPictures = function (pictures) {
		discussedPictures = pictures.slice();

		discussedPictures.sort(function (left, right) {
			return right.comments.length - left.comments.length;
		});
	};

	var addListenersToPuctures = function (pictures) {
		var allPictures = document.querySelectorAll('.picture');

		allPictures.forEach(function (picture, index) {
			var pictureClickHandler = function () {
				window.picture.open(pictures[index]);
			};

			picture.addEventListener('click', pictureClickHandler);
		});
	};

	var clearActiveClassFiltersButton = function () {
		filterButtons.forEach(function (buttonElement) {
			buttonElement.classList.remove('img-filters__button--active');
		});
	};

	var addActiveClassFilterButton = function (button) {
		button.classList.add('img-filters__button--active');
	};

	var filterButtonClickHandler = function (evt) {
		var activeFilterButton = evt.target;

		if (!activeFilterButton.classList.contains('img-filters__button--active')) {
			evt.preventDefault();
			clearActiveClassFiltersButton();
			addActiveClassFilterButton(activeFilterButton);
			window.debounce(function () {
				removePictures();

				switch (activeFilterButton.id) {
					case 'filter-popular':
						renderGallery(popularPictures);
						addListenersToPuctures(popularPictures);
						break;
					case 'filter-new':
						renderGallery(newPictures);
						addListenersToPuctures(newPictures);
						break;
					case 'filter-discussed':
						renderGallery(discussedPictures);
						addListenersToPuctures(discussedPictures);
						break;

					default:
						break;
				}
			});
		}
	};

	var loadSuccessHandler = function (pictures) {
		popularPictures = pictures;
		generateNewPictures(pictures);
		generateDiscussedPictures(pictures);
		renderGallery(popularPictures);
		addListenersToPuctures(popularPictures);
		imgFilters.classList.remove('img-filters--inactive');

		filterButtons.forEach(function (buttonElement) {
			buttonElement.addEventListener('click', filterButtonClickHandler);
		});
	};

	var loadErrorHandler = function (errorMessage) {
		window.util.renderErrorMessage(errorMessage);
	};

	window.backend.load(loadSuccessHandler, loadErrorHandler);
})();
