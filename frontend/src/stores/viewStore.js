//size of svg 
//size of screen (px) 
//font size of title

import { makeAutoObservable, runInAction } from 'mobx';
import {survey} from "./questionsStore"

 class ViewStore {

    currentQNumber = 0
    surveyUpperBound = this.questionConfig[0].upperBoundNodes
    surveyId = this.questionConfig[0].surveyId

constructor(){
    makeAutoObservable(this);

}

    /**
     * from survey get length of string 
     * switch case and return grommet sizes 
     */


    //  "xxlarge" if more than 250 char 
    //  "xxxlarge" default
    get titleFontSize() { return this.allQuestions[this.currentQNumber] }


    get QID() {return this.currentQuestion.id}
    get QText() {return this.currentQuestion.text}
    get QType() {return this.currentQuestion.type}
    get QBoxes() {
        return this.currentQuestion.boxes ? this.currentQuestion.boxes : []
      }
}
export const view = new ViewStore()