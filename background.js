debug = false;
var alreadyClicked = false;
var timer;
if (debug) console.log("Ver 2.2");
browser.tabs.onActivated.addListener(() => { showPageAction(); });
browser.tabs.onUpdated.addListener(() => { showPageAction(); });

function showPageAction() {
	var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
	gettingActiveTab.then((tabs) => {
		browser.pageAction.show(tabs[0].id);
	});
}

browser.pageAction.onClicked.addListener((activeTab) => {
	if (debug) console.log("Page Action onClick Begin");

	if (alreadyClicked) {

		clearTimeout(timer);
		if (debug) console.log("Double click");
		browser.tabs.remove(activeTab.id);
		alreadyClicked = false;
		return;
	}

	alreadyClicked = true;

	timer = setTimeout(function () {
		if (debug) console.log("Single click");

		var getting = browser.storage.local.get("url");
		getting.then(
			function(data) {
				return onGot(data, activeTab)
			}, 
			onError
		);

		clearTimeout(timer);
		alreadyClicked = false;

	}, 250);

	if (debug) console.log("Page Action onClick End");
});

function goHome(homeURL, activeTab) {
	  if (homeURL === undefined || homeURL == "") {
			browser.tabs.update({url: 'https://www.google.com/'});
		//if (debug) console.log("goHome Url undef");
			//if (activeTab.url !== 'about:home') {

					//ativeTabId = activeTab.id;
					//var gettingTabs = browser.tabs.query({});
					//gettingTabs.then((tabs) => {
						//tabsCount = tabs.length;
						//createProperties = [];
						// if (debug) console.log("Saving current tabs");
						// for (i = 0; i < tabsCount; i++) {
						// 	if (debug) console.log("Rem TabId: "+i);
						// 	currentTab = {};
						// 	if (tabs[i].id !== ativeTabId) {
						// 		currentTab.url = tabs[i].url;
						// 		createProperties.push(currentTab);
						// 	}
						// 	browser.tabs.remove(tabs[i].id);
						// }
						// if (debug) console.log("Recreating other tabs");
						// for (j = 0; j < tabsCount; j++) {
						// 	if (debug) console.log(JSON.stringify(createProperties[j]));
						// 	createProperties[j].active = false;
						// 	try {
						// 		browser.tabs.create(createProperties[j]);
						// 	}
						// 	catch(err) {;}
						// }
						//browser.tabs.get(0).active = true;
					//});
			//}
	  } else {
		if (debug) console.log("goHome Url Def "+homeURL);
		    browser.tabs.update({url: homeURL});
	  }
}

function onError(error) {
	if (debug) console.log(`Error: ${error}`);
}

function onGot(item, activeTab) {
	var url = "";
	if (item.url) {
		url = item.url;
	}
	if (debug) console.log("onGotHome "+url);
	if (debug) console.log("ActiveTab "+activeTab.url);

	homeURL = url;
	goHome(homeURL, activeTab);
}