const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const persianRex = require('persian-rex');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, '0xE00000'],
        validation: {
            validator: value => value.split(' ').every(word => persianRex.letter.test(word)),
            message: '0xE00001'
        }
    },
    lastName: {
        type: String,
        required: [true, '0xE00002'],
        validation: {
            validator: value => value.split(' ').every(word => persianRex.letter.test(word)),
            message: '0xE00003'
        }
    },
    username: {
        type: String,
        required: [true, '0xE00004'],
        validation: {
            validator: value => /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(value),
            message: '0xE00005'
        }
    },
    usernameSlug: {
        type: String,
        unique: [true, '0xE00006'],
        select: false
    },
    avatar: {
        type: String,
        default: 'default.jpg'
    },
    email: {
        type: String,
        required: [true, '0xE00007'],
        validate: {
            validator: value => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value),
            message: '0xE00008'
        },
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, '0xE00009'],
        validate: {
            validator: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/.test(value),
            message: '0xE0000A'
        },
        select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: Date,
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    rote: {
        type: String,
        enum: {
            values: ['admin', 'manager', 'content-creator', 'student'],
            message: '0xE0000B'
        },
        default: 'student'
    },
    verifyEmailToken: {
        type: String,
        select: false
    },
    verifyEmailExpires: Date
});

userSchema.methods.createResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(64).toString('hex');
    this.passwordResetToken =
        crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
    this.VerifyEmailExpires = Date.now() + 600000;
    return resetToken;
};

userSchema.methods.createVerifyEmailToken = function() {
    const verifyToken = crypto.randomBytes(64).toString('hex');
    this.verifyEmailToken =
        crypto
            .createHash('sha256')
            .update(verifyToken)
            .digest('hex');
    this.verifyEmailExpires = Date.now() + 600000;
    return verifyToken;
};

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.isPasswordChanged = function(JWTTimeStamp) {
    if (this.passwordChangedAt) {
        if (this.passwordChangedAt.getTime() / 1000 > JWTTimeStamp) {
            return true;
        }
    }
    return false;
};

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.pre('save', function (next) {
    this.usernameSlug = (this.username || '').toLowerCase();
    next();
});

userSchema.pre('save', function(next) {
    if (this.isModified('password') && !this.isNew) {
        this.passwordChangedAt = Date.now() - 1000;
        this.passwordResetToken = undefined;
        this.passwordResetExpires = undefined;
    }
    next();
});

userSchema.pre('save', function (next) {
    if (this.isModified('isEmailVerified') && !this.isNew) {
        this.verifyEmailToken = undefined;
        this.VerifyEmailExpires = undefined;
    }
    next();
});

userSchema.pre('save', function (next) {
    if (this.rote === 'admin' && this.isNew) {
        this.rote = 'student';
    }
    next();
});

userSchema.pre('findOneAndUpdate', function(next) {
    if (this._update && this._update.username) {
        this._update.usernameSlug = this._update.username.toLowerCase();
    }
    if (this._update.rote === 'admin') {
        this._update.rote = 'student';
    }
    next()
});

userSchema.pre('findOneAndUpdate', async function(next) {
    if (this._update.password) {
        this._update.password = await bcrypt.hash(this._update.password, 12);
    }
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;