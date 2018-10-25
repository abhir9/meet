const Poll = require('../../../models/poll.js')

const handleGetPolls = (req, res) => {
  Poll
    .find()
    .sort({ 'pollInfo.totalVotes': -1 })
    .limit(6)
    .then((info) => {
      res.status(200).send(info)
    })
    .catch((err) => {
      console.error('poll find error', err)
      res.status(500).send(`FAIL to find most voted polls`)
    })
}

module.exports = handleGetPolls
