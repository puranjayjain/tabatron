/**
* @author puranjay.jain@st.niituniversity.in (Puranjay Jain)
*/
//this guy runs for the life of an extension
chrome.runtime.onInstalled.addListener(function (details) {
    // console.log('previousVersion', details.previousVersion);
});
chrome.runtime.onStartup.addListener(function () {
});
//on extension loaded on each new instance of the extension
(function init() {
    //NOTE start by creating a new hash for the day according to UTC!
    globals.generateHashToday(new Date().getTime());
    //initiate session map
    sessionMapManager.hashToday = globals.hashToday;
    sessionMapManager.mode = 'Sm';
    sessionMapManager.initSessionExists();
    //initiate session
    var sessionT = new sessionDataManager();
    sessionT.mode = 'Sd-' + globals.hashToday;
    sessionT.createNewSession();
})();

//on each sucessful page loading
chrome.webNavigation.onCommitted.addListener(function(data) {
    //NOTE if an actual page is opened
    if (data.frameId === 0) {
        chrome.tabs.get(data.tabId, function (tabData){
            if (!chrome.runtime.lastError) {
                if (!tabData.url.match(/chrome:\/\//g)) {
                    console.log(data);
                    console.log(tabData);
                }
            }
        });
        //     var url = data.url || data.status || '';
        //     if (url == 'loading') {
        //         console.log('I have to be ignored');
        //     }
        //     console.log(data);
        //     //     //get all windows
        //     //     chrome.windows.getAll(function (windows) {
        //     //         console.log(windows);
        //     //     });
        //     //get all tabs
        //     // if (data.transitionType === 'typed') {
        //     //     console.log('yo just typed it');
        //     // }
        //     // console.log(chrome.sessions.Session());
    }

    //     if (typeof data){
    //         var navData = (chrome.i18n.getMessage('inHandler'), this, data);
    //         console.log();
    //     }
    //     else{
    //         console.error(chrome.i18n.getMessage('inHandlerError'), this);
    //     }
});

//on each successfull redirect of instant page loading
chrome.webNavigation.onTabReplaced.addListener(function(details) {
    //TODO take note of the replaced tab id as well
    chrome.tabs.get(details.tabId, function (tabData){
        if (!chrome.runtime.lastError) {
            if (!tabData.url.match(/chrome:\/\//g)) {
                console.log(tabData);
            }
        }
    });
});

//on error occuring during tab opening
chrome.webNavigation.onErrorOccurred.addListener(function (details) {
    console.log(details);
});

// chrome.browserAction.setBadgeText({text: '2'});
// chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
//     console.log(details);
// });

// var nav = new NavigationCollector();
// chrome.webNavigation['onBeforeNavigate'].addListener(function(data) {
//     if (typeof data){
//         var navData = (chrome.i18n.getMessage('inHandler'), this, data);
//         console.log();
//     }
//     else{
//         console.error(chrome.i18n.getMessage('inHandlerError'), this);
//     }
// });
//
// var eventList = ['onBeforeNavigate', 'onCreatedNavigationTarget',
//     'onCommitted', 'onCompleted', 'onDOMContentLoaded',
//     'onErrorOccurred', 'onReferenceFragmentUpdated', 'onTabReplaced',
//     'onHistoryStateUpdated'];
//
// eventList.forEach(function(e) {
//   chrome.webNavigation[e].addListener(function(data) {
//     if (typeof data)
//       console.log(chrome.i18n.getMessage('inHandler'), e, data);
//     else
//       console.error(chrome.i18n.getMessage('inHandlerError'), e);
//   });
// });
