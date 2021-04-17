const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionsSchema = new Schema({
    name:  {
        type: String,
        required: true
    },
    image:  {
        type: String,
        required: true
    },
    label:  {
        type: String,
        required: true,
        default: ''
    },
    price:  {
        type: Currency,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
    featured:  {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true
});

var Promos = mongoose.model('Promo', promotionsSchema);

module.exports = Promos;