
let nodes = []
const [currentCenterNodeId, setCurrentCenterNodeId] = React.useState(internalCounter) 


const [nodesRepresentation, setNodesRepresentation] = React.useState(nodes.reduce(function (nodReps, nod) {
    if(!(filterYou && (nod.id == 1))){

      let sel
       //if the nodes already are in contact with each other selected = true 
    if(nod.getId() > currentCenterNodeId ){

    
        if( (currentCenterNodeId, nod.getId()) in relationships || (nod.getId(), currentCenterNodeId) in relationships){
            sel = true
        }
        else{
            sel = false
            let newNod = {
            id: nod.getName(),
            selected: false,
            preselected: sel,
            UID: nod.getId()
            }
            nodReps.push(newNod)
        }
        }
    }
    
    return nodReps
  }, []))

// if( nod.id )