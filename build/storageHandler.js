/**
* @author puranjay.jain@st.niituniversity.in (Puranjay Jain)
* Data is stored in this manner : tab -> session -> sessionMap
*/
//storage handler functions for tabatron
//store data locally using the storage api, for more information go to https://developer.chrome.com/extensions/storage
//key and value are key value pair in a local storage
let storeStorage = (key, value, callback) => {
  callback = callback || handleStorageEOrS
  let storeData = {}
  if (key && value) {
    storeData[key] = value
    chrome.storage.local.set(storeData , callback)
  }
}

//retrieve from the local storage
let retrieveStorage = (key, callback) => {
  if (key) {
    chrome.storage.local.get(key, callback)
  }
}

//remove value from the local storage
let removeStorage = (key, callback) => {
  if (key) {
    chrome.storage.local.remove(key, callback)
  }
}

//check what is stored, callback returns 0 if nothing
let checkStorage = (key, callback) => {
  if (key) {
    chrome.storage.local.getBytesInUse(key, callback)
  }
}

//handle storage errors or success
let handleStorageEOrS = () => {
  //TODO do an action based on callback of storage set as defined in storeStorage(...) or handle error using chrome.runtime.lastError
}

/*
The session map manager for storing session maps
NOTE the following modes are supported
Sm - Session map
NOTE SSm has to be implemented seperately to prevent conflicts SSm - Saved Session Map
*/
const sessionMapManager = new function() {
  this.mode = 'Sm'
  this.hashToday = globals.hashToday
  //all functions inside are in order
  this.initSessionExists = () => {
    //trigger session map existance
    checkStorage(this.mode, this.tallyInitSessionExists.bind(this))
  }
  this.tallyInitSessionExists = (bytesInUse) => {
    //tally the results of initSessionExists
    //if NOT (0 or undefined) add to it
    if (bytesInUse) {
      retrieveStorage(this.mode, this.retrieveSession.bind(this))
    }
    else {
      //initiate the storage with the current value at index
      let initHash = [this.hashToday]
      storeStorage(this.mode, initHash)
    }
  }
  this.retrieveSession = (items) => {
    let data = items[this.mode]
    //push new hash into it at the start of array
    data.unshift(this.hashToday)
    //store it back into the database
    storeStorage(this.mode, data)
  }
  //some functions which are public functions
  //returns all sessions stored in the map
  this.getAllSessions = (callback) => {
    retrieveStorage('Sm', callback)
  }
  //deletes some sessions expects array of sessions
  this.deleteSessions = (sessions) => {
    this.getAllSessions((sessionMap) => {
      //get the inner data from it
      sessionMap = sessionMap['Sm']
      let lastIndex = sessions.length - 1
      sessions.forEach((element, index, array) => {
        //remove from the session map
        sessionMap.splice(sessionMap.indexOf(element),1)
        //remove from the storage
        removeStorage('Sd-' + element, handleStorageEOrS)
        //if last element
        if (index === lastIndex) {
          //execute update Sessions map
          storeStorage(sessionMapManager.mode, sessionMap)
        }
      })
    })
  }
}

/*
The session data manager for storing session maps
NOTE the following modes are supported
Sd - Session
SSd - Saved Session Data
*/
function sessionDataManager() {
  this.mode = 'Sd-' + globals.hashToday
  this.tabHash = ''
  this.oldTabHash = ''

  //all functions inside are in order
  this.getSession = (callback) => {
    //return session to callback if it exists
    retrieveStorage(this.mode, callback)
  }

  //create a new session for the page
  this.createNewSession = () => {
    //create an empty session
    storeStorage(this.mode, [])
  }

  //update an existing session with a tab or a new tab
  this.updateSession = (tabHash) => {
    this.tabHash = tabHash
    retrieveStorage(this.mode, this.tallyUpdateSession.bind(this))
  }

  this.tallyUpdateSession = (items) => {
    let data = items[this.mode]
    //if the tab doesn't exist in session
    if (data.indexOf(this.tabHash) == -1) {
      //push new hash into it at the start of array
      data.unshift(this.tabHash)
      //store it back into the database
      storeStorage(this.mode, data)
    }
  }

  //remove a tab from session
  this.removeTabFromSession = (oldId) => {
    this.oldTabHash = oldId
    this.getSession(this.tallyRemoveTabFromSession.bind(this))
  }

  //tally what to remove
  this.tallyRemoveTabFromSession = (items) => {
    let data = items[this.mode]
    data.splice(data.indexOf(this.oldTabHash), 1)
    storeStorage(this.mode, data)
  }
}

/*
A tab data object
NOTE: The key and what that key means
i - index of tab in the window starting from 0 being he first
w - window id
u - url of the tab
d - description of the website
a - action which led to this tab
t - timestamp of the occurance of this event
f - url of favicon of the website
s - screenshot of the website
p - pinned tab or not
*/
function TabData(i,w,u,d,a,t,f,s,p) {
  this.i = i || 0
  this.w = w || 0
  this.u = u || ''
  this.d = d || ''
  this.a = a || ''
  this.t = t || ''
  this.f = f || ''
  this.s = s || ''
  this.p = p || false
}

/*
The tab data manager for storing tabs
NOTE the following modes are supported
T - Tabs
ST - Saved Tabs
----------------------------------------
Tabs are stored as T-hashToday-tabId
*/
function tabDataManager(Tab) {
  //if tab exists only then declare a mode else dont
  this.mode = ''

  if (Tab) {
    this.mode = 'T-' + globals.hashToday + '-' + Tab.id
  }

  this.oldMode = ''
  this.tabData = Tab || new TabData()
  this.newTabData = Tab || new TabData()
  this.parameters = []

  //check if a tab exists
  this.getTabData = (callback) => {
    retrieveStorage(this.mode, callback)
  }

  //initiate tab creation
  this.initTab = () => retrieveStorage(this.mode, this.tallyInitTab.bind(this))
  //do an action based on the response of tab init
  this.tallyInitTab = (items) => {
    //if tab does exist unshift data into it
    if (!isEmpty(items)) {
      let data = items[this.mode]
      //push new hash into it at the start of array
      data.unshift(this.tabData)
      //store it back into the database
      storeStorage(this.mode, data)
    }
    //if 0 means no tab exists by that name
    else {
      this.createTab()
    }
  }
  //create a new tab data
  this.createTab = () => storeStorage(this.mode, [this.tabData])

  //replace an old tab id with a new one while adding a new data into it
  this.changeTabId = (oldId) => {
    this.oldMode = 'T-' + globals.hashToday + '-' + oldId
    retrieveStorage(this.oldMode, this.tallyChangeTabId.bind(this))
  }

  this.tallyChangeTabId = (items) => {
    //if the tab was created previously
    if (!isEmpty(items)) {
      let data = items[this.mode]
      //push new data into it
      data.unshift(this.tabData)
      //store data as a new tab id
      storeStorage(this.mode, data)
      //remove old tab id from storage as it has become obselete
      removeStorage(this.oldMode)
    }
    //if not created previously create a new tab
    else {
      this.createTab()
    }
  }

  //update tab data and flag to update certain parameters only
  //NOTE parameters are array values e.g ['p','u'] and are set according to TabData 's internal values
  this.updateTab = (newTabData, parameters) => {
    this.newTabData = newTabData
    this.parameters = parameters
    retrieveStorage(this.mode, this.tallyUpdateTab.bind(this))
  }

  this.tallyUpdateTab = (items) => {
    let data = items[this.mode]
    //loop through the tab data to find the particular instance of the data
    //loop from the back of the data to get the latest instance
    for (let i = data.length - 1; i >= 0; i--) {
      //find the instance using the url
      if (data[i].u === this.newTabData.u) {
        //update only those values whose parameters are set
        for (let j = 0; j < this.parameters.length; j++) {
          data[i][this.parameters[j]] = this.newTabData[this.parameters[j]]
        }
        //store it in the db
        storeStorage(this.mode, data)
        //end the loop the work is done
        break
      }
    }
  }
}
