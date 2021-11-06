const Mongoose = require('mongoose');

const TokyoSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Tokyo = Mongoose.model("Tokyo", TokyoSchema);

module.exports = Tokyo;
