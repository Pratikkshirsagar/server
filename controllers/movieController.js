const Movie = require('../model/Movie')

exports.getMovies = async (req,res) => {
  try {
    const movies = await Movie.find(req.query)
    res.status(200).json({success: true, count:movies.length , data: movies})  
  } catch (err) {
    console.log(err)
  }
}