export class Table {
  constructor() {
    this.matrix = [];
  }

  insertRelation = (questionId, nodeName, status) => {
    this.matrix.push([questionId, nodeName, status])
  }

  updateRelation = (questionId, nodeName, status) => {
    this.matrix.map(x => {
      if(x[0] === questionId && x[1] === nodeName){
        return [questionId, nodeName, status]
      }
      else{
        return x
      }
    })
  }

  deleteRelation = (questionId, nodeName) => {
    this.matrix = this.matrix.filter(x => x[0] !== questionId || x[1] !== nodeName)
  }

  getAnswers = (questionId) => {
    return this.matrix.filter(x => x[0] === questionId)
  }

  getAll = () => {
    return this.matrix
  }
}