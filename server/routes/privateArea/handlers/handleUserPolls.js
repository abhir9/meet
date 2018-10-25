const Poll = require('../../../models/poll.js')

const getUserPolls = (req, res) => {
  const {id} = req.params

  Poll
      .find()
      .then(userPolls => {
        res.status(200).send(userPolls)
      })
      .catch(() => res.status(500).send(`FAIL to get poll owned by user w/ id ${id}`))
}

module.exports = getUserPolls
