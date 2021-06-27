export class Question {
  constructor(id, text, type = "select", boxes = []) {
    this.id = id
    this.text = text;
    this.type = type
    if(type === "dragndrop"){
      this.boxes = boxes
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