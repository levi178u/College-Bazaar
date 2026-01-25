import express from 'express';
import jwt_Authenticate from '../middlewares/jwt_authenticate.js';

const router = express.Router();

router.get(
  '/',
  jwt_Authenticate,
  (req, res) => {
    res.status(200).send(req.rootUser);
  }
);

export default router;
