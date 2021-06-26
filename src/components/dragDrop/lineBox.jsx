/**
 * arranges the nodes in a row so it's possible to select them,
 * once a node is selected it bumps up and changes color
 */

 import React, { useState, useEffect, useRef} from 'react';
 import { Box, DataTable, Button, Text, Layer, Heading, TextInput } from "grommet";
import {select, drag, forceSimulation, forceManyBody, forceCollide, forceCenter, tickFormat,} from 'd3'
import useResizeObserver from '../useResizeObserver'
import { forceLink } from 'd3-force';
import { colors } from 'grommet/themes/base';


export default function LineBox({
     nodes,
    }) {
    const CIRCLE_RADIUS = 30;
    const svgRef = useRef(); //gets a ref for the svg in which d3 renders in 
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef); //used to resize 
    const [nodesRepresentation, setNodesRepresentation] = React.useState(nodes.map(x => {
      return {
        id: x.getName(),
        selected: false
      }
    }))
    const [boxToDropIn, setBoxToDropIn] = React.useState("")

    useEffect(()=> {
      console.log("use effect box" + boxToDropIn)
    },[boxToDropIn])
      // will be called initially and on every data change
    useEffect(() => {
      if (!dimensions) return;

        const manualPadding = 100
        const nodeOffset = (dimensions.width - 2* manualPadding)/ nodesRepresentation.length
        console.log("width", dimensions.width)
        
        const svg = select(svgRef.current);
        // svg.selectAll("*").remove(); //Clear canvas so no duplicates are trailed every refresh
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
      .attr("transform", (d,i) => `translate(${d.x = (-dimensions.width / 2  + manualPadding + nodeOffset/2 + i * nodeOffset)}, ${d.y = 0 })`)
    //  .on("mouseover", handleMouseOver)
      //.on("mouseout", handleMouseOut)
     // .on("click", handleMouseClick);
      .call(drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));


  node.append('circle')
      //.join("g")
      .attr("r", CIRCLE_RADIUS)
      .attr("fill", function (d) { return '#5b8075'; });  


  node.append("text")
      //.join("g")
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('fill', '#000')
      .style('font-size', '20px');


      function boxMouseOver(event, d){
        select(this).selectChild()
        .attr("style", "fill:blue");
        setBoxToDropIn(d.id)
        console.log("box over")
        console.log(boxToDropIn)
        console.log(d.id)

      }
      function boxMouseOut(Event, d){
        select(this).selectChild()
        .attr("style", "fill:lightgrey");
        setBoxToDropIn("")
        console.log("box out")
        console.log(boxToDropIn)

      }
        function dragstarted(event, d) {
          select(this).raise().attr("stroke", "black")
          .style("pointer-events", "none");
        }
      
        function dragged(event, d) {
          select(this)
          .attr("transform", () => `translate(${d.x = event.x}, ${d.y = event.y })`)

        }
      
        function dragended(event, d) {
          select(this).attr("stroke", null)
          //.style("pointer-events", "auto");
          console.log("dragended")
          console.log(boxToDropIn)
          if(boxToDropIn != ""){ //select prob still doesn t work... 
            // select(boxToDropIn).selectChild()
            // .style("pointer-events", "none")
            // .attr("style", "fill:red")
            // .attr("height", 200);
            console.log("inside if")
            const mycolor = boxes.filter(box => {
              if(box.id == boxToDropIn)return box.nodeColor})
              console.log("color " + mycolor)
            select(this)
            .attr("fill", mycolor)

          }

        }
      

      
      const boxes = [{id: "1", nodeColor: "ffa500"},{id: "22", nodeColor: "ffa500"},{id: "333", nodeColor: "ffa500"}, {id: "4444444", nodeColor: "ffa500"}]
      const manualPaddingBox = 50 //this is extra for outer pad. total outer pad is manual + inner
      const maybeInnerPad = 50
      const boxOffset = (dimensions.width - 2* manualPaddingBox)/ boxes.length
      const boxWidth = (dimensions.width - 2*manualPaddingBox - maybeInnerPad*(boxes.length-1))/ boxes.length
      const dropBox = svg
      .selectAll(".dropBox")
      .data(boxes, d => d.id)
      .join("g")  //a che serve sto join
      .attr('class', 'dropBox')
      .attr("transform", (d,i) => `translate(${d.x = (-boxWidth/2 -dimensions.width / 2  + manualPaddingBox + boxOffset/2 + i * boxOffset)}, ${d.y = 100 })`)
      .on("mouseover", boxMouseOver)
      .on("mouseout", boxMouseOut)

      const boxRect = dropBox.append("rect")		// pre-defined shape
      .attr("style", "fill:lightgrey")	// fill color of shape
        //.attr("x", x)								// displacement from origin
        //.attr("y", y)								// displacement from origin
        .attr("rx", 25)								// how much to round corners - to be transitioned below
        .attr("ry", 25)								// how much to round corners - to be transitioned below
        .attr("width", boxWidth)						// size of shape
        .attr("height", 150);
        
      dropBox.append("text")
        .join("g")
        .text(d => d.id)
        .attr("x", boxWidth/2)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('fill', '#000')
        .style('font-size', '20px');
      
      const simulation = forceSimulation(nodesRepresentation)

      simulation.on("tick", () => {
         
      //  // .attr("x", d => (d.index * nodeOffset) + manualPadding - ( -dimensions.width / 2))
      //   //.attr("transform", d => `translate(${ -((d.index * nodeOffset) + manualPadding - (dimensions.width / 2))}, ${d.selected ? d.y : 100 })`);
         

        //console.log("simulation nodes ", nodes)
      });
      }, [nodesRepresentation, dimensions]); //TODO check if this nodes param here is right and what it does...

        return(
                <Box fill={true} ref={wrapperRef}  pad="small" height="xxlarge">
                    <svg ref={svgRef}></svg>
                </Box>
        )
}