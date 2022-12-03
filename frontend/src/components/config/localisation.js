//define alerts and other strings that are not survey related but are needed for localisatin 


export const ADD_NODES_SCREEN_TITLE = "Please add the people as nodes!"
//displayed on the "add nodes" screen where the user enters the participants names. Do not touch code inside ${}
export const NUM_OF_NODES_OUTSIDE_BOUNDS = (min, max) => {return `This survey requires at least ${min} and at most ${max} participants.`}
//displayed when the user tries to go back one question, but it is the first question, hence it is forbidden
export const CANT_GO_BACK_ALERT = "This is the first question, you can't go back."

export const FAILED_TO_SAVE_SURVEY_ALERT = "Something went wrong while saving"


//BUTTONS 
export const NEXT_BUTTON_TEXT = "Next"
export const PREV_BUTTON_TEXT = "Prev"
export const ADD_PERSON_BUTTON_TEXT = "Add Person"
export const TOGGLE_THEME_TEXT = "Toggle Theme"