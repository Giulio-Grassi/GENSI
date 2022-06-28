import { makeAutoObservable } from "mobx"
import getQuestions from './components/config/questions';
import Question from  "./questionStore"
console.log(getQuestions)

const questionVar = getQuestions()
const questionArray = questionVar[1].map(q => new Question(q))
const surveyId = questionVar[0].surveyId
const upperBound = questionVar[0].upperBoundNodes
const lowerBound = questionVar[0].lowerBoundNodes

export class QuestionArray {
    surveyId
    upperBoundNodes
    lowerBoundNodes
    questionArray
    currentQuestionId
    numberOfQuestion 

    constructor(questionVar){
        makeAutoObservable(this)
        this.currentQuestionId = 1 
        this.surveyId = questionVar[0].surveyId
        this.upperBoundNodes = questionVar[0].upperBoundNodes
        this.lowerBoundNodes = questionVar[0].lowerBoundNodes
        this.numberOfQuestion = questionVar[1].length
        this.questionArray = questionVar[1].map(q => new Question(q))
    }

    incrementId = () => {
        this.currentQuestionId = this.currentQuestionId + 1 
        if (this.currentQuestionId == this.numberOfQuestion + 1) {
            this.currentQuestionId = 1
        }
    }

    decrementId = () => {
        this.currentQuestionId = this.currentQuestionId - 1
        if (this.currentQuestionId == 0) {
            this.currentQuestionId = 1 
        }

    }

    currentQuestion = () => {
        return this.questionArray[this.currentQuestionId]
    }

    prevQuestion = () => {
        this.decrementId()
        return this.questionArray[this.currentQuestionId]
    }

    nextQuestion = () => {
        this.incrementId()
        return this.questionArray[this.currentQuestionId]
    }
}

export const questionArrayMob = new QuestionArray(questionVar)
