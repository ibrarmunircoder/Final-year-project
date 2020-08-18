const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const investorSchema = new Schema({
    investorName: String,
    linkedInUrl: String,
    category: {
        type: String,
        required: true
    },
    city: String,
    country: String,
    Max_Investment: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0) {
                throw new Error('Please enter a valid amount.')
            }
        }
    },
    Min_Investment: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0) {
                throw new Error('Please enter a valid amount.')
            }
        }
    },
    Area_Of_Expertise: {
        type: String,
        required: true
    },
    email: String,
    professional_bg: {
        type: String,
        required: true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Investor', investorSchema);