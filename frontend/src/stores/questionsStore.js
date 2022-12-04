// constructor = load questions from config 
// loadnextquestion()
// loadPrevious()
import getQuestions from '../components/config/questions'
import { Question } from '../components/models/question';  
import { makeAutoObservable, runInAction } from 'mobx';

const conf = getQuestions()

 class SurveyStore {
    questionConfig = conf
    allQuestions = this.questionConfig[1].map(q => new Question(q))
    currentQNumber = 0
    // currentQuestion = this.allQuestions[this.currentQNumber]
    surveyLowerBound = this.questionConfig[0].lowerBoundNodes
    surveyUpperBound = this.questionConfig[0].upperBoundNodes
    surveyId = this.questionConfig[0].surveyId

constructor(myQuestionConfig){
    this.questionConfig = myQuestionConfig
    makeAutoObservable(this);

}
//if within bounds loads the next questions, otherwise gives back control to the caller via callback 
    loadNextQuestion = (OutOfBound_callback) => {
        if(this.currentQNumber < this.allQuestions.length-1){
            this.currentQNumber = this.currentQNumber + 1 
        }
        else {
            OutOfBound_callback()
        }
    }
    loadPrevQuestion = (OutOfBound_callback) => {
        if(this.currentQNumber > 0){
            this.currentQNumber = this.currentQNumber - 1 
        }
        else {
            OutOfBound_callback()
        }
    }
    get currentQuestion() { return this.allQuestions[this.currentQNumber] }
    get QID() {return this.currentQuestion.id}
    get QText() {return this.currentQuestion.text}
    get QType() {return this.currentQuestion.type}
    get QName() {return this.currentQuestion.name}
    get QBoxes() {
        return this.currentQuestion.boxes ? this.currentQuestion.boxes : []
      }

    get QfilterYou() {
        console.log("REQ FILTERYOU : " + this.currentQuestion.filterYou)
        return this.currentQuestion.filterYou}
    //  init = () => {
    
// //     this.allQuestions  = getQuestions()
// //     this.currentQuestion = this.allQuestions[this.currentQNumber].map(q => new Question(q))
// // const surveyId = myquestionsvar[0].surveyId
// // const upperBound = myquestionsvar[0].upperBoundNodes
// // const lowerBound = myquestionsvar[0].lowerBoundNodes

// }

}
export const survey = new SurveyStore(conf)