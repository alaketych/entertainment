const cheerio = require('cheerio')
const request = require('request-promise');

const teamExplore = html => {
  let $ = cheerio.load(html)

  return request(html)
    .then(html => {
      return {
        name            : $('.infobox > tbody > tr:nth-child(1) > th > a',  html).text(),
        conference      : $('.infobox > tbody > tr:nth-child(4) > td > a',  html).text(),
        division        : $('.infobox > tbody > tr:nth-child(5) > td > a',  html).text(),
        founder         : $('.infobox > tbody > tr:nth-child(6) > td',      html).text(),
        arena           : $('.infobox > tbody > tr:nth-child(8) > td > a',  html).text(),
        mainSponsors    : $('.infobox > tbody > tr:nth-child(11) > td > a', html).text(),
        president       : $('.infobox > tbody > tr:nth-child(12) > td',     html).text(),
        generalManager  : $('.infobox > tbody > tr:nth-child(13) > td > a', html).text(),
        headCoach       : $('.infobox > tbody > tr:nth-child(14) > td > a', html).text(),
      }
    }).catch(console.error)
}

module.exports = teamExplore