const Poll = require('../../../models/poll.js')
const User = require('../../../models/user.js')

const handleDeletePoll = (req, res) => {
  const {id} = req.params

  User
      .update({}, {$pull: {ownedPolls: {uid: id}}}, {multi: true})
      .then((info) => res.status(200).send('delete reference from user confirmation', info))
      .catch(() => res.status(500).send('FAIL poll was NOT removed from owner user reference'))

  Poll
      .findByIdAndRemove(id)
      .then(() => res.status(200))
      .catch(() => res.status(500).send(`FAIL!! Poll w/ id ${id} was NOT removed`))
}

module.exports = handleDeletePoll
