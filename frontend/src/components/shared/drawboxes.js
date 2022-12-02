import { acme } from "../assets/themes/theme";

/**
 * Handles the boxes on a graphical side only. position and callbacks are handled on their own
 * TODO parameterised the drawing better, adding colors and how much to round the corners... add height aswell
 * TODO find a way to display the text on the box better
 * @param {the svg canvas in which to draw the boxes} svg 
 * @param {the data of the boxes} data 
 * @param {a func that returns the width of each box based on index} boxWidthFunc 
 * @param {a func that returns the height of each box based on index} boxHeightFunc 
 * @returns d3 selection with all the boxes so that it is then possible to append callbacks...
 */
 export function drawBoxes(svg, data, boxWidthFunc, boxHeightFunc, darkMode){
    const dropBox = svg
    .selectAll(".dropBox")
    .data(data, d => d.id)
    .join("g")  //a che serve sto join?
    .attr('class', 'dropBox')
    // .attr("transform", (d,i) => `translate(${d.x = (-boxWidth/2 -dimensions.width / 2  + manualPaddingBox + boxOffset/2 + i * boxOffset)}, ${d.y = 100 })`)
    // .on("mouseover", boxMouseOver)
    // .on("mouseout", boxMouseOut)
  
    const boxRect = dropBox.append("rect")		// pre-defined shape
    .attr("style", d => "fill:#DADADA")	// fill color of shape
      .attr("rx", 25)								// how much to round corners 
      .attr("ry", 25)								// how much to round corners
      .attr("width", (d,i) => boxWidthFunc(i))					
      .attr("height", (d,i) => boxHeightFunc(i));
      
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


  