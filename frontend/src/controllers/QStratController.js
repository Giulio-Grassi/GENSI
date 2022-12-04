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
export const next = (superNext) => {
    console.log("called qstrat controller next")
    console.log(survey.QType)
    // console.log(superNext)
    survey.loadNextQuestion(superNext)
}
const displayCantGoBackAlert = () => {
    alert(CANT_GO_BACK_ALERT)
}
export const prev = (superNext) => {
    survey.loadPrevQuestion(displayCantGoBackAlert)

}




  export function dragNDropValidation(successCallback, table, nodes, superNext){
    let valid = true
    let i = 0
    while(valid && i < nodes.length){
      //table.getRelation(question.id, x.id)
    //   console.log(table.getRelation(survey.QID, nodes[i].getName())[0][2])
      if(table.getRelation(survey.QID, nodes[i].getName())[0][2] === false){
            console.log("HIT INVALID : " + nodes[i].getName())
            if(nodes[i].getName() == "You" && survey.QfilterYou){
                // console.log("SHOULD BE CALLED ONCE BC WE IGNORE ")
                // console.log("IGNORE" + nodes[i].getName() )
                //do nothing, because You should acc be false as it is not drawn on screen 
            }
            else {
                valid = false
                console.log("VALID IS FALSE" + nodes[i].getName() )
            }
        }
      i++
    }

    valid ? successCallback(superNext) : alert("Please put all the nodes in a box before changing page.")
  }

  export function mcqValidation(successCallback, table, nodes, superNext){
    let valid = true;
    if(table.getRelation(survey.getQId(), nodes[0].getName())[0][2] === false){
        valid = false
    }
    (valid)? successCallback(superNext) : alert("please select an option before proceeding")
  }
