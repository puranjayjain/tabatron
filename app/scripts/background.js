/**
* @author puranjay.jain@st.niituniversity.in (Puranjay Jain)
*/
//this guy runs for the life of an extension
chrome.runtime.onInstalled.addListener(function (details) {
    // console.log('previousVersion', details.previousVersion);
});
//on each new instance of the extension
chrome.runtime.onStartup.addListener(function () {
    //NOTE start by creating a new hash for the day according to UTC!
    globals.generateHashToday(new Date().getTime());
    //initiate session and session map for the day
    sessionMapManager.hashToday = globals.hashToday;
    sessionMapManager.mode = 'Sm';
    sessionMapManager.initSessionExists();
});

//on each sucessful page loading
chrome.webNavigation.onCommitted.addListener(function(data) {
    //NOTE if an actual page is opened
    if (data.frameId === 0) {
        console.log(data);
        //     //get all windows
        //     chrome.windows.getAll(function (windows) {
        //         console.log(windows);
        //     });
        //get all tabs
        chrome.tabs.get(data.tabId, function (tabData){
            console.log(tabData);
        });
        if (data.transitionType === 'typed') {
            console.log('yo just typed it');
        }
        // console.log(chrome.sessions.Session());
    }

    //     if (typeof data){
    //         var navData = (chrome.i18n.getMessage('inHandler'), this, data);
    //         console.log();
    //     }
    //     else{
    //         console.error(chrome.i18n.getMessage('inHandlerError'), this);
    //     }
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
