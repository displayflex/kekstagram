'use strict';

(function () {
	var RESPONSE_TIMEOUT = 3000;
	var Url = {
		LOAD: 'https://js.dump.academy/kekstagram/data',
		SAVE: 'https://js.dump.academy/kekstagram'
	};
	var Message = {
		WRONG_REQUEST: 'Неверный запрос',
		NOT_AUTHORIZED: 'Пользователь не авторизован',
		NOT_FOUND: 'Ничего не найдено',
		CONNECT_ERROR: 'Произошла ошибка соединения'
	};

	var load = function (onLoad, onError) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.timeout = RESPONSE_TIMEOUT;

		xhr.open('GET', Url.LOAD);

		xhr.addEventListener('load', function () {
			var error;

			switch (xhr.status) {
				case 200:
					onLoad(xhr.response);
					break;
				case 400:
					error = Message.WRONG_REQUEST;
					break;
				case 401:
					error = Message.NOT_AUTHORIZED;
					break;
				case 404:
					error = Message.NOT_FOUND;
					break;
				default:
					error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
					break;
			}

			if (error) {
				onError(error);
			}
		});

		xhr.addEventListener('error', function () {
			onError(Message.CONNECT_ERROR);
		});

		xhr.addEventListener('timeout', function () {
			onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
		});

		xhr.send();
	};

	var save = function (data, onLoad, onError) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.timeout = RESPONSE_TIMEOUT;

		xhr.open('POST', Url.SAVE);

		xhr.addEventListener('load', function () {
			if (xhr.status === 200) {
				onLoad(xhr.response);
			} else {
				onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
			}
		});

		xhr.addEventListener('error', function () {
			onError(Message.CONNECT_ERROR);
		});

		xhr.addEventListener('timeout', function () {
			onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
		});

		xhr.send(data);
	};

	window.backend = {
		load: load,
		save: save
	};
})();
