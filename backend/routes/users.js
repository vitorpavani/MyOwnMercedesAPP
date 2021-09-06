const express = require('express');
const router = express.Router();

const User = require('../models/user');

//GET all
router.get('/', async (req, res) => {
  try {
    return await User.findOne({}).then((found) => {
      found
        ? res.status(200).json(found)
        : res.status(404).json({ message: 'Users not found' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', errors: error });
  }
});

//GET by ID
router.get('/:id', async (req, res) => {
  try {
    return await User.findOne({ _id: req.params.id }).then((found) => {
      found
        ? res.status(200).json(found)
        : res.status(404).json({ message: 'User not found' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', errors: error });
  }
});

router.post('/', async (req, res) => {
  try {
    return await User.create(req.body).then((res) => {
      res.status(200).json(res);
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', errors: error });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    return await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    ).then((found) => {
      found
        ? res.status(200).json(found)
        : res.status(404).json({ message: 'User not found' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', errors: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    User.findByIdAndDelete(req.params.id).then((found) => {
      return found
        ? res.status(200).json({ message: 'User deleted' })
        : res.status(404).json({ message: 'User not found' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', errors: error });
  }
});

module.exports = router;
