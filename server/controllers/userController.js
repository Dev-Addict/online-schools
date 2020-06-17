const sharp = require('sharp');

const factory = require('../handlers/factoryHandler');
const User = require('../models/User');
const catchRequest = require('../utils/catchRequest');

exports.getUsers = factory.getAll(User);

exports.createUser = factory.createOne(User);

exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.saveAvatarImage = catchRequest(
    async (req, res, next) => {
        if (req.file) {
            const ext = req.file.mimetype.split('/')[1];
            req.file.filename = `user-avatar-${req.user.id}-${Date.now()}.${ext}`;
            req.body.avatar = req.file.filename;
            await sharp(req.file.buffer)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`uploads/avatars/${req.file.filename}`);
        }
    }
);