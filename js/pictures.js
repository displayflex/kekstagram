'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATARS = 1;
var MAX_AVATARS = 6;
var PICTURE_COUNT = 25;
var ESC_KEYCODE = 27;
var PIN_INITIAL_VALUE = 100;
var MAX_HASH_TAG_LENGTH = 20;
var MAX_HASH_TAGS_AMOUNT = 5;
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
var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
var uploadFileInput = document.querySelector('#upload-file');
var uploadFilePopup = document.querySelector('.img-upload__overlay');
var imageUploadClose = uploadFilePopup.querySelector('.img-upload__cancel');
var effectLevelSlider = uploadFilePopup.querySelector('.effect-level');
var effectLevelPin = uploadFilePopup.querySelector('.effect-level__pin');
var effectLevelDepth = uploadFilePopup.querySelector('.effect-level__depth');
var effectLevelInput = uploadFilePopup.querySelector('.effect-level__value');
var effectsList = uploadFilePopup.querySelector('.effects__list');
var previewImage = uploadFilePopup.querySelector('.img-upload__preview img');
var previewImageWrapper = uploadFilePopup.querySelector('.img-upload__preview');
var hashTagsInput = uploadFilePopup.querySelector('.text__hashtags');

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

var renderBigPicture = function (index) {
	bigPictureImage.src = pictures[index].url;
	bigPictureLikesCount.textContent = pictures[index].likes;
	bigPictureCommentsCount.textContent = pictures[index].comments.length;
	bigPictureSocialCaption.textContent = pictures[index].description;
	renderAllComments(pictures[index].comments);
};

var pictures = generatePictures(PICTURE_COUNT);
renderGallery(pictures);

var bigPicturePopupEscPressHandler = function (evt) {
	if (evt.target.className !== 'social__footer-text') {
		if (evt.keyCode === ESC_KEYCODE) {
			closeBigPicturePopup();
		}
	}
};

var closeBigPicturePopup = function () {
	bigPicture.classList.add('hidden');
	document.removeEventListener('keydown', bigPicturePopupEscPressHandler);
};

var openBigPicturePopup = function (index) {
	renderBigPicture(index);
	bigPicture.classList.remove('hidden');
	document.addEventListener('keydown', bigPicturePopupEscPressHandler);
};

var allPictures = document.querySelectorAll('.picture');

allPictures.forEach(function (picture, index) {
	picture.addEventListener('click', function () {
		openBigPicturePopup(index);
	});
});

bigPictureClose.addEventListener('click', function () {
	closeBigPicturePopup();
});

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

var uploadFilePopupEscPressHandler = function (evt) {
	if (evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description') {
		if (evt.keyCode === ESC_KEYCODE) {
			closeUploadFilePopup();
		}
	}
};

var openUploadFilePopup = function () {
	effectLevelSlider.classList.add('hidden');
	uploadFilePopup.classList.remove('hidden');
	document.addEventListener('keydown', uploadFilePopupEscPressHandler);
};

var closeUploadFilePopup = function () {
	uploadFilePopup.classList.add('hidden');
	uploadFileInput.value = '';
	document.removeEventListener('keydown', uploadFilePopupEscPressHandler);
};

uploadFileInput.addEventListener('change', function () {
	openUploadFilePopup();
});

imageUploadClose.addEventListener('click', function () {
	closeUploadFilePopup();
});

var setPinPosition = function (pinPosition) {
	if (pinPosition < 0 || pinPosition > 100) {
		return;
	}

	effectLevelPin.style.left = pinPosition + '%';
	effectLevelDepth.style.width = pinPosition + '%';
	effectLevelInput.value = Math.round(pinPosition);
};

var effectLevelPinMouseDownHandler = function (evt) {
	evt.preventDefault();

	var startCoordX = evt.clientX;

	var mouseMoveHandler = function (moveEvt) {
		moveEvt.preventDefault();

		var shift = startCoordX - moveEvt.clientX;
		startCoordX = moveEvt.clientX;
		var pinPosition = (effectLevelPin.offsetLeft - shift) * 100 / 453; // 453?
		setPinPosition(pinPosition);
		setEffectLevel();
	};

	var mouseUpHandler = function (upEvt) {
		upEvt.preventDefault();

		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};

	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);
};

var setEffectLevel = function () {
	switch (previewImage.className) {
		case 'effects__preview--chrome':
			previewImageWrapper.style.filter = 'grayscale(' + effectLevelInput.value / 100 + ')';
			break;
		case 'effects__preview--sepia':
			previewImageWrapper.style.filter = 'sepia(' + effectLevelInput.value / 100 + ')';
			break;
		case 'effects__preview--marvin':
			previewImageWrapper.style.filter = 'invert(' + effectLevelInput.value + '%)';
			break;
		case 'effects__preview--phobos':
			previewImageWrapper.style.filter = 'blur(' + effectLevelInput.value / 100 * 3 + 'px)';
			break;
		case 'effects__preview--heat':
			previewImageWrapper.style.filter = 'brightness(' + ((effectLevelInput.value / 100 * 2) + 1) + ')';
			break;

		default:
			previewImageWrapper.style.filter = '';
			break;
	}
};

effectLevelPin.addEventListener('mousedown', effectLevelPinMouseDownHandler);

var effectsListClickHandler = function (evt) {
	if (evt.target.nodeName === 'INPUT') {
		previewImage.className = 'effects__preview--' + evt.target.value;
		setPinPosition(PIN_INITIAL_VALUE);
	}

	if (evt.target.value === 'none') {
		effectLevelSlider.classList.add('hidden');
	} else {
		effectLevelSlider.classList.remove('hidden');
	}
};

effectsList.addEventListener('click', effectsListClickHandler);

var isArrayWithoutDuplicates = function (array) {
	var arrayToLowerCase = array.map(function (element) {
		return element.toLowerCase();
	});

	arrayToLowerCase.sort();

	var arrayWithoutDuplicates = [];
	var _temp;

	for (var i = 0; i < arrayToLowerCase.length; i += 1) {
		if (arrayToLowerCase[i] !== _temp) {
			arrayWithoutDuplicates.push(arrayToLowerCase[i]);
			_temp = arrayToLowerCase[i];
		} else {
			return false;
		}
	}

	return true;
};

var validateHashTagsInput = function () {
	if (hashTagsInput.value === '') {
		return;
	}

	var hashTags = hashTagsInput.value.split(' ');

	if (hashTags.length > MAX_HASH_TAGS_AMOUNT) {
		hashTagsInput.setCustomValidity('Количество хеш-тегов не должно быть больше пяти');
	} else if (!isArrayWithoutDuplicates(hashTags)) {
		hashTagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
	} else {
		for (var i = 0; i < hashTags.length; i += 1) {
			if (hashTags[i][0] !== '#') {
				hashTagsInput.setCustomValidity('Каждый хеш-тег должен начинаться с символа #');
				break;
			} else if (hashTags[i] === '#') {
				hashTagsInput.setCustomValidity('Хеш-тег не может состоять только из одной #');
				break;
			} else if (hashTags[i].length > MAX_HASH_TAG_LENGTH) {
				hashTagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая #');
				break;
			} else if (hashTags[i].indexOf('#', 1) !== -1) {
				hashTagsInput.setCustomValidity('Хэш-теги должны быть разделены пробелами');
				break;
			} else {
				hashTagsInput.setCustomValidity('');
			}
		}
	}
};

hashTagsInput.addEventListener('blur', function () {
	validateHashTagsInput();
});
