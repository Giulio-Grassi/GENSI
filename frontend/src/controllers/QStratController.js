/**
 * controller for the question strategy view
 */

//next 
//prev 
//superNext
//validator

//validatorStrategy (valid_callback, invalid_callback, validator) 

import {survey} from "../stores/questionsStore"
import {CANT_GO_BACK_ALERT} from "../components/config/localisation"


const save = () => {
    alert("placeholder, todo save to db")
}
export const next = () => {
    console.log("called qstrat controller next")
    console.log(survey.QType)
    survey.loadNextQuestion(save)
}
const displayCantGoBackAlert = () => {
    alert(CANT_GO_BACK_ALERT)
}
export const prev = () => {
    survey.loadPrevQuestion(displayCantGoBackAlert)

}




  export function dragNDropValidation(successCallback, table, nodes){
    let valid = true
    let i = 0
    while(valid && i < nodes.length){
      //table.getRelation(question.id, x.id)
      if(table.getRelation(survey.getQId(), nodes[i].getName())[0][2] === false){
        valid = false
      }
      i++
    }

    valid ? successCallback() : alert("Please put all the nodes in a box before changing page.")
  }

  export function mcqValidation(successCallback, table, nodes){
    let valid = true;
    if(table.getRelation(survey.getQId(), nodes[0].getName())[0][2] === false){
        valid = false
    }
    (valid)? successCallback() : alert("please select an option before proceeding")
  }
