function notify(navigationDetails) {
	const options = {
		type: 'basic',
		iconUrl: 'icon.png',
		title: 'Page load finished',
		message: navigationDetails.url,
	};
	chrome.notifications.create(null, options, null);
}

chrome.webNavigation.onCompleted.addListener(
	function (details) {
		chrome.tabs.get(details.tabId, function(tab) {
			chrome.windows.get(tab.windowId, function(win) {
				if (!(tab.active && win.focused)) {
					notify(details);
				}
			});
		});
	},
	{
		url: [{hostContains: 'localhost'}]
	}
);
