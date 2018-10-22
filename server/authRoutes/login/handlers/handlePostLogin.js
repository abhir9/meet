const jwt = require('jsonwebtoken')

const handlePostLogin = (req, res) => {
  const SECRET = process.env.SECRET || 'SECRET'
  const { _id: id, email,role } = req.user
  const token = jwt.sign({ id, email,role }, SECRET)

  res.json({success: true, id: id, role:role,token: token})
}

module.exports = handlePostLogin
