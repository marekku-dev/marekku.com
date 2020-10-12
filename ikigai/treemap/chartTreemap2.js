{
// set the dimensions and margins of the graph
let margin = {top: 10, right: 0, bottom: 0, left: 10},
  width = 800 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3.select("#chartTreemap")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// read json data
d3.json("dataTreemap2.json", function(data) {

  // Give the data to this cluster layout:
  let root = d3.hierarchy(data).sum(function(d){ return d.value}) // Here the size of each leave is given in the 'value' field in input data

  // Then d3.treemap computes the position of each element of the hierarchy
  d3.treemap()
    .size([width, height])
    .paddingTop(28)
    .paddingRight(7)
    .paddingInner(3)      // Padding between each rectangle
    //.paddingOuter(6)
    //.padding(20)
    (root)

  // prepare a color scale
  let color = d3.scaleOrdinal()
    .domain(["Суши", "Сеты", "Роллы"])
    .range([ "#E3533F", "#E3533F", "#E3533F"])

  // And a opacity scale
  let opacity = d3.scaleLinear()
    .domain([0, 395])
    .range([.5,1])

  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("fill", function(d){ return color(d.parent.data.name)} )
      .style("opacity", function(d){ return opacity(d.data.value)})

  // and to add the text labels
  /*svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name.replace('mister_','') })
      .attr("font-size", "11px")
      .attr("fill", "white") */

  // and to add the text labels
  svg
    .selectAll("vals")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.value })
      .attr("font-size", "11px")
      .attr("fill", "white")

  // Add title for the 3 groups
  svg
    .selectAll("titles")
    .data(root.descendants().filter(function(d){return d.depth==1}))
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0})
      .attr("y", function(d){ return d.y0+21})
      .text(function(d){ return d.data.name })
      .attr("font-size", "14px")
      .attr("fill",  "#202020" )

})

}