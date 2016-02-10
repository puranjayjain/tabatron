//some templates that have to be added from generation
function generateCard(title, url) {
  var url = url || '';
  var title = title || '';
  var card = '<div class="demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--2-col zoomIn animated">' +
  '<div class="mdl-card__title mdl-card--expand">' +
  '<h2 class="mdl-card__title-text">' +
  title +
  '</h2>' +
  '</div>' +
  '<div class="mdl-card__supporting-text">' +
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.' +
  '</div>' +
  '<div class="mdl-card__actions mdl-card--border">' +
  '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" target="_blank" href="' + url + '">' +
  'Visit Site<i class="icon-open_in_new"></i></a></div></div>';
  return card;
}
//execute on document load
(function init() {
  //set text according using the i18n infrastructure
  document.getElementById('header-title').innerHTML = chrome.i18n.getMessage("newTabTitle");
  document.getElementById('scroll-tab-1-title').innerHTML = chrome.i18n.getMessage("newTab1");
  document.getElementById('scroll-tab-2-title').innerHTML = chrome.i18n.getMessage("newTab2");
  //add topSites with favicon and thumbs
  //TODO loop through this list
  var topSiteCards = [];
  chrome.topSites.get(function (MostVisitedURL) {
    console.log(MostVisitedURL);
    //generate for 8 elements only
    for (var i = 0; i < 8; i++) {
      //add a new grid item for each 4 elements
      if (i === 0 || i === 4) {
        topSiteCards.push('<div class="mdl-grid">');
        topSiteCards.push(generateCard(MostVisitedURL[i].title, MostVisitedURL[i].url));
        topSiteCards.push('</div>');
      }
      else {
        topSiteCards.splice(topSiteCards.length - 2, 0, generateCard(MostVisitedURL[i].title, MostVisitedURL[i].url));
      }
    }
    //put it in the page
    document.getElementById('page-topsites').innerHTML = topSiteCards.join('');
  });
})();
