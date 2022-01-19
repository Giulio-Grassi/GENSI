const Mongoose = require('mongoose');

const SurveySchema = new Mongoose.Schema({
    surveyId: {
        type: String,
        required: true,
    },
    result: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true,
});

const Survey = Mongoose.model("Survey", SurveySchema);

module.exports = Survey;
