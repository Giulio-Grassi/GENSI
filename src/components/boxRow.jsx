/**
 * A custom, responsive boxRow in which it is possible to drag and drop the nodes in.
 * The component uses d3
 *
 */


/**
 * arranges the nodes in a row so it's possible to select them,
 * once a node is selected it bumps up and changes color
 */

 import React, { useState, useEffect, useRef} from 'react';
 import { Box, DataTable, Button, Layer, Heading, TextInput } from "grommet";
import {select, forceSimulation, forceManyBody, forceCollide, forceCenter, tickFormat,} from 'd3'
import useResizeObserver from './useResizeObserver'
import { forceLink } from 'd3-force';


export default function NodeRow({
    setNodes,//callback that gets triggered when we click on a node or filter YOU 
     nodes,
     selectedIds,
    filterYou
    }) {
    const CIRCLE_RADIUS = 30;
    const [nodeName, setNodeName] = React.useState('');
    const [didFilter, setDidFilter] = React.useState(false);
    const svgRef = useRef(); //gets a ref for the svg in which d3 renders in 
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef); //used to resize 


      // will be called initially and on every data change
    useEffect(() => {
      if (!dimensions) return;


        const manualPadding = 100
        const nodeOffset = (dimensions.width - 2* manualPadding)/ nodes.length        
        const svg = select(svgRef.current);

            // centering workaround
    svg.attr("viewBox", [
        -dimensions.width / 2,
        -dimensions.height / 2,
        dimensions.width,
        dimensions.height
      ]);

  const node = svg
      .selectAll(".node")
      .data(nodes)
      .join("g")
      .attr('class', 'node')
      //.attr("x", d => d.x = (-dimensions.width / 2  + manualPadding + nodeOffset/2 + d.index * nodeOffset))
      //.attr("y", d => d.y = 0)
      //.attr("selected", d => d.selected)
      //.attr("transform",d => `translate(${d.x}, ${d.y})`)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleMouseClick);


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

    
      function handleMouseClick(d, i){

        console.log("clicked")
        // nodes[this.index].selected = true
        setNodes(
          nodes[i.index].selected = true  //THIS IS FAULTY 
        )
      }
      // Create Event Handlers for mouse
      function handleMouseOver(d, i) {  // Add interactivity

        select(this).selectChild('circle') //select circle at mouseposition... otherwise label gets in the way
        .transition()
        .attr("fill", function (d) { return '#ffa500'; })
        .attr("r", CIRCLE_RADIUS *1.5)
      }

  function handleMouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        select(this).selectChild('circle')
        .transition()
        .attr("r", CIRCLE_RADIUS)
        .attr("fill", function (d) { return '#5b8075'; })
      }

      const simulation = forceSimulation(nodes)

      simulation.on("tick", () => {
         node
      //  // .attr("x", d => (d.index * nodeOffset) + manualPadding - ( -dimensions.width / 2))
      //   //.attr("transform", d => `translate(${ -((d.index * nodeOffset) + manualPadding - (dimensions.width / 2))}, ${d.selected ? d.y : 100 })`);
         .attr("transform", d => `translate(${d.x = (-dimensions.width / 2  + manualPadding + nodeOffset/2 + d.index * nodeOffset)}, ${d.selected ? d.y = 0 : d.y = 100 })`);

        //console.log("simulation nodes ", nodes)
      });
      }, [nodes, dimensions]); //TODO check if this nodes param here is right and what it does...

        return( 
                <Box fill={true} ref={wrapperRef}  pad="small" height="xxlarge">
                    <svg ref={svgRef}></svg>
                </Box>
        )
}