const Mongoose = require('mongoose');

const QuestionSchema = new Mongoose.Schema({
    surveyId: {
        type: String,
        required: true,
    },
    questionType: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    answer: {
        type: Object,
        required: true,
    }
}, {
    timestamps: true,
});

const Question = Mongoose.model("Question", QuestionSchema);

module.exports = Question;
