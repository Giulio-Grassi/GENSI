const Mongoose = require('mongoose');

const TestSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Test = Mongoose.model("Test", TestSchema);

module.exports = Test;
