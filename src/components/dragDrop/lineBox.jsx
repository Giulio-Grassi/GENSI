/**
 * arranges the nodes in a row so it's possible to select them,
 * once a node is selected it bumps up and changes color
 */

 import React, { useState, useEffect, useRef} from 'react';
 import { Box, DataTable, Button, Text, Layer, Heading, TextInput } from "grommet";
import {select, drag, forceSimulation, forceManyBody, forceCollide, forceCenter, tickFormat,} from 'd3'
import useResizeObserver from '../useResizeObserver'
import { forceLink } from 'd3-force';


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
      .attr("transform", (d,i) => `translate(${d.x = (-dimensions.width / 2  + manualPadding + nodeOffset/2 + i * nodeOffset)}, ${d.selected ? d.y = 0 : d.y = 100 })`)
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



        function dragstarted(event, d) {
          select(this).raise().attr("stroke", "black");
        }
      
        function dragged(event, d) {
          select(this)
          .attr("transform", () => `translate(${d.x = event.x}, ${d.y = event.y })`);

        }
      
        function dragended(event, d) {
          select(this).attr("stroke", null);
        }
      

      
      function handleMouseClick(d, i){

        console.log("clicked")
        // nodes[this.index].selected = true
        var name = nodesRepresentation[i.index].id //enforce node name uniqueness to make this bulletproof
        setNodesRepresentation(
          nodesRepresentation.map(x => {
            if(x.id === name){
              var y = x
              y.selected = !y.selected
              return y
            }
            else{
              return x
            }
          })
        )
      }

      
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