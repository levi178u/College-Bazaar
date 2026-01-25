import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email_id, password } = req.body;

    if (!email_id || !password) {
      return res.status(400).json({ error: 'incomplete Data' });
    }
    const userLogin = await User.findOne({ email_id });

    if (userLogin) {
      const isMatched = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      res.cookie('jwtoken', token, {
        expires: new Date(Date.now() + 25892000000), 
        httpOnly: true,
      });
      console.log('login success');
      if (isMatched) res.status(200).json({ message: 'Login Successful' });
      else
        res
          .status(403)
          .json({ message: 'Access Denied : Invalid Credentials' });
    } else {

      res
        .status(400)
        .json({ message: 'Invalid Email ID. Pls register before signing in' });
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
