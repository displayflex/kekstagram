'use strict';

(function () {
	var MIN_LIKES = 15;
	var MAX_LIKES = 200;
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

	var getRandomElementFromArray = function (array) {
		return array[Math.floor(Math.random() * array.length)];
	};

	var generateRandomComments = function (comments) {
		var randomComments = [];

		for (var i = 0; i < window.util.getRandomNumber(1, 2); i += 1) {
			randomComments.push(getRandomElementFromArray(comments));
		}

		return randomComments;
	};

	var generatePictures = function (count) {
		var pictures = [];

		for (var i = 1; i <= count; i += 1) {
			pictures.push({
				url: 'photos/' + i + '.jpg',
				likes: window.util.getRandomNumber(MIN_LIKES, MAX_LIKES),
				comments: generateRandomComments(PICTURE_COMMENTS),
				description: getRandomElementFromArray(PICTURE_DESCRIPTIONS)
			});
		}

		return pictures;
	};

	window.data = {
		generatePictures: generatePictures
	};
})();
