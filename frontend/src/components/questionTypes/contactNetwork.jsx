/**
 * arranges the nodes in a row so it's possible to select them,
 * once a node is selected it bumps up and changes color
 */

 import React, { useEffect, useRef} from 'react';
 import { Box } from "grommet";
import {select, forceSimulation} from 'd3'
import useResizeObserver from '../useResizeObserver'


export default function ContactNetwork({
     nodes,
     setNodes,
     question,
     table,
     setTable,
     internalCounter,
     relToAdd,
     setRelToAdd,
     filterYou = true
    }) {
    const CIRCLE_RADIUS = 30;
    const [didFilter, setDidFilter] = React.useState(false)
    const svgRef = useRef(); //gets a ref for the svg in which d3 renders in 
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef); //used to resize 
    const [currentCenterNodeId, setCurrentCenterNodeId] = React.useState(internalCounter) 
    const relationships = table.getNetworkPairs(question, currentCenterNodeId)
    // const [relToAdd, setRelToAdd] = React.useState([])
    const [nodesRepresentation, setNodesRepresentation] = React.useState(nodes.reduce(function (nodReps, nod) {
      if(!(filterYou && (nod.id == 1))){

        let sel
         //if the nodes already are in contact with each other selected = true 
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
      
      return nodReps
    }, []))




    //PSEUDO
    // se currentNode 3 
    // 



    // TODO ASK NINAD WTF IS THIS AND DOES IT NEED TO BE A USE EFFECT OR IS IT INITIALISATION?
    // useEffect(() => {

    //   setNodesRepresentation(nodesRepresentation.filter(x => {
    //     let r = table.getNetworkPairs(question.id, currentCenterNodeId)
    //     let relationFound = false
    //     let i = 0
    //     while(!relationFound && i < r.length){
    //       if(r[i][0] === x.UID || r[i][1] === x.UID){
    //         relationFound = true
    //       }
    //       else i++
    //     }
    //     //x.selected = relationFound //true means it's been already selected, hence we don't show the node.
    //     //return x
    //     if(!relationFound){
    //       return x
    //     }
    //   }))

    // }, [question])


    //this use effect resets the state 
    useEffect(() => {
      const relationships = table.getNetworkPairs(question.id, currentCenterNodeId)
      //console.log("GET PAIRS SETNODE : ", relationships)
      let alreadyIn = relationships.map(rel => {
        if(rel[0] === currentCenterNodeId){
          return rel[1]
        } else return rel[0]
      })

      setNodesRepresentation(nodes.reduce(function (nodReps, nod) {

        if(!(filterYou && (nod.id == 1))){
          if(!alreadyIn.includes(nod.getId())){
          let newNod = {
            id: nod.getName(),
            selected: false,
            preselected: false,
            UID: nod.getId()
          }
          nodReps.push(newNod)
        }
        }
        
        return nodReps
      }, []))
      // setNodesRepresentation(
      //     nodesRepresentation.map(x => {
      //         var y = x
      //         y.selected = false
      //         return y
      //     })
      //   )
      //setRelToAdd([])
    }, [internalCounter, currentCenterNodeId, table])
  //   //builds a map id -> angle 
  //   function initialiseNodesOnCircle(){
        
	// 	console.log('---')
	// 	var angle = (2 * Math.PI)/nodesRepresentation.length;
	// 	var points = [];
	// 	var i=0;

	// 	for(var a = 0; a<(2*Math.PI); a+=angle){
	// 		i++;
	// 		points.push({
	// 			x:Math.cos(a),
	// 			y:Math.sin(a),
	// 			rotation:a,
	// 			label:'point' + i
	// 		})
	// 	}
	// }
    
    //on next aumenta counter 
    //se nodo e counter -> centro
    //else node angle  e radiante diviso id 

    //se selezioni nodo add relation e string
    //se premi pulsante aumenta counter

      // will be called initially and on every data change
    useEffect(() => {
      if (!dimensions) return;

      //console.log("GET PAIRS : ", table.getNetworkPairs(question.id, currentCenterNodeId))
      setTable(table)

      // console.log("internal : ", internalCounter)
      setCurrentCenterNodeId(internalCounter)


      // console.log("prefilter nodes ", nodes)
      // console.log("prefilter nodesRepresentation ", nodesRepresentation)


      // if(filterYou && !didFilter){
      //   //const filteredNodes = nodes.filter(e => e.id !=  "You") //removing you as we do not need it for this screen, TODO make it a var
       
      //   setNodesRepresentation(nodesRepresentation.filter(e => e.id !==  "You"))
      //    setDidFilter(true)
      //    console.log("FILTERED")
      //   console.log("postfilter nodesRepresentation ", nodesRepresentation)
      // }


        const svg = select(svgRef.current);
        svg.selectAll("*").remove(); //Clear canvas so no duplicates are trailed every refresh


            // centering workaround
    svg.attr("viewBox", [
        -dimensions.width / 2,
        -dimensions.height / 2,
        dimensions.width,
        dimensions.height
      ]);

  const node = svg
      .selectAll(".node")
      .data(nodesRepresentation)
      .join("g")
      .attr('class', 'node')
      //  .attr("x", d => d.x = d.angleId)
      // .attr("y", d => d.y = 0)
      //.attr("selected", d => d.selected)
       .attr("transform", d => `translate(${d.x = handlePos(d)[0]}, ${d.y = handlePos(d)[1]})`)      
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleMouseClick);


  node.append('circle')
      .join("g")
      .attr("r", CIRCLE_RADIUS)
      .style("stroke", "red")
      .attr("stroke-width", function(d) { if(d.UID === currentCenterNodeId){return 4} else return 0 })
      .attr("fill", function (d) {return (d.selected)?  '#42c58a' : '#ff0000' });  


  node.append("text")
      //.join("g")
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('fill', '#000')
      .style('font-size', '20px');

      function handlePos(d){
        if(d.UID == currentCenterNodeId){
          return [0,0]
        }
        else{
          // -1 is used as one node will be in the center
          const baseAngle = (2 * Math.PI)/(nodesRepresentation.length -1);
          const angle = baseAngle * d.UID
          const xpos = Math.cos(angle) * 100
          const ypos = Math.sin(angle) * 100
          return [xpos, ypos]
        }
      }

      function handleMouseClick(e, d){
        if(currentCenterNodeId !== d.UID){
          // console.log("clicked"+ "This : " + this + "Id :" + d.id+ "x : " + d.x  + "UID : " + d.UID)
          // // nodes[this.index].selected = true
          // console.log("prova this : " + this.index + i.index)
          // console.log("D VALUE" + d.UID)
          //var name = nodesRepresentation[d.UID -1] //enforce node name uniqueness to make this bulletproof

          setNodesRepresentation(
            nodesRepresentation.map(x => {
              if(x.UID == d.UID){
                var y = x
                y.selected = !y.selected
                return y
              }
              else{
                return x
              }
            })
          )
          // console.log("QUESTION: "+question+" NAME:"+name)
          // console.log("Updated table", table.getAll())
          // console.log("clicked nodesRepresentation", nodesRepresentation)
          // console.log("indexed node", nodesRepresentation[i.index])
          // console.log("\n\n\n\n")
          
          
          //This block is for every click on the nodes, not next
          let existence = relToAdd.filter(x => (x[0] === currentCenterNodeId && x[1] === d.UID) || (x[0] === d.UID && x[1] === currentCenterNodeId))
          if(existence.length === 0){
            let newArray = relToAdd
            newArray.push([currentCenterNodeId, d.UID])
            setRelToAdd(newArray)
          } else {
            let newArray = relToAdd.filter(x => !(x[0] === currentCenterNodeId && x[1] === d.UID) || (x[0] === d.UID && x[1] === currentCenterNodeId))
            setRelToAdd(newArray)
          }
          
          //This block is for click on next
          // console.log("relToAdd", relToAdd)
          // setTable(table.addNetworkPairs(question.id, relToAdd))

          // console.log("\n\n\nCheck getNetwork")
          console.log("Selected node d "+d.id+" and number is "+d.UID);
          // console.log("CURRENT CENTER : " , currentCenterNodeId)
          // console.log(table.getNetworkPairs(question.id, d.UID))
        }
      }
      // Create Event Handlers for mouse
      function handleMouseOver(e, d) {  // Add interactivity

        select(this).selectChild('circle') //select circle at mouseposition... otherwise label gets in the way
        .transition()
        .attr("r", CIRCLE_RADIUS *1.5)
        .attr("fill", function (d) {return (d.selected)?  '#90EE90' : '#cc0000'})
      }
  function handleMouseOut(e, d) {
        // Use D3 to select element, change color back to normal
        select(this).selectChild('circle')
        .transition()
        .attr("r", CIRCLE_RADIUS)
        .attr("fill", function (d) {return (d.selected)?  '#42c58a' : '#ff0000'})
      }



      // const simulation = forceSimulation(nodesRepresentation)

      // simulation.on("tick", () => {
      //    node
      // //  // .attr("x", d => (d.index * nodeOffset) + manualPadding - ( -dimensions.width / 2))
      // //   //.attr("transform", d => `translate(${ -((d.index * nodeOffset) + manualPadding - (dimensions.width / 2))}, ${d.selected ? d.y : 100 })`);
      //    .attr("transform", d => `translate(${d.x = (-dimensions.width / 2  + manualPadding + nodeOffset/2 + d.index * nodeOffset)}, ${d.selected ? d.y = 0 : d.y = 100 })`);

      //   //console.log("simulation nodes ", nodes)
      // });



      }, [nodesRepresentation, dimensions]); //TODO check if this nodes param here is right and what it does...

        return(
                <Box fill={true} ref={wrapperRef}  pad="small" height="xxlarge">
                    <svg ref={svgRef}></svg>
                </Box>
        )
}