const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: {
        type: String,
        enum: ['weekly', 'monthly', 'quarterly', 'annual'],
        required: true
    },
    startDate: { type: Date, default: Date.now },
    nextDelivery: Date,
    deliveryAddress: { type: String, required: true },
    recipient: {
        name: String,
        phone: String,
        preferences: String
    },
    active: { type: Boolean, default: true },
    paymentMethod: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);