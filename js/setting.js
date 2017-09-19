$(document).ready(function () {
	chrome.storage.sync.get(['token', 'id','interval'],function (items) {
		$('#token').val(items.token);
		$('#channelid').val(items.id);
		$('#interval').val(items.interval);
	});

	$('#save').on('click', function () {
		var channelData = {};
		channelData['token'] = $('#token').val();
		channelData['id'] = $('#channelid').val();
		channelData['interval'] = $('#interval').val();
		chrome.storage.sync.set(channelData, function () {
			swal('Saved!');
		});
	});
});