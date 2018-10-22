const Poll = require('../../../models/poll.js')

const getUserPolls = (req, res) => {
  const { id } = req.params

  Poll
    .find()
    .then(userPolls => {
      res.json(userPolls)
    })
    .catch(() => res.send(`FAIL to get poll owned by user w/ id ${id}`))
}

module.exports = getUserPolls
