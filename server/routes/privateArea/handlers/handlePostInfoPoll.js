const Poll = require('../../../models/poll.js')
const User = require('../../../models/user.js')
const checkAdmin = require('../../../middlewares/checkAdmin.js')

const handlePostInfoPoll = (req, res) => {
  const {question, userID} = req.body

  //checkAdmin(req.token);
  let duplicationChecking = 'none'
  let allowMoreThanOne = false

  if (req.body.duplicationChecking) duplicationChecking = req.body.duplicationChecking
  if (req.body.allowMoreThanOne) allowMoreThanOne = true

  const options = []

  for (let key in req.body) {
    if (/option/.test(key)) {
      options.push({option: req.body[key]})
    }
  }

  const customPoll = {
    question,
    options,
    config: {
      duplicationChecking,
      allowMoreThanOne
    }
  }

  const poll = new Poll(customPoll)

  const _id = poll._id

  poll.save()
      .then(() => {
        User.findByIdAndUpdate(userID, {$push: {ownedPolls: {uid: _id}}})
            .then((data) => {
              res.status(200).send({_id: _id});
            })
            .catch((err) => res.status(500).send(err, `FAIL to add the poll w/ id ${_id} to the user w/ id ${userID}`))
      })
      .catch(() => res.status(500).send(`FAIL to add poll w/ id ${_id}`))
}

module.exports = handlePostInfoPoll
