'use strict';

(function () {
	var COMMENTS_TO_SHOW = 5;

	var commentsList = document.querySelector('.social__comments');
	var commentTemplate = document.querySelector('#comment')
		.content
		.querySelector('.social__comment');
	var commentsCount = document.querySelector('.comments-count');
	var shownCommentsCount = document.querySelector('.shown-comments-count');
	var commentsLoader = document.querySelector('.comments-loader');

	var bigPictureComments = [];
	var commentsShown = 0;

	var renderComment = function (comment) {
		var commentElement = commentTemplate.cloneNode(true);
		commentElement.querySelector('.social__picture').src = comment.avatar;
		commentElement.querySelector('.social__text').textContent = comment.message;

		return commentElement;
	};

	var renderComments = function (comments) {
		commentsLoader.classList.remove('visually-hidden');

		if (bigPictureComments.length === 0) {
			bigPictureComments = comments;
		}

		var commentsFragment = document.createDocumentFragment();
		var commentsRemaining = bigPictureComments.length - commentsShown;
		var commentsAmountToShow = COMMENTS_TO_SHOW < commentsRemaining ? COMMENTS_TO_SHOW : commentsRemaining;

		for (var i = commentsShown; i < (commentsAmountToShow + commentsShown); i += 1) {
			commentsFragment.appendChild(renderComment(comments[i]));
		}

		commentsShown += commentsAmountToShow;
		commentsList.appendChild(commentsFragment);

		commentsCount.textContent = bigPictureComments.length;
		shownCommentsCount.textContent = commentsShown;

		if (commentsRemaining < COMMENTS_TO_SHOW) {
			commentsLoader.classList.add('visually-hidden');
		}
	};

	var clearComments = function () {
		var comments = commentsList.querySelectorAll('.social__comment');

		comments.forEach(function (comment) {
			commentsList.removeChild(comment);
		});

		commentsShown = 0;
		bigPictureComments = [];
	};

	var commentsLoaderClickHandler = function () {
		renderComments(bigPictureComments, COMMENTS_TO_SHOW);
	};

	commentsLoader.addEventListener('click', commentsLoaderClickHandler);

	window.comments = {
		render: renderComments,
		clear: clearComments
	};
})();
