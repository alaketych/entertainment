const cheerio = require('cheerio')
const request = require('request-promise');

const playerExplore = html => {
  let $ = cheerio.load(html)

  return request(html)
    .then(html => {
      return {
        name        : $('.level-1 > li:nth-child(3)', html).text(),
        // height      : $('profile-box > half-column-left', html).text(),
        // weight      : $('profile-box > half-column-left',  html).text(),

        // position    : $('profile-box',  html).text(),
        // age         : $('profile-box',  html).text(),
         currentTeam : $('.main-container > .profile-box > .half-column-left > p > a',  html).text(),
        // preDraftTeam: $('profile-box',  html).text(),
        // nationality : $('profile-box',  html).text(),
      }
    }).catch(console.error)
}

module.exports = playerExplore