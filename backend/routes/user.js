const { Router } = require('express');
const { body } = require('express-validator');

const isAuth = require('../middlewares/is-auth');
const userController = require('../controllers/user');

const router = Router();
router.get('/user', isAuth, userController.getUserProfile);
router.put(
  '/user',
  [
    body('username')
      .trim()
      .isLength({ min: 5, max: 25 })
      .isAlphanumeric()
      .withMessage(
        'please enter a valid username between 5 and 25 characters with no spaces and only numbers and alphabetic characters'
      ),
    body('city')
      .trim()
      .isLength({ min: 3, max: 25 })
      .isAlphanumeric()
      .withMessage(
        'please enter a valid city between 3 and 25 characters with no spaces and only numbers and alphabetic characters'
      ),
    body('address')
      .trim()
      .isLength({ min: 3, max: 100 })
      .isString()
      .withMessage(
        'please enter a valid address that is a string between 3 and 100 characters'
      ),
    body('phone')
      .trim()
      .isNumeric()
      .isLength({ min: 10, max: 20 })
      .withMessage(
        'please enter a valid phone number that contain only numbers'
      ),
  ],
  isAuth,
  userController.editUserProfile
);
module.exports = router;
