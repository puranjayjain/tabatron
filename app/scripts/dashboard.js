//zepto code
Zepto(function ($) {
  (
    //trigger event on page load
    function init() {
      //trigger hash change event
      onHashChange();
    }
  )();

  //on url hashchange
  window.onhashchange = function(event) {
    //trigger hash change event
    onHashChange(event);
  }

  //page navigation handler
  function onHashChange(event) {
    var defaultUrl = 'Settings';//TODO change it to #Now
    var oldUrl = defaultUrl;
    var newUrl = location.hash.replace('#','') || defaultUrl;
    //if there is an event change
    if (event) {
      oldUrl = event.oldURL.match(/#.*$/ig)[0].replace('#','');
      newUrl = event.newURL.match(/#.*$/ig)[0].replace('#','');
    }
    //set the loaded title
    document.getElementById('pageTitle').innerHTML = newUrl;
    //remove old url class
    document.querySelector('[href="#' + oldUrl + '"]').classList.remove('mdl-navigation__link--current');
    //add new url class
    document.querySelector('[href="#' + newUrl + '"]').classList.add('mdl-navigation__link--current');
    //page container
    var pageContainer = document.getElementById('pageContainer');
    //TODO fade out the page container
    //reset classes for animation
    pageContainer.classList.remove('fadeInUp');
    //fab hide logic
    setTimeout(function () {
      tbt_fab.hide();
    } ,10);
    //set fetch url
    var fetchUrl = newUrl + '.html';
    fetchHtml(fetchUrl, function (html) {
      //set the loaded html
      pageContainer.innerHTML = html;
      //upgrade them using mdl specs
      componentHandler.upgradeDom();
      //TODO do this after the page has drawn
      setTimeout(function () {
        //fade in the page
        pageContainer.classList.add('fadeInUp');
        //fab show logic
        tbt_fab.show(newUrl);
      } ,10);
    });
  }

  function fetchHtml(url, callback) {
    //create a new xhr request
    var XHRt = new XMLHttpRequest; // new ajax
    XHRt.addEventListener('load', callback(XHRt));//.
    XHRt.responseType='document';
    XHRt.open("POST", 'views/' + url, true);
    XHRt.send();
    XHRt.onreadystatechange = function(){
      if(XHRt.readyState == 4){
        if(XHRt.status == 200) {
          callback(XHRt.response.body.innerHTML);
        }
        else
        {
          //error
        }
      }
    }
  }

  //singleton containing fab -> view relation
  var tbt_fab = new function () {
    var $fab = $('#tbt-fab__main');
    this.relation = {
      Now: {
        state: true,
        icon: 'icon-add',
        action: 'New Tab'
      },
      History: {
        state: true,
        icon: 'icon-add',
        action: 'New Tab'
      },
      Saved: {
        state: false
      },
      Settings: {
        state: false
      },
      Help: {
        state: false
      },
      About: {
        state: false
      }
    };
    this.hide = function () {
      $fab.removeClass('zoomIn animated-delay')
      .addClass('zoomOut');
    };
    this.show = function (view) {
      //current relation
      var cRelation = this.relation[view];
      if (cRelation.state) {
        $fab.children('.material-icons').addClass(cRelation.icon);
        $fab.attr('data-action', cRelation.action);
        $fab.removeClass('zoomOut')
        .addClass('zoomIn animated-delay');
      }
    };
  }

  //bind events for tabatron tables
  function bindTableEvents() {
    
  }
});
