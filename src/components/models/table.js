export class Table {
  constructor() {
    this.matrix = [];
  }

  insertRelation(questionId, nodeName, status){
    if(!this.matrix.filter(x => x[0] === questionId && x[1] === nodeName)){
      this.matrix.push([questionId, nodeName, status])
    }
  }

  deleteRelation(questionId, nodeName){
    this.matrix = this.matrix.filter(x => x[0] !== questionId || x[1] !== nodeName)
  }

  getAnswers(questionId){
    return this.matrix.filter(x => x[0] === questionId)
  }
}