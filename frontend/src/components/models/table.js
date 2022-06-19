//Table tuples are [questionId, nodeName, status]
export class Table {
  constructor() {
    this.matrix = [];
  }

  insertRelation = (questionId, nodeName, status, type) => {
    this.matrix.push([questionId, nodeName, status, type])
    return this
  }

  updateRelation = (questionId, nodeName, status) => {
    this.matrix = this.matrix.map(x => {
      if(x[0] === questionId && x[1] === nodeName){
        return [questionId, nodeName, status, x[3]]
      }
      else{
        return x
      }
    })

    return this
  }

  insertOrUpdateRelation = (questionId, nodeName, status, type) => {
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
      this.matrix.push([questionId, nodeName, status, type])
    }

    return this
  }

  toggleRelation = (questionId, nodeName) => {
    this.matrix = this.matrix.map(x => {
      if(x[0] === questionId && x[1] === nodeName){
        return [questionId, nodeName, !x[2], x[3]]
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
    let result = this.matrix.filter(x => x[0] === questionId && x[1] === nodeName)
    if(result.length > 0){
      return result
    }
    else return []
  }

  //rObject is an array of arrays. The inner arrays are monodirectional and format like [1, 3].
  //rObject shouldn't have both directions.

  // return the instance [questionId, relationObject, "network"] that has the datastructure of the social network of the nodes
  getNetwork = (questionId) => {
    let result = this.matrix.filter(x => x[0] === questionId)
    if(result.length > 0){
      return result[0]
    }
    else return []
  }

  // return the specific PAIRS of the relationObject that have the said nodeUID as member
  getNetworkPairs = (questionId, nodeUID) => {
    let records = this.getNetwork(questionId)
    if(records.length > 0){
      let relations = records[1]
      return relations.filter(element => {
        if(element[0] === nodeUID || element[1] === nodeUID)
          return element
      })
    }else return []
  }

  addNetworkPairs = (questionId, rObject) => {
    let existence = this.matrix.filter(x => x[0] === questionId && x[2] === "network")
    if(existence.length > 0){
      existence = existence[0]
      // rObject.forEach(r => {
      //   let  = relToAdd.filter(x => (x[0] === currentCenterNodeId && x[1] === d.UID) || (x[0] === d.UID && x[1] === currentCenterNodeId))
      //   if(!existence[1].includes(r) && !existence[1].includes([r[1], r[0]])){
      //     existence[1].push(r)
      //   }
      // })
      
      // update the matrix with the new dataset
      this.matrix.map(x => {
        if(x[0] === existence[0] && x[2] === existence[2]){
          console.log("ROBJECT : " ,rObject)
          return [questionId, rObject, "network"]
        }
        else{
          return x
        }
      })
    } else{
      console.log("ROBJECT : " ,rObject)
      this.matrix.push([questionId, rObject, "network"])
    }
    return this
  }

  getAnswers = (questionId) => {
    return this.matrix.filter(x => x[0] === questionId)
  }

  getAll(){
    return this.matrix
  }
}