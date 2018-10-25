const handleLogOut = (req, res, next) => {
  req.session = null;
  res.status(200).send({success: true});
}

module.exports = handleLogOut
