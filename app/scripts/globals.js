/**
* @author puranjay.jain@st.niituniversity.in (Puranjay Jain)
*/
//global vars I just couldn't live without them anymore
var globals = new function () {
  this.hashId = new Hashids('tabatron');
  //if no hash was generated atleast we got default
  this.hashToday = 'default';
  this.generateHashToday = function (object) {
    this.hashToday = this.hashId.encode(object);
  };
}
//helper function to check if object is empty or not
function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
    return false;
  }
  return true;
}
