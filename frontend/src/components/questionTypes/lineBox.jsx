/**
 * arranges the nodes in a row so it's possible to select them,
 * once a node is selected it bumps up and changes color
 */

 import React, { useState, useEffect, useRef, useCallback} from 'react';
 import { Box, DataTable, Button, Text, Layer, Heading, TextInput } from "grommet";
import {select, drag, forceSimulation, forceManyBody, forceCollide, forceCenter, tickFormat, timeHour, timeout, selectAll,} from 'd3'
import useResizeObserver from '../useResizeObserver'
import { forceLink } from 'd3-force';
import { colors } from 'grommet/themes/base';
import { drawBoxes } from '../shared/drawboxes';

export default function LineBox({
  nodes,
  question,
  table,
  setTable,
  filterYou,
  darkMode
    }) {
    const CIRCLE_RADIUS = 30;
    const svgRef = useRef(); //gets a ref for the svg in which d3 renders in 
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef); //used to resize 
    const [nodesRepresentation, setNodesRepresentation] = React.useState(
      
      nodes.filter(function (e) { 
        if(e.name ==  "You") {
          const v = filterYou ?  false : true 
          return v  
        }
        else {return true}}).map(x => {

      return {
        id: x.getName(),
        selected: false
      }
    })
    )

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
      const extraOuterPadding = 40 //this is extra for outer pad. total outer pad is manual + inner
      const boxPadding = 280 / boxes.length 
      function boxPositionFuncX(dimensions, extraOuterPadding, i){
        const boxOffset = (dimensions.width - 2* extraOuterPadding)/ boxes.length
        const x = (-boxWidth/2 -dimensions.width / 2  + extraOuterPadding + boxOffset/2 + i * boxOffset)
        return x
      }

      function boxWidthWithPadding(dimensions, extraOuterPadding, boxPadding ){
        const boxWidth = (dimensions.width - 2*extraOuterPadding - boxPadding*(boxes.length-1))/ boxes.length
        return boxWidth
      }

      // const boxWidth = boxWidthWithPadding(dimensions, extraOuterPadding, boxPadding)
      const boxWidth = 200
  // ------------------


      //Draws the boxes, positions them and appends necessary callbacks 
      const dropBoxes = drawBoxes(svg, boxes, boxWidthFunc, boxHeightFunc, darkMode)
      dropBoxes
      .attr("transform", (d,i) => `translate(${d.x = boxPositionFuncX(dimensions, extraOuterPadding, i ) }, ${d.y = 100 })`)
      .on("mouseover", boxMouseOver)
      .on("mouseout", boxMouseOut)
      console.log("DRAWN BOXES : ")
      console.log(dropBoxes)


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
  .attr("fill", function (d) { return '#42c58a'; });  


node.append("text")
  //.join("g")
  .text(d => d.id)
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .style('fill', '#000')
  .style('font-size', '20px');
  return node 
}

const boxWidthFunc = (i) => {return 100}
const boxHeightFunc = (i) => {return 200}