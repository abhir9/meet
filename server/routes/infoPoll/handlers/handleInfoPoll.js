const Poll = require('../../../models/poll.js')

const handleInfoPoll = (req, res) => {
  const {id} = req.params
  Poll
      .findById(id)
      .then(info => {
        res.status(200).send(info)
      })
      .catch(() => {
        res.status(500).send(`FAIL to find poll w/ ${id}`)
      })
}

module.exports = handleInfoPoll
