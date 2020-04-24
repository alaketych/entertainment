const fs = require('fs')
const cheerio = require('cheerio')
const request = require('request-promise')

const teamExplore = require('./model/team')
//const playerExplore = require('./model/player')
const stadiumExplore = require('./model/stadium')

const NBA         = 'https://www.nba.com/'
const baseURL     = 'https://en.wikipedia.org/'
const teamsURL    = 'wiki/National_Basketball_Association'
const statesURL   = 'wiki/List_of_states_and_territories_of_the_United_States'
const stadiumsURL = 'wiki/List_of_National_Basketball_Association_arenas'

//Parsing each US states
request(baseURL + statesURL)
.then(html => {
  let $ = cheerio.load(html)

  let states = []
  $('tbody').eq(0).find('tr').slice(2).each((i, el) => {
    let columns = $(el).find('td')

    if($(columns).length === 12) {
      states.push({
          name        : $(el).find('th').eq(0).text().trim(),
          capitalCity : $(columns).eq(1).text().trim(),
          largestCity : $(columns).eq(2).text().trim(),
          admission   : $(columns).eq(3).text().trim(),
          population  : $(columns).eq(4).text().trim()
      })
    }
    else{
      states.push({
          name        : $(el).find('th').eq(0).text().trim(),
          capitalCity : $(columns).eq(1).text().trim(),
          largestCity : $(columns).eq(1).text().trim(),
          admission   : $(columns).eq(2).text().trim(),
          population  : $(columns).eq(3).text().trim()
      })
    }
  })

  let data = JSON.stringify(states, null, 2)
  fs.writeFile('parsed-data/states.json', data, error => {
      if(error) {
          return console.log(error)
      }

      console.log(states.length + ' States have been saved into file.')
  })
}).catch(console.error)


//Parsing each NBA teams
request(baseURL + teamsURL)
  .then(html => {
    let $ = cheerio.load(html)

    const teamNBA = [];
    for (let i = 0; i < 30; i++) {
      teamNBA.push($('.wikitable tbody > tr > td > b > a', html)[i].attribs.href);
    }

    return Promise.all(
      teamNBA.map(url => {
        return teamExplore(baseURL + url)
      })
    )
  })
  .then(teams => {
    let data = JSON.stringify(teams, null, 2)

    fs.writeFile('parsed-data/teams.json', data, error => {
          if(error) {
              return console.log(error)
          }

          console.log(teams.length + ' NBA teams information have been saved into file.')
      })
  }).catch(console.error)

//Parsing NBA stadiums
request(baseURL + stadiumsURL)
  .then((html) => {
    let $ = cheerio.load(html)

    const stadiumsNBA = [];
    for (let i = 0 ; i <= 29; i++) {
      stadiumsNBA.push($(`.wikitable tbody > tr > td > b > a`, html)[i].attribs.href);
    }

     return Promise.all(
      stadiumsNBA.map(url => {
         return stadiumExplore(baseURL + url)
       })
     )

  }).then(stadiums => {
    let data = JSON.stringify(stadiums, null, 2)

    fs.writeFile('parsed-data/stadiums.json', data, error => {
          if(error) {
              return console.log(error)
          }

          console.log(stadiums.length + ' NBA stadiums information have been saved into file.')
      })
  }).catch(console.error)


//Parsing NBA players
request('https://basketball.realgm.com/nba/players')
  .then((html) => {
    let $ = cheerio.load(html)

    const playersNBA = [];

    for(let i = 0; i < 490; i++) {
      playersNBA.push({
        name        : $(`tbody > tr`).eq(i).find('td').eq(1).text(),
        position    : $(`tbody > tr`).eq(i).find('td').eq(2).text(),
        height      : $(`tbody > tr`).eq(i).find('td').eq(3).text(),
        weight      : $(`tbody > tr`).eq(i).find('td').eq(4).text(),
        age         : $(`tbody > tr`).eq(i).find('td').eq(5).text(),
        currentTeam : $(`tbody > tr`).eq(i).find('td').eq(6).text(),
        preDraftTeam: $(`tbody > tr`).eq(i).find('td').eq(8).text(),
        drafted     : $(`tbody > tr`).eq(i).find('td').eq(9).text(),
        nationality : $(`tbody > tr`).eq(i).find('td').eq(10).text(),
      })
    }

    let data = JSON.stringify(playersNBA, null, 2)

    fs.writeFile('parsed-data/players.json', data, error => {
      if(error) {
          return console.log(error)
      }

      console.log(playersNBA.length + ' NBA players information have been saved into file.')
    })
  }).catch(console.error)
