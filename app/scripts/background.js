/**
* @author puranjay.jain@st.niituniversity.in (Puranjay Jain)
*/
//this guy runs for the life of an extension
chrome.runtime.onInstalled.addListener(function (details) {
  // console.log('previousVersion', details.previousVersion);
});
//runs on chrome startup
chrome.runtime.onStartup.addListener(function () {
  //clean all unused storage of Sm after 3s
  setTimeout(function () {
    sessionMapManager.getAllSessions(function (sessionMapData) {
      if (sessionMapData) {
        var sessionMap = sessionMapData['Sm'];
        //last index of array
        var lastIndex = sessionMap.length - 1;
        // create a sessionT array
        var sessionsT = [sessionMap.length];
        // create a delete array from which sessions are to be deleted
        var sessionsD = [];
        //loop through the sessionMap
        sessionMap.forEach(function (element, index, array) {
          sessionsT[index] = new sessionDataManager();
          sessionsT[index].mode = 'Sd-' + element;
          sessionsT[index].getSession(function (sessionObject) {
            //NOTE ignore the today's session
            if ((sessionObject[Object.keys(sessionObject)[0]].length === 0) && (Object.keys(sessionObject)[0] != ('Sd-' + globals.hashToday))) {
              //push the last element of the string sd-*
              sessionsD.push(Object.keys(sessionObject)[0].split('-')[1]);
            }
            //if last element
            if (index === lastIndex) {
              //execute delete sessions
              sessionMapManager.deleteSessions(sessionsD);
            }
          });
        });
      }
    });
  }, 3000);
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

//on each page loading
chrome.webNavigation.onCommitted.addListener(function(data) {
  //NOTE if an actual page is opened
  if (data.frameId === 0) {
    chrome.tabs.get(data.tabId, function (Tab){
      if (!chrome.runtime.lastError) {
        if (!Tab.url.match(/^chrome/g)) {
          //create a tab object
          var tab_create = new TabData();
          tab_create.i = Tab.index;
          tab_create.w = Tab.windowId;
          tab_create.u = Tab.url;
          tab_create.d = Tab.title;
          tab_create.a = data.transitionType;
          tab_create.t = new Date().getTime();
          tab_create.p = Tab.pinned;
          //create a new tab manager
          var tab_manager = new tabDataManager(tab_create);
          tab_manager.mode = 'T-' + globals.hashToday + '-' + Tab.id;
          //store it using the tab manager
          tab_manager.initTab();
          //update the tab to session
          var sessionT = new sessionDataManager();
          sessionT.mode = 'Sd-' + globals.hashToday;
          sessionT.updateSession('T-' + globals.hashToday + '-' + Tab.id);
        }
      }
      else {
        //TODO handle errors gracefully
      }
    });
  }
});

//on each page loading completed
chrome.webNavigation.onCompleted.addListener(function(data) {
  //TODO the screenshot
  if (data.frameId === 0) {
    chrome.tabs.get(data.tabId, function (Tab){
      if (!chrome.runtime.lastError) {
        if (!Tab.url.match(/^chrome/g)) {
          //create a tab object
          var tab_create = new TabData();
          tab_create.i = Tab.index;
          tab_create.u = Tab.url;
          tab_create.f = Tab.favIconUrl;
          //create a new tab manager
          var tab_manager = new tabDataManager(tab_create);
          tab_manager.mode = 'T-' + globals.hashToday + '-' + Tab.id;
          //update a tab with the tab manager's data
          tab_manager.updateTab(tab_create, ['f']);
        }
      }
      else {
        //TODO handle errors gracefully
      }
    });
  }
});

//on each successfull redirect of instant page loading
chrome.webNavigation.onTabReplaced.addListener(function(details) {
  //TODO take screenshot of website
  chrome.tabs.get(details.tabId, function (Tab){
    if (!chrome.runtime.lastError) {
      if (!Tab.url.match(/chrome:\/\//g)) {
        //create a tab object
        var tab_create = new TabData();
        tab_create.i = Tab.index;
        tab_create.w = Tab.windowId;
        tab_create.u = Tab.url;
        tab_create.d = Tab.title;
        tab_create.a = data.transitionType;
        tab_create.t = new Date().getTime();
        tab_create.p = Tab.pinned;
        tab_create.f = Tab.favIconUrl;
        //create a new tab manager
        var tab_manager = new tabDataManager(tab_create);
        tab_manager.mode = 'T-' + globals.hashToday + '-' + Tab.id;
        //store it using the tab manager
        tab_manager.changeTabId(details.replacedTabId);
        //update the tab to session
        var sessionT = new sessionDataManager();
        sessionT.mode = 'Sd-' + globals.hashToday;
        sessionT.updateSession('T-' + globals.hashToday + '-' + Tab.id);
        //remove the old session
        sessionT.removeTabFromSession(details.replacedTabId);
      }
    }
    else {
      //TODO handle errors gracefully
    }
  });
});

//listen for active tab loaded to take a screengrab
//TODO change this code to match the sample code given on chrome extension website
//TODO prevent screengrab of the same site again and again
//TODO allow user to manage what all screenshots they do want
// chrome.tabs.onActivated.addListener(function (activeInfo) {
//   chrome.tabs.get(activeInfo.tabId, function (Tab){
//     if (!chrome.runtime.lastError) {
//       if ((!Tab.url.match(/chrome:\/\//g)) && Tab.status === 'complete' && Tab.active) {
//         //capture the screenshot the web page
//         chrome.tabs.captureVisibleTab("jpeg", 1, function (dataUrl) {
//           console.log(dataUrl);
//         });
//       }
//     }
//   });
// });

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
