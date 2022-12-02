// constructor = load questions from config 
// loadnextquestion()
// loadPrevious()
import getQuestions from '../components/config/questions'
import { Question } from '../components/models/question';  
import { makeAutoObservable, runInAction } from 'mobx';


 class SurveyStore {
    questionConfig = getQuestions()
    allQuestions = this.questionConfig[1].map(q => new Question(q))
    currentQNumber = 0
    currentQuestion = this.allQuestions[this.currentQNumber]
    surveyLowerBound = questionConfig[0].lowerBoundNodes
    surveyUpperBound = questionConfig[0].upperBoundNodes

constructor(){
    makeAutoObservable(this);

}

    loadNextQuestion = () => {this.currentQNumber = this.currentQNumber + 1 }
    loadPrevQuestion = () => {this.currentQNumber = this.currentQNumber - 1 }
    getQId = () => {return this.currentQNumber.id}
    getQText = () => {return this.currentQNumber.text}
    getQType = () => {return this.currentQNumber.type}
    getQBoxes = () => {
        return this.currentQNumber.boxes ? this.currentQNumber.boxes : []
      }

    //  init = () => {
    
// //     this.allQuestions  = getQuestions()
// //     this.currentQuestion = this.allQuestions[this.currentQNumber].map(q => new Question(q))
// // const surveyId = myquestionsvar[0].surveyId
// // const upperBound = myquestionsvar[0].upperBoundNodes
// // const lowerBound = myquestionsvar[0].lowerBoundNodes

// }

}
export const survey = new SurveyStore()