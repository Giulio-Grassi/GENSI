/**
 * TODO add a garbage bin in case of an incorrect node or just like a double click to delete
 */
 import React, { useState, useEffect, useRef} from 'react';
 import { Box, DataTable, Button, Layer, Heading, TextInput } from "grommet";
import {select, forceSimulation, forceManyBody, forceCollide, forceCenter,} from 'd3'
import useResizeObserver from './useResizeObserver'
import { forceLink } from 'd3-force';


export default function NodeCreationPage({
    nodes,
    links,
    onNodeCreation,//callback that gets triggered when the button confirm name button is pressed and a new node should be added
}) {

    const [nodeName, setNodeName] = React.useState('');

    const svgRef = useRef(); //gets a ref for the svg in which d3 renders in 
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef); //used to resize 


      // will be called initially and on every data change
    useEffect(() => {
      console.log("current dimension ", dimensions)

        if (!dimensions) return;
        // console.log("current nodes ", nodes)
        // console.log("current links ", links)

        const svg = select(svgRef.current);

            // centering workaround
    svg.attr("viewBox", [
        -dimensions.width / 2,
        -dimensions.height / 2,
        dimensions.width,
        dimensions.height
      ]);

  const link = svg
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg
      .selectAll(".node")
      .data(nodes)
      .join("g")
      .attr('class', 'node')

  node.append('circle')
      .join("g")
      .attr("r", 30)
      .attr("fill", function (d) { return '#5b8075'; })  


  node.append("text")
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('fill', '#000')
      .style('font-size', '20px')
      

      const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-10))
      .force("collide", forceCollide(80))
      // .force("center", forceCenter())
      .force("link", forceLink(links))

  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x}, ${d.y})`);
  });

      }, [nodes, links, dimensions]); //TODO check if this nodes param here is right and what it does...


    function createNode() {
        onNodeCreation(nodeName);
        setNodeName('');
    }


        return( 
        <Box id="nodeCreation box" fill= "vertical">
                <TextInput
                placeholder="type here"
                value={nodeName}
                onChange={event => setNodeName(event.target.value)}
                />

                <Button primary label="Confirm Name"
                onClick={() => createNode()} />

            <Box id="SVG wrap" fill={true} ref={wrapperRef}  pad="small" height="xxlarge">
                <svg ref={svgRef}></svg>
            </Box>
        </Box>
        )
 
}