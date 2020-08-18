const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const startupSchema = new Schema({
    startupName: {
        type: String,
        required: true,
        trim: true,
    },
    stage: {
        type: String,
        required: true,
        trim: true
    },
    website_address: String,
    category: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    total_amount: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0) {
                throw new Error('Amount should not be in negative number');
            }
        }
    },
    raised: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0) {
                throw new Error('Please enter a valid amount.')
            }
        }
    },
    per_investor: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0) {
                throw new Error('Please enter a valid amount.')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    startup_summary: {
        type: String,
        required: true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;