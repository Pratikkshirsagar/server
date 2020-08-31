const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const Movie = require('../model/Movie')

async function fetchData() {
 try {
   console.log('start')
  const url = `https://www.imdb.com/search/title/?groups=top_1000&sort=user_rating,desc&count=100&start=1&ref_=adv_nxt`

  const { data } = await axios.get(url)
  
  const dom = new JSDOM(data)

  const el = dom.window.document.querySelector(".lister-list").children
  


  for(let movie of el) {
    const data =  {}
    const htmlEL =  movie.children[2]

    if(htmlEL.children[0].children[1]){
      data.name = htmlEL.children[0].children[1].textContent
    }

    if(htmlEL.children[0].children[2]) {
      const yearEl = htmlEL.children[0].children[2].textContent.split('')
      yearEl.pop()
      yearEl.shift()
      data.year = yearEl.join('')
    }

    if(htmlEL.children[1].children[2]) {
      const mins = htmlEL.children[1].children[2].textContent.split(' ')[0]
      const intTime = parseInt(mins)
      if(intTime) {
        data.duration = intTime
      }
    }

    if(htmlEL.children[1].children[4]) {
      const genre = htmlEL.children[1].children[4].textContent.trim().split(' ')
      const filnterGenre =  genre.filter(el => {
        return el
      })

      data.genres = filnterGenre

    }

    if(htmlEL.children[2].children[0]) {
      const rating = htmlEL.children[2].children[0].textContent.trim()
      data.rating = rating
    }


    
    if(htmlEL.children[3]) {
      const summery = htmlEL.children[3].textContent.trim()
      data.summery = summery 
    }


    if(htmlEL.children[4]) {
      const linkHtml = htmlEL.children[4].querySelectorAll('a')
      const stars = []
      linkHtml.forEach((el,i ) => {
        if(i === 0) {
          data.director = el.textContent.trim()
        }else {
          stars.push(el.textContent.trim())
        }
      })

     data.stars = stars
    }
    
    
    await Movie.create(data)
    
  }
  console.log('Data save')
 } catch (err) {
   console.log(err)
 }
}


module.exports = fetchData