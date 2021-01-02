const express = require('express');
const router = express.Router();
const Users = require('./models/users');

// Logger
router.use((req, res, next) => {
  console.log(`${req.method} request received`);
  next();
});

router.post('/user', (req, res) => {
  const email = req.body.email;
  Users.findOne({ email: email }, (err, data) => {
    if (err) {
      req.status(400).send({ message: 'error' });
    } else {
      if (data && data.email) {
        res.send({ message: 'User logged in!', notes: data.notes });
      } else {
        newUser = new Users({ email });
        newUser.save((err) => {
          if (err) {
            req.status(400).send({ message: 'error' });
          } else {
            res.send({ message: 'User added!', notes: [] });
          }
        });
      }
    }
  });
});

router.post('/note', (req, res) => {
  const userEmail = req.body.email;
  const note = req.body.note;
  Users.findOne({ email: userEmail }, (err, data) => {
    if (err) {
      res.status(404).send({ message: 'Invalid user!' });
    } else {
      const notes = data.notes;
      notes.push(note);
      Users.findOneAndUpdate({ _id: data._id }, data, null, (err) => {
        if (err) {
          res.status(400).send({ message: 'Unable to add note!' });
        } else {
          res.status(200).send({ message: 'Note added!' });
        }
      });
    }
  });
});

router.post('/allNotes', (req, res) => {
  const userEmail = req.body.email;
  Users.findOne({ email: userEmail }, (err, data) => {
    if (err) {
      res.status(404).send({ message: 'Invalid user' });
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = router;
