//Table tuples are [questionId, nodeName, status]
export class Table {
  constructor() {
    this.matrix = [];
  }

  insertRelation = (questionId, nodeName, status) => {
    this.matrix.push([questionId, nodeName, status])
    return this
  }

  updateRelation = (questionId, nodeName, status) => {
    this.matrix = this.matrix.map(x => {
      if(x[0] === questionId && x[1] === nodeName){
        return [questionId, nodeName, status]
      }
      else{
        return x
      }
    })

    return this
  }

  insertOrUpdateRelation = (questionId, nodeName, status) => {
    const existence = this.matrix.filter(x => {
      if(x[0] === questionId && x[1] === nodeName){
        return true
      }
      else{
        return false
      }
    })

    if(existence){
      if(!existence[0][2] === status){
        const resultOfUpdate = this.matrix.map(x => {
          if(x[0] === questionId && x[1] === nodeName){
            x.status = status
            return x
          }
          else{
            return x
          }
        })
        this.matrix = resultOfUpdate
      }
    }
    else{
      this.matrix.push([questionId, nodeName, status])
    }

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

  getAll(){
    return this.matrix
  }
}