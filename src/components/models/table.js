//Table tuples are [questionId, nodeName, status]
export class Table {
  constructor() {
    this.matrix = [];
  }

  insertRelation = (questionId, nodeName, status) => {
    var exists = this.matrix.filter(x => {
      if(x[0] === questionId && x[1] === nodeName){
        return true
      }
      return false
    })

    if(exists){
      return this.updateRelation(questionId, nodeName, status)
    }
    else{
      this.matrix.push([questionId, nodeName, status])
      return this
    }
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

    return this
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