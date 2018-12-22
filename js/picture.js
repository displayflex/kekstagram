'use strict';

(function () {
	var commentsList = document.querySelector('.social__comments');
	var commentTemplate = document.querySelector('#comment')
		.content
		.querySelector('.social__comment');
	var bigPicture = document.querySelector('.big-picture');
	var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
	var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
	var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
	var bigPictureShownCommentsCount = bigPicture.querySelector('.shown-comments-count');
	var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
	var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

	var renderComment = function (comment) {
		var commentElement = commentTemplate.cloneNode(true);
		commentElement.querySelector('.social__picture').src = comment.avatar;
		commentElement.querySelector('.social__text').textContent = comment.message;

		return commentElement;
	};

	var renderAllComments = function (comments) {
		var commentsFragment = document.createDocumentFragment();

		for (var i = 0; i < comments.length; i += 1) {
			commentsFragment.appendChild(renderComment(comments[i]));
		}

		commentsList.appendChild(commentsFragment);
	};

	var renderBigPicture = function (picture) {
		bigPictureImage.src = picture.url;
		bigPictureLikesCount.textContent = picture.likes;
		bigPictureCommentsCount.textContent = picture.comments.length;
		bigPictureShownCommentsCount.textContent = picture.comments.length;
		bigPictureSocialCaption.textContent = picture.description;
		renderAllComments(picture.comments);
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
	};

	bigPictureClose.addEventListener('click', function () {
		closeBigPicturePopup();
	});

	bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

	window.picture = {
		open: openBigPicturePopup
	};
})();
