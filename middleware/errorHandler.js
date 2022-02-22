const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.name === 'SequelizeValidationError') {
    const error = err.errors.map(el => el.message)
    res.status(400).json({ message: error })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: 'email must be unique!' })
  } else if (err.code === 400 || err.code === 401 || err.code === 403 || err.code === 404) {
    res.status(err.code).json({ message: err.message })
  }
  else {
    res.status(500).json({ message: 'internal error server' })
  }
}

module.exports = errorHandler