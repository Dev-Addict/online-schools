const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const uploadImage = require('../utils/uploadImage');

const router = express.Router();

router.route('/auth/checktoken').post(authController.protect, authController.isSignedIn);
router.route('/auth/signout').get(authController.logOut);
router.route('/auth/signin').post(authController.signIn);
router.route('/auth/signup').post(authController.signUp);
router.route('/auth/forgotpassword').post(authController.forgotPassword);
router.route('/auth/resetpassword/:resetToken').patch(authController.resetPassword);
router.route('/auth/verifyemail').post(authController.verifyEmailToken);
router.route('/auth/verifyemail/:verifyToken').patch(authController.verifyEmail);

router.route('/')
    .get(userController.getUsers)
    .post(authController.protect, authController.restrictTo('admin'), uploadImage.single('avatar'), userController.saveAvatarImage, userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(authController.protect, authController.restrictTo('admin', 'selfUser'), uploadImage.single('avatar'), userController.saveAvatarImage, userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;