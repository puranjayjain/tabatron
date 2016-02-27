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
      //create the session
      createSessionViews();
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
        action: 'new tab',
        title: 'Create a new tab'
      },
      History: {
        state: true,
        icon: 'icon-date_range',
        action: 'filter tabs',
        title: 'Filter or show for certain days'
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
        $fab.attr('title', cRelation.title);
        $fab.attr('data-action', cRelation.action);
        $fab.removeClass('zoomOut')
        .addClass('zoomIn animated-delay');
      }
    };
  }

  //singleton containing the timeline relation
  var tbt_timeline = new function () {
    //current dot number
    this.number = 0;
    //number of the current transition x
    this.translateX = 0;
    //the view box's width
    this.viewbox = 0;
    this.initView = function () {
      this.calcHr();
      $(window).on('resize', function() {
        tbt_timeline.calcHr();
      });
      //dots in nav
      $('.mdl-radio').on('click', function () {
        tbt_timeline.number = $(this).parents('li').index();
        $('.tbt-timeline__hr').css('width', $(this).position().left + 3);
        $('.tbt-timeline__section--active').removeClass('tbt-timeline__section--active');
        $('.tbt-timeline__view .tbt-timeline__section').eq(tbt_timeline.number).addClass('tbt-timeline__section--active');
      });
      //left
      $('.tbt-timeline__left').click(function () {
        if (tbt_timeline.translateX >= 0) {
          tbt_timeline.translateX -= 108;
          $('.tbt-timeline__dots').attr('style', 'transform: translate3d(-' + tbt_timeline.translateX + 'px,0,0)');
          setTimeout(function () {
            tbt_timeline.calcHr();
          }, 300);
        }
      });
      //right
      $('.tbt-timeline__right').click(function () {
        var outside = $('.tbt-timeline__dots li').last().offset().left - $(this).offset().left;
        if (outside > -1) {
          tbt_timeline.translateX += 108;
          $('.tbt-timeline__dots').attr('style', 'transform: translate3d(-' + tbt_timeline.translateX + 'px,0,0)');
          setTimeout(function () {
            tbt_timeline.calcHr();
          }, 300);
        }
      });
    };
    this.calcHr = function () {
      var $line = $('.tbt-timeline__nav .tbt-timeline__hr');
      var dotLeft = $('.tbt-timeline__dots li').eq(this.number).position().left;
      //if the dot is outside the view to the left
      if (dotLeft < 0) {
        $line.css('width', 0);
      }
      else {
        var $dot = $('.tbt-timeline__dots li').eq(this.number);
        $line.css('width', $dot.position().left + 54);
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
    //if the timeline exists init it's singleton
    if ($('.tbt-timeline__nav').length > 0) {
      tbt_timeline.initView();
    }
  }

  //create session views
  function createSessionViews() {
    //refer the view
    var $session__view = $('.tbt_sessions__view');
    //load the html template
    $session__view.load('/templates/templates.html .tbt-sessions__card', function(data, status, xhr){
      if (status === 'success') {
        //clone it once it is loaded
        var $session__card = $('.tbt_sessions__view .tbt-sessions__card').clone();
        //clear the session view once before setting it again
        $session__view.empty();
        //load the sessions
        chrome.runtime.sendMessage('sessions', function(response) {
          for (var i in response) {
            var m = moment.tz(parseInt(response[i]), moment.tz.guess());
            //new card
            var $session__newCard = $session__card.clone();
            console.log($session__newCard);
            //set the card data
            $session__newCard.find('.mdl-card__title-text').html(m.format('D MMM'));
            $session__newCard.find('.mdl-card__title-span').html(m.format('YYYY'));
            $session__newCard.find('.mdl-card__supporting-text b').html(m.format('h:m A'));
            $session__view.append($session__newCard);
          }
          //upgrade them using mdl specs
          componentHandler.upgradeDom();
        });
      }
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
