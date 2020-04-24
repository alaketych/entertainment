const cheerio = require('cheerio')
const request = require('request-promise');

const stadiumExplore = html => {
  let $ = cheerio.load(html)

  return request(html)
    .then(html => {
      return {
        name              : $('.infobox > caption',  html).text(),
        adress            : $('.infobox > tbody > tr > .label',  html).text(),
        owner             : $('.infobox > tbody > tr > .agent > a',  html).text(),
        // operator          : $('.infobox > tbody > tr:nth-child(11) > td .agent',      html).text(),
        // capacity          : $('.infobox > tbody > tr > .plainlist > ul > li:nth-child(1) > a',  html).text(),
        // opened            : $('.infobox > tbody > tr:nth-child(16) > td', html).text(),
        // architect         : $('.infobox > tbody > tr:nth-child(12) > td',     html).text(),
        // projectManger     : $('.infobox > tbody > tr:nth-child(13) > td > a', html).text(),
        // structuralEngineer: $('.infobox > tbody > tr:nth-child(14) > td > a', html).text(),
        // servicesEngineer  : $('.infobox > tbody > tr:nth-child(14) > td > a', html).text(),
      }
    }).catch(console.error)
}

module.exports = stadiumExplore