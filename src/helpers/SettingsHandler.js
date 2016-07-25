// loads and stores all the settings i.e provides an interface to saved settings

// the settings loader helper
import Storage from '../helpers/Storage'

let stored = {
  theme: {}
}

export default class SettingsHandler {
  //  initiate all the settings here
  constructor() {
    // initiate all the settings from storage here in order of being displayed
    // NOTE - are lower camel cased e.g dark-theme becomes darkTheme
    // see https://en.wikipedia.org/wiki/CamelCase
    // theme settings
    stored.theme.darkTheme = new Storage('darkTheme', true)
  }

  /*
  * getters and setter are defined here
  */
  get stored() {
    return stored
  }

  set stored(value) {
    stored = value
  }

  // set a particular storage data
  setStored = (key, value) => {
    stored[key].data = value
  }
}
