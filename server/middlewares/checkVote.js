const Poll = require('../models/poll.js')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'SECRET'

const authorize = (token) => {
  return new Promise(function (fullfil, reject) {
    jwt.verify(token, SECRET, function (err, user) {
      if (err) {
        fullfil(false);
      } else {
        fullfil(user);
      }
    });
  });
}


const checkVote = (req, res, next) => {
  authorize(req.headers.authorization.split(' ')[1]).then((user) => {
    if (user) {
      const {pollId} = req.params
      Poll.find({_id: pollId}).then((poll) => {
        if (poll[0].userPolled.indexOf(user.id) > -1) {
          res.status(401).send({error: 'Already voted!'})
        }
        else
          Poll.update({_id: pollId}, {$push: {"userPolled": user.id}}).then(next())
      }).catch((err) => {
        res.status(500).send('something went wrong');
      });
    }
    else {
      res.status(500).send('No authentication token found')
    }
  }).catch((err) => {
    res.status(500).send('No authentication token found')
  });

}

module.exports = checkVote
