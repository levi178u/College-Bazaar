import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('The API base endpint is working correctly');
});

export default router;
