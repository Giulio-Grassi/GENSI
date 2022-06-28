import { makeAutoObservable } from "mobx"

const defaults = {
    id: "ERROR: ID NOT PROVIDED",
    text: "ERROR: TEXT NOT PROVIDED",
    type: "ERROR: QUESTION TYPE NOT PROVIDED",
    filterYou: false,
    options: []
}

export default class Question {

    constructor(QuestionJsonObject) {
        makeAutoObservable(this)
        this.id = QuestionJsonObject.id || defaults.id;
        this.text = QuestionJsonObject.text || defaults.text;
        this.type = QuestionJsonObject.type || defaults.type;
        this.filterYou = QuestionJsonObject.filterYou || defaults.filterYou;
        if (this.type === "dragndrop" || this.type === "ladder" || this.type === "mcq") {
            this.boxes = QuestionJsonObject.boxes || defaults.options
        }
        else if (!QuestionJsonObject.type) {
            this.type = "select"
        }
    }

    getId = () => {
        return this.id
    }

    getText = () => {
        return this.text
    }

    getType = () => {
        return this.type
    }

    //boxes
    /*
    [
      {
        id: "wealthier",
        colour: "#FFFFFF",
      }
    ]
    */
    getBoxes = () => {
        return this.boxes ? this.boxes : []
    }
}
