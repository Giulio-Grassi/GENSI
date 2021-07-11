/**
 * arranges the nodes in a row so it's possible to select them,
 * once a node is selected it bumps up and changes color
 */

 import React, { useState, useEffect, useRef} from 'react';
 import { Box, DataTable, Button, Text, Layer, Heading, TextInput } from "grommet";
import {select, forceSimulation, forceManyBody, forceCollide, forceCenter, tickFormat,} from 'd3'
import useResizeObserver from './useResizeObserver'
import { forceLink } from 'd3-force';


export default function NodeRow({
     nodes,
     question,
     table,
     setTable,
     filterYou = false
    }) {
    const CIRCLE_RADIUS = 30;
    const [nodes, setNodes] = React.useState([]);
    const [didInitialise, setDidInitialise] = React.useState(false);
    const [didFilter, setDidFilter] = React.useState(false)
    const svgRef = useRef(); //gets a ref for the svg in which d3 renders in 
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef); //used to resize 
    const [nodesRepresentation, setNodesRepresentation] = React.useState(nodes.map(x => {
      return {
        id: x.getName(),
        selected: false
      }
    }))

    useEffect(() => {
      setNodesRepresentation(nodesRepresentation.map(x => {
        x.selected = table.getRelation(question.id, x.id)[0][2]
        return x
      }))
    }, [question])

    


      // will be called initially and on every data change
    useEffect(() => {
      if (!dimensions) return;

      console.log("prefilter nodes ", nodes)

      if(!didInitialise){
        setDidInitialise(true);
        setNodes(initialNodes);
      
      if(filterYou && !didFilter){
        //const filteredNodes = nodes.filter(e => e.id !=  "You") //removing you as we do not need it for this screen, TODO make it a var
       
         setNodes(initialNodes.filter(e => e.id !=  "You"))
         setDidFilter(true)
         console.log("FILTERED")
        console.log("postfilter nodesRepresentation ", nodesRepresentation)
      }
    }


        const manualPadding = 100
        const nodeOffset = (dimensions.width - 2* manualPadding)/ nodesRepresentation.length
        console.log("width", dimensions.width)
        
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
      .attr("fill", function (d) { return '#D9BBF9'; });  


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
        console.log("QUESTION: "+question+" NAME:"+name)
        setTable(table.toggleRelation(question.id, name))
        console.log("Updated table", table.getAll())
        console.log("clicked nodesRepresentation", nodesRepresentation)
        console.log("indexed node", nodesRepresentation[i.index])
        console.log(d);
      }
      // Create Event Handlers for mouse
      function handleMouseOver(d, i) {  // Add interactivity

        select(this).selectChild('circle') //select circle at mouseposition... otherwise label gets in the way
        .transition()
        .attr("r", CIRCLE_RADIUS *1.5)
        .attr("fill", function (d) { return '#90EE90'; })
      }

  function handleMouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        select(this).selectChild('circle')
        .transition()
        .attr("r", CIRCLE_RADIUS)
        .attr("fill", function (d) { return '#D9BBF9'; })
      }


    //   node.checked = function (val) { https://bl.ocks.org/Lulkafe/c77a36d5efb603e788b03eb749a4a714

    //     if(val === undefined) {
    //         return checked;    //     } else {
    //         checked = val;
    //         return checkBox;
    //     }
    // }

      //more than having the simulation, just have the posittions in the state?
      
      const simulation = forceSimulation(nodesRepresentation)

      simulation.on("tick", () => {
         node
      //  // .attr("x", d => (d.index * nodeOffset) + manualPadding - ( -dimensions.width / 2))
      //   //.attr("transform", d => `translate(${ -((d.index * nodeOffset) + manualPadding - (dimensions.width / 2))}, ${d.selected ? d.y : 100 })`);
         .attr("transform", d => `translate(${d.x = (-dimensions.width / 2  + manualPadding + nodeOffset/2 + d.index * nodeOffset)}, ${d.selected ? d.y = 0 : d.y = 100 })`);

        //console.log("simulation nodes ", nodes)
      });
      }, [nodesRepresentation, dimensions]); //TODO check if this nodes param here is right and what it does...

        return(
                <Box fill={true} ref={wrapperRef}  pad="small" height="xxlarge">
                    <svg ref={svgRef}></svg>
                </Box>
        )
}