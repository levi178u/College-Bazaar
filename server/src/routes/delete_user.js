import express from 'express';
import User from '../models/userSchema.js';
import jwt_Authenticate from '../middlewares/jwt_authenticate.js';

const router = express.Router();

router.delete(
  '/',
  jwt_Authenticate,
  async (req, res) => {
    try {
      const _id = req.userID;
      const single_user = await User.findByIdAndDelete(_id);
      res.status(200).json({
        message: `Successfully removed ${single_user} from the database.`,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: 'We are experiencing some server problems!!' });
    }
  }
);

export default router;
