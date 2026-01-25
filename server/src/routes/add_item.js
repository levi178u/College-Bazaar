import express from 'express';
import User from '../models/userSchema.js';
import jwt_Authenticate from '../middlewares/jwt_authenticate.js';

const router = express.Router();

router.patch(
  '/',
  jwt_Authenticate,
  async (req, res) => {
    try {
      const {
        item_name,
        item_price,
        item_age,
        item_condition,
        item_image,
        item_tag,
        item_description,
      } = req.body;

      if (
        !item_name ||
        !item_price ||
        !item_age ||
        !item_condition ||
        !item_image ||
        !item_tag ||
        !item_description
      ) {
        return res.status(400).json({
          error: 'Bad Request: Please enter all the required data.',
        });
      }

      const validItemTags = [
        'Others',
        'Clothing_essentials',
        'Books',
        'Daily-use',
        'Sports',
        'Stationary',
      ];
      if (!validItemTags.includes(item_tag)) {
        return res.status(400).json({
          error: 'Bad Request: Invalid item tag.',
        });
      }

      const newItem = {
        item_name,
        item_price,
        item_age,
        item_condition,
        item_image,
        item_tag,
        item_description,
      };

      await User.findOneAndUpdate(
        {
          _id: req.userID,
        },
        {
          $addToSet: {
            list: newItem,
          },
        }
      );

      res
        .status(201)
        .json({ message: 'Listing successfully added on the website' });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: 'We are experiencing some server problems!!' });
    }
  }
);

export default router;
