import { acme } from "../assets/themes/theme";
import {select, drag, forceSimulation, forceManyBody, forceCollide, forceCenter, tickFormat, timeHour, timeout, selectAll,} from 'd3'

export function nodePositionFuncX(i, dimensions){
  return 0
}

export function nodePositionFuncY(i, dimensions, nodesRepresentationLength){
  const manualPadding = 100
  const nodeOffset = (dimensions.height - 2* manualPadding)/ nodesRepresentationLength
  const x = (-dimensions.height / 2  + manualPadding + nodeOffset/2 + i * nodeOffset)
  return x
}

export function dragstarted(event, d, setDraggingNode) {
  setDraggingNode(d.id)
  select(this).raise().attr("stroke", "black")
  .style("pointer-events", "none"); //this is done so that the mouseover event on the box can be detected
}

export function dragged(event, d) {
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
 export function dragended(event, d, setDraggingNode) {
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

export function boxWidthFunc(i, boxesLength, base){
  //follows compound interest formula where the time is the index
  var t = (boxesLength-1)/2

  const percent = 1
  const CI = base * ( 1 + percent) * Math.floor(Math.abs(i-t))
  if(Math.floor(Math.abs(i-t)) === 0) return base 
  else return CI       
}

export function boxMouseOver(event, d, setBoxToDropIn){
  select(this).selectChild()
  .attr("style", "fill:#F9939B");
  setBoxToDropIn(d.id)
  
  //console.log("box over with d.id: "+d.id, boxToDropIn)
  //console.log(d.id)
}

export function boxMouseOut(Event, d, setBoxToDropIn){
  select(this).selectChild()
  .attr("style", "fill:#DADADA");
  setBoxToDropIn("")
}

export function drawNodes(svg, data, CIRCLE_RADIUS){
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
 export function drawBoxes(svg, data, boxWidth, boxHeight, darkMode, boxesLength, base){
  const dropBox = svg
  .selectAll(".dropBox")
  .data(data, d => d.id)
  .join("g")  //a che serve sto join?
  .attr('class', 'dropBox')
  // .attr("transform", (d,i) => `translate(${d.x = (-boxWidth/2 -dimensions.width / 2  + manualPaddingBox + boxOffset/2 + i * boxOffset)}, ${d.y = 100 })`)
  // .on("mouseover", boxMouseOver)
  // .on("mouseout", boxMouseOut)

  dropBox.append("rect")		// pre-defined shape
  .attr("style", d => "fill:#DADADA")	// fill color of shape
    .attr("rx", 25)								// how much to round corners 
    .attr("ry", 25)								// how much to round corners
    .attr("width", (d,i) => boxWidth(i, boxesLength, base))					
    .attr("height", boxHeight);
    
  dropBox.append("text")
    .join("g")
    .text(d => d.id)
    //.attr("x", boxWidth/2)              //Used to center the text in the box  
    .attr('text-anchor', 'right')
    .attr('alignment-baseline', 'ideographic')
    .style('fill', (darkMode ? acme.global.colors['grey-1'] : acme.global.colors['grey-4']))
    .style('font-size', '20px');
    return dropBox
}