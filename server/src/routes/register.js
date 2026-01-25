import express from 'express';
import User from '../models/userSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email_id, college_name, password } = req.body;
  if (!name || !email_id || !password) {
    return res.status(409).json({
      error: 'Bad Request: Please enter all the required data.',
    });
  }
  const domain = email_id.substring(email_id.lastIndexOf('@') + 1);
  if (domain !== 'nitrkl.ac.in') {
    return res.status(400).json({
      error: "Bad Request: Only NITR institutional mail ID is allowed.",
    });
  }

  try {
    const userLogin = await User.findOne({ email_id });
    if (userLogin)
      return res.status(403).json({
        error: '{Forbidden to create multiple accounts} Email already exists',
      });

    const user = new User({ name, email_id, college_name, password });
    await user.save();
    res.status(201).json({ message: 'Registered sucessfully' });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'We are experiencing some server Issues!!' });
  }
});

export default router;
