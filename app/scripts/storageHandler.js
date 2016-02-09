/**
* @author puranjay.jain@st.niituniversity.in (Puranjay Jain)
* Data is stored in this manner : tab -> session -> sessionMap
*/
//storage handler functions for tabatron
//store data locally using the storage api, for more information go to https://developer.chrome.com/extensions/storage
//key and value are key value pair in a local storage
function storeStorage(key, value, callback) {
    var storeData = {};
    if (key && value) {
        storeData[key] = value;
        chrome.storage.local.set(storeData , callback);
    }
}
//retrieve from the local storage
function retrieveStorage(key, callback) {
    if (key) {
        chrome.storage.local.get(key, callback);
    }
}
//check what is stored, callback returns 0 if nothing
function checkStorage(key, callback) {
    if (key) {
        chrome.storage.local.getBytesInUse(key, callback);
    }
}
//handle storage errors or success
function handleStorageEOrS() {
    //TODO do an action based on callback of storage set as defined in storeStorage(...)
}
/*
The session map manager for storing session maps
NOTE the following modes are supported
Sm - Session map
SSm - Saved Session Map
*/
var sessionMapManager = new function() {
    this.mode = 'Sm';
    this.hashToday = globals.hashToday;
    //all functions inside are in order
    this.initSessionExists = function () {
        //trigger session map existance
        checkStorage(this.mode, this.tallyInitSessionExists.bind(this));
    };
    this.tallyInitSessionExists = function (bytesInUse) {
        //tally the results of initSessionExists
        //if NOT (0 or undefined) add to it
        if (bytesInUse) {
            retrieveStorage(this.mode, this.retrieveSession.bind(this));
        }
        else {
            //initiate the storage with the current value at index
            var initHash = [this.hashToday];
            storeStorage(this.mode, initHash, handleStorageEOrS);
        }
    };
    this.retrieveSession = function (items) {
        var data = items[this.mode];
        //push new hash into it at the start of array
        data.unshift(this.hashToday);
        //store it back into the database
        storeStorage(this.mode, data, handleStorageEOrS);
    };
}
/*
The session data manager for storing session maps
NOTE the following modes are supported
Sd - Session
SSd - Saved Session Data
*/
function sessionDataManager() {
    this.mode = 'Sd-' + globals.hashToday;
    //all functions inside are in order
    this.getSession = function (callback) {
        //return session to callback if it exists
        checkStorage(this.mode, callback);
    };
    this.createNewSession = function () {
        //create an empty session
        var data = [];
        storeStorage(this.mode, data, handleStorageEOrS);
    };
}
/*
A tab data object
NOTE: The key and what that key means
n - tab id
i - index of tab in the window starting from 0 being he first
w - window id
u - url of the tab
d - description of the website
a - action which led to this tab
t - timestamp of the occurance of this event
f - url of favicon of the website
s - screenshot of the website
*/
var TabData = {
    n: 0,
    i:0,
    w:0,
    u:'',
    d:'',
    a:'',
    t:'',
    f:'',
    s:''
};
/*
The tab data manager for storing tabs
NOTE the following modes are supported
T - Tabs
ST - Saved Tabs
----------------------------------------
Tabs are stored as T-hashToday-tabId
*/
function tabDataManager(Tab) {
    this.mode = 'T' + globals.hashToday + '-0';
    this.tabData = Tab || new TabData();
    //check if a tab exists
    this.getTabData = function (callback) {
        retrieveStorage(this.mode, callback);
    };
    //initiate tab creation
    this.initTab = function () {
        retrieveStorage(this.mode, this.tallyInitSessionExists.bind(this));
    };
    //do an action based on the response of tab init
    this.tallyInitTab = function (items) {
        //if tab does exist unshift data into it
        if (items) {
            var data = items[this.mode];
            //push new hash into it at the start of array
            data.unshift(this.tabData);
            //store it back into the database
            storeStorage(this.mode, data, handleStorageEOrS);
        }
        //if 0 means no tab exists by that name
        else {
            this.createTab();
        }
    }
    //create a new tab data
    this.createTab = function() {
        var data = [this.tabData];
        storeStorage(this.mode, data, handleStorageEOrS);
    };
}
