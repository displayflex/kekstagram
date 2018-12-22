'use strict';

(function () {
	var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
	var SAVE_URL = 'https://js.dump.academy/kekstagram';
	var RESPONSE_TIMEOUT = 3000;

	var load = function (onLoad, onError) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.timeout = RESPONSE_TIMEOUT;

		xhr.open('GET', LOAD_URL);

		xhr.addEventListener('load', function () {
			var error;

			switch (xhr.status) {
				case 200:
					onLoad(xhr.response);
					break;
				case 400:
					error = 'Неверный запрос';
					break;
				case 401:
					error = 'Пользователь не авторизован';
					break;
				case 404:
					error = 'Ничего не найдено';
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
			onError('Произошла ошибка соединения');
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

		xhr.open('POST', SAVE_URL);

		xhr.addEventListener('load', function () {
			if (xhr.status === 200) {
				onLoad(xhr.response);
			} else {
				onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
			}
		});

		xhr.addEventListener('error', function () {
			onError('Произошла ошибка соединения');
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
