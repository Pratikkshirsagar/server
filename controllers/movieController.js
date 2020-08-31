const Movie = require('../model/Movie')

exports.getMovies = async (req,res) => {
  try {
    const movies = await Movie.find(req.query)
    res.status(200).json({success: true, count:movies.length , data: movies})  
  } catch (err) {
    res.status(400).json({ status: 'fail', msg: err });
  }
}