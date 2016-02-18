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
      //create the table
      createTables();
      //bind table row events
      bindEvents();
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
        $fab.children('.material-icons')
        .removeClass()
        .addClass('material-icons ' + cRelation.icon);
        $fab.attr('data-action', cRelation.action);
        $fab.removeClass('zoomOut')
        .addClass('zoomIn animated-delay');
      }
    };
  }

  //bind all events
  function bindEvents() {
    //for tabatron table component
    bindTableEvents();
    //for timeline component
    bindTimeline();
  }

  //bind events for tabatron tables
  function bindTableEvents() {
    //remove table hover on mouseout
    $('.tbt-row').on('mouseleave blur', function () {
      $('.tbt-row').removeClass('tbt-row--hover');
    });
    //add table hover on mouse enter
    $('.tbt-row').on('mouseenter focus', function () {
      $('.tbt-row').removeClass('tbt-row--hover');
      var rowNumber = $(this).index();
      var $columns = $(this).parents('.tbt-body').children('.tbt-table__column');
      $columns.each(function(index){
        $(this).children('.tbt-row').eq(rowNumber).addClass('tbt-row--hover');
      });
    });
  }

  function bindTimeline() {
    //left
    $('.tbt-timeline__left').on('click', function () {
        $(this).next('.tbt-timeline__navInner')
        .children('.tbt-timeline__dots')
        .attr('style', 'transform: none');
    });
    //right
    $('.tbt-timeline__right').on('click', function () {
      $(this).prev('.tbt-timeline__navInner')
      .children('.tbt-timeline__dots')
      .attr('style', 'transform: translate3d(calc(-100% + 16px),0,0)');
    });
    //dots in nav
    $('.mdl-radio').on('click', function () {
      var $line = $(this).parents('.tbt-timeline__navInner')
      .children('.tbt-timeline__hr');
      $line.css('width', $(this).position().left + 3);
    });
  }

  //create now tables
  function createTables() {
    //TODO MAKE THIS FUNCTIONAL
    //NOTE it is just assigning the dummy favicons colours
    $('.tbt-nofavicon').each(function(index){
      $(this).css('background-color', randomColor({
        luminosity: 'light'}));
      });
    }
  });
