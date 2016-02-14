//some templates that have to be added from generation
function generateCard(title, url) {
  var url = url || '';
  var title = title || '';
  var card = '<div class="demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--2-col zoomIn animated">' +
  '<div class="mdl-card__title" style="background-image: url();">' +
  '<h2 class="mdl-card__title-text">' +
  title +
  '</h2>' +
  '</div>' +
  '<div class="mdl-card__actions mdl-card--border">' +
  '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" target="_blank" href="' + url + '">' +
  'Visit Website' +
  '<img src="chrome://favicon/' + url + '">' +
  '</a></div></div>';
  return card;
}
//execute on document load
(function init() {
  //set text according using the i18n infrastructure
  document.getElementById('header-title').innerHTML = chrome.i18n.getMessage("newTabTitle");
  document.getElementById('tab-topsites-title').innerHTML = chrome.i18n.getMessage("newTab1");
  document.getElementById('tab-recentlyClosed-title').innerHTML = chrome.i18n.getMessage("newTab2");
  //add topSites with favicon and thumbs
  //TODO loop through this list
  var topSiteCards = [];
  chrome.topSites.get(function (MostVisitedURL) {
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
