export class Question {
  constructor(id, text, type = "select") {
    this.id = id
    this.text = text;
    this.type = type
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
}