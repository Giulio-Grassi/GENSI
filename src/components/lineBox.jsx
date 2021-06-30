/**
 * arranges the nodes in a row so it's possible to select them,
 * once a node is selected it bumps up and changes color
 */

 import React, { useState, useEffect, useRef, useCallback} from 'react';
 import { Box, DataTable, Button, Text, Layer, Heading, TextInput } from "grommet";
import {select, drag, forceSimulation, forceManyBody, forceCollide, forceCenter, tickFormat, timeHour, timeout, selectAll,} from 'd3'
import useResizeObserver from './useResizeObserver'
import { forceLink } from 'd3-force';
import { colors } from 'grommet/themes/base';


export default function LineBox({
  nodes,
  question,
  table,
  setTable, 
  filterYou,
    }) {
    const CIRCLE_RADIUS = 20;
    const svgRef = useRef(); //gets a ref for the svg in which d3 renders in 
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef); //used to resize 
    const [nodesRepresentation, setNodesRepresentation] = React.useState(nodes.map(x => {
      return {
        id: x.getName(),
        selected: false
      }
    }))

      //TODO NINAD, HERE THE BOXES ARE DECLERED, MAYBE MAKE A MODEL, IDK HOW U WANT TO MAKE  THE STATE OUT OF THESE.
        //const boxes = [{id: "1", nodeColor: "ffa500"},{id: "22", nodeColor: "ffa500"},{id: "333", nodeColor: "ffa500"}, {id: "4444444", nodeColor: "ffa500"}]
        const boxes = []
        question.getBoxes().forEach(x => {
          boxes.push({id: x.id, nodeColor: x.colour})
        })


    //keeps the state of which box is curently being hovered on
    const [boxToDropIn, setBoxToDropIn] = React.useState("")
    const [draggingNode, setDraggingNode] = React.useState("")

    //Temporary solution. ADD PADDING BETWEEN BOXES OF MINIMUM SIZE OF NODE. AND ALSO REDUCE NODE SIZE.
    useEffect(()=> {
      if(draggingNode !== ""){
        setTable(table.updateRelation(question.id, draggingNode, boxToDropIn))
        const myboxArr = boxes.filter(box => box.id === boxToDropIn)
        var newColor = "#ABEBC6"
        if(myboxArr.length > 0){
           newColor = myboxArr[0].nodeColor;
        }
        else{
          newColor = "#ABEBC6"
        }
        selectAll(".node")
        .filter(function(d) { return d.id === draggingNode })
        .selectChild()
        .attr("style", d => "fill:"+newColor);  
      }
    },[boxToDropIn])

      // will be called initially and on every data change
    useEffect(() => {
      if (!dimensions) return;

        // console.log("width", dimensions.width)
        
        const svg = select(svgRef.current);
        svg.selectAll("*").remove(); //Clear canvas so no duplicates are trailed every refresh
            // centering workaround
    svg.attr("viewBox", [
        -dimensions.width / 2,
        -dimensions.height / 2,
        dimensions.width,
        dimensions.height
      ]);

      /**
       * Draws the nodes on screen, appends the callbacks.
       */
  const nodes = drawNodes(svg, nodesRepresentation, CIRCLE_RADIUS)
      nodes  
      .attr("transform", (d,i) => `translate(${d.x = nodePositionFuncX(i, dimensions)}, ${d.y = nodePositionFuncY(i) })`)
      .call(drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
     // .attr("transform", (d,i) => `translate(${d.x = }, ${d.y = 0 })`)


 

      function nodePositionFuncX(i, dimensions){
        const manualPadding = 100
        const nodeOffset = (dimensions.width - 2* manualPadding)/ nodesRepresentation.length
        const x = (-dimensions.width / 2  + manualPadding + nodeOffset/2 + i * nodeOffset)
        return x
      }
      function nodePositionFuncY(i, dimensions){
        return 0
      }

        function dragstarted(event, d) {
          setDraggingNode(d.id)
          //console.log("dragstarted", boxToDropIn)
          select(this).raise().attr("stroke", "black")
          .style("pointer-events", "none"); //this is done so that the mouseover event on the box can be detected
        }
      
        function dragged(event, d) {
          //console.log("dragged", boxToDropIn)
          select(this)
          .attr("transform", () => `translate(${d.x = event.x}, ${d.y = event.y })`)
        }
      
      

        /**
         * TODO NINAD : insert here the logic to save the state of the node being in a box if 
         * if boxTodropIn is not empty. 
         * ISSUES: select with the box id doesn't seem to be working
         * TODO: re insert the logic so that the node can be dragged again after it is dropped the first time 
         * @param {*} event 
         * @param {*} d 
         */
        function dragended(event, d) {
          setDraggingNode("")
          /*setTimeout(function() {
            console.log("dragended", boxToDropIn)
            if(boxToDropIn !== ""){
              console.log("inside if")
              setTable(table.insertRelation(question.id, d.id, boxToDropIn))
            }
            select(thisObject).attr("stroke", null)
            .style("pointer-events", "auto")
          }, 100);*/
          //console.log("dragended", boxToDropIn)
          select(this).attr("stroke", null)
          .style("pointer-events", "auto")
        }
      

  // ------FUNCTIONS FOR BOXES POSITION  AND SIZE  
      const extraOuterPadding = 0 //this is extra for outer pad. total outer pad is manual + inner
      const boxPadding = 70
      function boxPositionFuncX(dimensions, extraOuterPadding, i){
        const boxOffset = (dimensions.width - 2* extraOuterPadding)/ boxes.length
        const x = (-boxWidth/2 -dimensions.width / 2  + extraOuterPadding + boxOffset/2 + i * boxOffset)
        return x
      }

      function boxWidthWithPadding(dimensions, extraOuterPadding, boxPadding ){
        const boxWidth = (dimensions.width - 2*extraOuterPadding - boxPadding*(boxes.length-1))/ boxes.length
        return boxWidth
      }

      const boxWidth = boxWidthWithPadding(dimensions, extraOuterPadding, boxPadding)
  // ------------------

      //Draws the boxes, positions them and appends necessary callbacks 
      const dropBoxes = drawBoxes(svg, boxes, boxWidth)
      dropBoxes
      .attr("transform", (d,i) => `translate(${d.x = boxPositionFuncX(dimensions, extraOuterPadding, i ) }, ${d.y = 100 })`)
      .on("mouseover", boxMouseOver)
      .on("mouseout", boxMouseOut)
      


      function boxMouseOver(event, d){
        select(this).selectChild()
        .attr("style", "fill:#F7DC6F");
        setBoxToDropIn(d.id)
        
        //console.log("box over with d.id: "+d.id, boxToDropIn)
        //console.log(d.id)
      }
      function boxMouseOut(Event, d){
        select(this).selectChild()
        .attr("style", "fill:#E59866");
        setBoxToDropIn("")
      }


      }, [nodesRepresentation, dimensions]); //TODO check if this nodes param here is right and what it does...

        return(
                <Box fill={true} ref={wrapperRef}  pad="small" height="xxlarge">
                    <svg ref={svgRef}></svg>
                </Box>
        )
}

function drawNodes(svg, data, CIRCLE_RADIUS){
  const node = svg
  .selectAll(".node")
  .data(data)
  .join("g")
  .attr('class', 'node')
  // .attr("transform", (d,i) => `translate(${d.x = xfunc(i)}, ${d.y = yfunc(i) })`)
  // .call(drag()
  //       .on("start", dragstarted)
  //       .on("drag", dragged)
  //       .on("end", dragended));


node.append('circle')
  //.join("g")
  .attr("r", CIRCLE_RADIUS)
  .attr("fill", function (d) { return '#ABEBC6'; });  


node.append("text")
  //.join("g")
  .text(d => d.id)
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .style('fill', '#000')
  .style('font-size', '20px');
  return node 
}

/**
 * Handles the boxes on a graphical side only. position and callbacks are handled on their own
 * TODO parameterised the drawing better, adding colors and how much to round the corners... add height aswell
 * TODO maybe come up with a ratio between height and width
 * TODO find a way to display the text on the box better
 * @param {the svg canvas in which to draw the boxes} svg 
 * @param {the data of the boxes} data 
 * @param {the width of each box} boxWidth 
 * @returns d3 selection with all the boxes so that it is then possible to append callbacks...
 */
function drawBoxes(svg, data, boxWidth){
  const dropBox = svg
  .selectAll(".dropBox")
  .data(data, d => d.id)
  .join("g")  //a che serve sto join?
  .attr('class', 'dropBox')
  // .attr("transform", (d,i) => `translate(${d.x = (-boxWidth/2 -dimensions.width / 2  + manualPaddingBox + boxOffset/2 + i * boxOffset)}, ${d.y = 100 })`)
  // .on("mouseover", boxMouseOver)
  // .on("mouseout", boxMouseOut)

  const boxRect = dropBox.append("rect")		// pre-defined shape
  .attr("style", d => "fill:#E59866")	// fill color of shape
    .attr("rx", 25)								// how much to round corners 
    .attr("ry", 25)								// how much to round corners
    .attr("width", boxWidth)					
    .attr("height", 150);
    
  dropBox.append("text")
    .join("g")
    .text(d => d.id)
    .attr("x", boxWidth/2)              //Used to center the text in the box  
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'ideographic')
    .style('fill', '#000')
    .style('font-size', '20px');
    
    return dropBox
}