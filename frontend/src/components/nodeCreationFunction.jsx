/**
 * TODO add a garbage bin in case of an incorrect node or just like a double click to delete
 */
 import React, { useState, useEffect, useRef} from 'react';
 import { Box, DataTable, Button, Layer, Heading, TextInput } from "grommet";
import {select, forceSimulation, forceManyBody, forceCollide, forceCenter, } from 'd3'
import useResizeObserver from './useResizeObserver'
import { forceLink } from 'd3-force';
import {ADD_NODES_SCREEN_TITLE, ADD_PERSON_BUTTON_TEXT, NUM_OF_NODES_OUTSIDE_BOUNDS} from "./config/localisation"
import { survey } from '../stores/questionsStore';

export default function NodeCreationPage({
    nodes,
    onNodeCreation,//callback that gets triggered when the button confirm name button is pressed and a new node should be added
    maxNodes, //number used to calculate angles, got it from the form initially 
    filterYou = false
}) {

    const [nodeName, setNodeName] = React.useState('');
    const [links, setLinks] = React.useState([])
    // const [nodesRepresentation, setNodesRepresentation] = React.useState(nodes.map((x) => {
    //     if(x.getIsFixed()){
    //         return {
    //             "id": x.getName(),
    //             "fx": x.getX(),
    //             "fy": x.getY(),
    //             "UID": x.getId()
    //         }
    //     }
    //     else{
    //         return {
    //             "id": x.getName(),
    //             "UID": x.getId()
    //         }
    //     }
    // }))


    const [nodesRepresentation, setNodesRepresentation] = React.useState(nodes.reduce(function (nodReps, nod) {
        if(!(filterYou && (nod.id == 1))){

          let newNod = {
            id: nod.getName(),
            selected: false,
            UID: nod.getId()
          }
          nodReps.push(newNod)
        }
        
        return nodReps
      }, []))


    function updateRepresentation(){
        setNodesRepresentation(nodes.map((x) => {
            return {
            "id" : x.getName(),
            "selected" : false,
            "UID" : x.getId()
            }
        }))
        
        /*setLinks(
            [...links,
            {"source": 0, "target": nodes.length-1}]
            ); //0 is the hardcoded value for "You"*/

        console.log("nodesRepresentation", nodesRepresentation)
        console.log("links", links)
    }
    const svgRef = useRef(); //gets a ref for the svg in which d3 renders in 
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef); //used to resize 

    function handlePos(d){
        if(d.UID == 1){
            console.log("handlePos", d.UID)
          return [0,0]
        }
        else{
          // -1 is used as one node will be in the center... but acc no?
          const baseAngle = (2 * Math.PI)/(maxNodes );
          const angle = baseAngle * d.UID
          const xpos = Math.cos(angle) * 100
          const ypos = Math.sin(angle) * 100
          console.log("pos", [xpos, ypos])
          return [xpos, ypos]
        }
      }


    useEffect(() => {
         updateRepresentation()
        setLinks(
            [...links,
            {"source": 0, "target": nodes.length-1}]
            );
    }, [nodes])

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
      .attr("stroke", "#aaa")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 15)
      .attr("x1",( d) =>  d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    // const link = svg.selectAll(".link")
    //     .data(links)
    //     .enter().append("line")
    //     .attr("class", "link")
    //     .style("stroke-width",2);

  const node = svg
      .selectAll(".node")
      .data(nodesRepresentation)
      .join("g")
      .attr('class', 'node')
      .attr("transform", d => `translate(${d.x = handlePos(d)[0]}, ${d.y = handlePos(d)[1]})`)      


  node.append('circle')
      .join("g")
      .attr("r", 30)
      .attr("fill", function (d) { return '#42c58a'; })  


  node.append("text")
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('fill', '#000')
      .style('font-size', '20px')
      
      console.log("nodesRepresentation", nodesRepresentation)
      console.log("simulation", forceSimulation(nodesRepresentation))
    //   const simulation = forceSimulation(nodesRepresentation)
    //    .force("charge", forceManyBody().strength(0))
    //   .force("collide", forceCollide(0))
    //   // .force("center", forceCenter())
    //   .force("link", forceLink(links))


    //   simulation.on("tick", function() {
    //     link.attr("x1", function(d) { return d.source.x; })
    //         .attr("y1", function(d) { return d.source.y; })
    //         .attr("x2", function(d) { return d.target.x; })
    //         .attr("y2", function(d) { return d.target.y; });})
//   simulation.on("tick", () => {
//     // link
//     //     .attr("x1", d =>{console.log("x1 sim " + d.source.x); return d.source.x; })
//     //     .attr("y1", d => d.source.y)
//     //     .attr("x2", d => d.target.x)
//     //     .attr("y2", d => d.target.y);

//     // node
//     //     .attr("transform", d => `translate(${d.x}, ${d.y})`);
//   });

      }, [nodesRepresentation, links, dimensions]); //TODO check if this nodes param here is right and what it does...



      function checkUpperBounds(callback){
        if(nodes.length -1 < survey.surveyUpperBound){
          callback()
        }
        else{
          alert(NUM_OF_NODES_OUTSIDE_BOUNDS(survey.surveyLowerBound, survey.surveyUpperBound))
        }
      };

      const inputRef = useRef(null);

    function createNode() {
        onNodeCreation(nodeName);
        setNodeName('');
        inputRef.current.focus();
    }



        return( 
        <Box id="nodeCreation box" fill= "vertical" className="nodeCreation">
            <p className="title">{ADD_NODES_SCREEN_TITLE}</p>
            <div className="inputContainer">
                <TextInput
                  ref={inputRef}
                    placeholder="Type here..."
                    value={nodeName}
                    onChange={event => setNodeName(event.target.value)}
                    autoFocus
                />

                <Button
                    primary
                    label= {ADD_PERSON_BUTTON_TEXT}
                    onClick={() => checkUpperBounds(createNode)}
                    disabled={nodeName && nodeName.length > 0 ? false : true}
                />
            </div>

            <div className="wrapperRef" ref={wrapperRef} >
                <svg ref={svgRef} className="nodeCreationSVG"></svg>
            </div>
        </Box>
        )
 
}