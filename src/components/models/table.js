//Table tuples are [questionId, nodeName, status]
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

  toggleRelation = (questionId, nodeName) => {
    this.matrix = this.matrix.map(x => {
      if(x[0] === questionId && x[1] === nodeName){
        return [questionId, nodeName, !x[2]]
      }
      else{
        return x
      }
    })
    return this
  }

  deleteRelation = (questionId, nodeName) => {
    this.matrix = this.matrix.filter(x => x[0] !== questionId || x[1] !== nodeName)
  }

  getRelation = (questionId, nodeName) => {
    return this.matrix.filter(x => x[0] === questionId && x[1] === nodeName)
  }

  getAnswers = (questionId) => {
    return this.matrix.filter(x => x[0] === questionId)
  }

  getAll = () => {
    return this.matrix
  }
}