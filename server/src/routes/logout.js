import express from 'express';
import jwt_Authenticate from '../middlewares/jwt_authenticate.js';

const router = express.Router();

router.get(
  '/',
  jwt_Authenticate,
  async (req, res) => {
    try {
      //  res.rootUser.tokens = res.rootUser.tokens.filter((currentElement)=>{
      //     return  currentElement.token!= req.token
      //   })

      req.rootUser.tokens = [];
      res.clearCookie('jwtoken');
      await req.rootUser.save();
      res.redirect('/home');
      console.log('logout succesful');
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: 'We are experiencing some server problems!!' });
    }
  }
);

export default router;
