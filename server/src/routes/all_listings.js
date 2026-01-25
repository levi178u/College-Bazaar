import express from 'express';
import User from '../models/userSchema.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.find({}).select({ list: 1 });

    console.log(user);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'We are experiencing some server Issues!!' });
  }
});

export default router;
