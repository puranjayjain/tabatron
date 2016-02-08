/**
* @author puranjay.jain@st.niituniversity.in (Puranjay Jain)
*/
//storage handler functions for tabatron
//store data locally using the storage api, for more information go to https://developer.chrome.com/extensions/storage
//key and value are key value pair in a local storage
function storeStorage(key, value, callback) {
    if (key && value) {
        chrome.storage.local.set({key: value}, callback);
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
//session map manager for (mode)
//Sm - Session map
//SSm - Saved Session Map
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
        console.log(bytesInUse);
        if (bytesInUse) {
            retrieveStorage(this.hashToday, this.retrieveSession.bind(this));
        }
        else {
            //initiate the storage with the current value at index
            var initHash = [this.hashToday];
            storeStorage(this.mode, initHash, handleStorageEOrS);
        }
    };
    this.retrieveSession = function (items) {
        var data = [];
        //sort according to the mode
        if (this.mode === 'Sm') {
            data = this.Sm;
        }
        else if (this.mode === 'SSm') {
            data = this.SSm;
        }
        //push new hash into it
        data.push(this.hashToday);
        //store it back into the database
        storeStorage(this.mode, data, handleStorageEOrS);
    };
}
