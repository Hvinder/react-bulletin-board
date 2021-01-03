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
      req
        .status(400)
        .send({ message: 'Something went wrong while fetching your profile' });
    } else {
      if (data && data.email) {
        res.send({ message: 'User logged in!', notes: data.notes });
      } else {
        newUser = new Users({ email });
        newUser.save((err) => {
          if (err) {
            req.status(400).send({ message: 'Unable to add user!' });
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
      let existingNote = notes.findIndex((noteItem) => noteItem.id === note.id);
      if (existingNote === -1) {
        notes.push(note);
      } else {
        notes[existingNote] = note;
      }
      // Remove null, maybe?
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
