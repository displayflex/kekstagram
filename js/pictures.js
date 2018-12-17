'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATARS = 1;
var MAX_AVATARS = 6;
var PICTURE_COUNT = 25;
var PICTURE_COMMENTS = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PICTURE_DESCRIPTIONS = [
	'Тестим новую камеру!',
	'Затусили с друзьями на море',
	'Как же круто тут кормят',
	'Отдыхаем...',
	'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
	'Вот это тачка!'
];

var gallery = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
	.content
	.querySelector('.picture');
var commentsList = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment')
	.content
	.querySelector('.social__comment');
var bigPicture = document.querySelector('.big-picture');

var getRandomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomElementFromArray = function (array) {
	return array[Math.floor(Math.random() * array.length)];
};

var generateRandomComments = function (comments) {
	var randomComments = [];

	for (var i = 0; i < getRandomNumber(1, 2); i += 1) {
		randomComments.push(getRandomElementFromArray(comments));
	}

	return randomComments;
};

var generatePictures = function (count) {
	var pictures = [];

	for (var i = 1; i <= count; i += 1) {
		pictures.push({
			url: 'photos/' + i + '.jpg',
			likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
			comments: generateRandomComments(PICTURE_COMMENTS),
			description: getRandomElementFromArray(PICTURE_DESCRIPTIONS)
		});
	}

	return pictures;
};

var renderPicture = function (picture) {
	var pictureElement = pictureTemplate.cloneNode(true);

	pictureElement.querySelector('img').src = picture.url;
	pictureElement.querySelector('.picture__likes').textContent = picture.likes;
	pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

	return pictureElement;
};

var renderGallery = function (pictures) {
	var galleryFragment = document.createDocumentFragment();

	for (var i = 0; i < pictures.length; i += 1) {
		galleryFragment.appendChild(renderPicture(pictures[i]));
	}

	gallery.appendChild(galleryFragment);
};

var renderComment = function (comment) {
	var commentElement = commentTemplate.cloneNode(true);

	commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(MIN_AVATARS, MAX_AVATARS) + '.svg';
	commentElement.querySelector('.social__text').textContent = comment;

	return commentElement;
};

var renderAllComments = function (comments) {
	var commentsFragment = document.createDocumentFragment();

	for (var i = 0; i < comments.length; i += 1) {
		commentsFragment.appendChild(renderComment(comments[i]));
	}

	commentsList.appendChild(commentsFragment);
};

var pictures = generatePictures(PICTURE_COUNT);
renderGallery(pictures);

bigPicture.querySelector('.big-picture__img img').src = pictures[0].url;
bigPicture.querySelector('.likes-count').textContent = pictures[0].likes;
bigPicture.querySelector('.comments-count').textContent = pictures[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = pictures[0].description;
renderAllComments(pictures[0].comments);

bigPicture.classList.remove('hidden');
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
