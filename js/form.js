function alertCloseHandler(id) {
	var calbackFun = setTimeout(function () {
		try {
			$(`#${id}`).fadeOut('slow', function () {
				$(`#${id}`).remove();
			});
		} catch (error) {}
	}, 10000);

	try {
		$(`#${id} .close`).on('click', function () {
			$(`#${id}`).fadeOut('slow', function () {
				$(`#${id}`).remove();
			});
		});
		clearTimeout(calbackFun);
	} catch (error) {}
}

// post form
$(document).ready(function () {
	$('#contact-form').on('submit', function (e) {
		// prevet from submit form
		e.preventDefault();



		// submit all data by ajax
		var name = $('#input-name').val(),
			email = $('#input-email').val(),
			mobile = $('#input-mobile').val(),
			message = $('#input-message').val();

		if (name == '' || email == '' || mobile == '' || message == '') {
			alert('Please fill-up the form before submit.');
			return;
		}

        // console.log(name);

		// clear form
		$('#input-name').val('');
		$('#input-email').val('');
		$('#input-mobile').val('');
		$('#input-message').val('');

		$.ajax({
			url: 'contact.php',
			method: 'POST',
			data: {
				name,
				email,
				mobile,
				message,
			},
			success: function (result) {
				var id = new Date().getTime().toString();
                console.log(JSON.parse(result));
				if (JSON.parse(result)?.status) {
					var alertDivHtml = `<div id='${id}' class="alert alert-success alert-dismissible fade show" role="alert">
										<strong>Your message successfully sent.</strong> 
										<button type="button" class="close" data-dismiss="alert" aria-label="Close">
										<span aria-hidden="true">&times;</span>
										</button>
									</div>`;
					$('#alert-wrapper').append(alertDivHtml);
					alertCloseHandler(id);
				} else {
					var alertDivHtml = `<div id='${id}' class="alert alert-danger alert-dismissible fade show" role="alert">
					<strong>Your message not sent. Something went wrong.</strong> 
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
					</div>`;
					$('#alert-wrapper').append(alertDivHtml);
					alertCloseHandler(id);
				}
			},
			error: function (request, status, error) {
				alert('Something went wrong.');
			},
		});
	});

	$('#modal-form').on('submit', function (e) {
		// prevet from submit form
		e.preventDefault();

		// submit all data by ajax
		var name = $('#modal-name').val().trim(),
			email = $('#modal-email').val().trim(),
			service = $('#modal-service').val().trim(),
			mobile = $('#modal-mobile').val().trim();

		if (name == '' || email == '' || service == undefined || mobile == '') {
			alert('Please fill-up the form before submit.');
			return;
		}

		$('#myModal').modal('hide');
		// clear form
		$('#modal-name').val('');
		$('#modal-email').val('');
		$('#modal-service').val('');
		$('#modal-mobile').val('');

		$.ajax({
			url: 'contact.php',
			method: 'POST',
			data: {
				name,
				email,
				service,
				mobile,
			},
			success: function (result) {
				var id = new Date().getTime().toString();
				if (JSON.parse(result)?.status) {
					var alertDivHtml = `<div id='${id}' class="alert alert-success alert-dismissible fade show" role="alert">
										<strong>Your message successfully save. We will contact you soon.</strong> 
										<button type="button" class="close" data-dismiss="alert" aria-label="Close">
										<span aria-hidden="true">&times;</span>
										</button>
									</div>`;
					$('#alert-wrapper').append(alertDivHtml);
					alertCloseHandler(id);
				} else {
					var alertDivHtml = `<div id='${id}' class="alert alert-danger alert-dismissible fade show" role="alert">
					<strong>Your message not sent. Something went wrong.</strong> 
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
					</div>`;
					$('#alert-wrapper').append(alertDivHtml);
					alertCloseHandler(id);
				}
			},
			error: function (request, status, error) {
				alert('Something went wrong.');
			},
		});
	});
});
