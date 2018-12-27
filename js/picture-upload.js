'use strict';

(function () {
	var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

	var uploadFileInput = document.querySelector('#upload-file');
	var previewImage = document.querySelector('.img-upload__preview img');

	var uploadFileInputChangeHandler = function () {
		var file = uploadFileInput.files[0];
		var fileName = file.name.toLowerCase();

		var matches = FILE_TYPES.some(function (it) {
			return fileName.endsWith(it);
		});

		if (matches) {
			var reader = new FileReader();

			reader.addEventListener('load', function () {
				previewImage.src = reader.result;
			});

			reader.readAsDataURL(file);

			window.form.openPopup();
		}
	};

	uploadFileInput.addEventListener('change', uploadFileInputChangeHandler);
})();
