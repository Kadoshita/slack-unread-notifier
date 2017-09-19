var init = function () {
	var checkTimer;
	var setting;
	chrome.storage.sync.get(['token', 'id', 'interval'], function (items) {
		console.log(items);
		setting = items;
		checkTimer = setInterval(function () {
			checkUnreadMessage(items.token, items.id);
		}, items.interval * 1000);
	});
	chrome.storage.onChanged.addListener(function (changes, areaname) {
		clearInterval(checkTimer);
		setting.id = (changes.id) ? changes.id.newValue : setting.id;
		setting.token = (changes.token) ? changes.token.newValue : setting.token;
		setting.interval = (changes.interval) ? changes.interval.newValue : setting.interval;
		checkTimer = setInterval(function () {
			checkUnreadMessage(setting.token, setting.id);
		}, setting.interval * 1000);
	});
};
var checkUnreadMessage = function (token, channel) {
	console.log(channel);
	var slackEndpoint = 'https://slack.com/api/channels.history';
	var TOKEN = '?token=' + token;
	var channel = '&channel=' + channel;
	var options = '&unreads=true&pretty=1';

	var url = slackEndpoint + TOKEN + channel + options;

	$.ajax({
		type: 'get',
		url: url,
		success: function (data) {
			var messages = data.messages;
			var i = 0;
			for (i = 0; i < data.unread_count_display; i++) {
				console.log(messages[i]);
			}
		}
	});
};

init();