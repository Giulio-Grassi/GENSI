/**
 * an attempt to make a resizable responsive box with header to drop nodes in
 */

export default dropBox = ({svgElem, text, x,y, height, width, rounding = 5}) => {
    svgElem.append("rect")		// pre-defined shape
    .attr("style", "fill:darkblue")	// fill color of shape
      .attr("x", x)								// displacement from origin
      .attr("y", y)								// displacement from origin
      .attr("rx", rounding)								// how much to round corners - to be transitioned below
      .attr("ry", rounding)								// how much to round corners - to be transitioned below
      .attr("width", height)						// size of shape
      .attr("height", width);
    	
      svgElem.append("text")
      //.join("g")
      .text(text)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('fill', '#000')
      .style('font-size', '20px');
}
