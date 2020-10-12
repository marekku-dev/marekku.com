{
let margin = {top: 0, right: 0, bottom: 0, left: 0},
  width = 1080 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
let chartTreemap = d3.select("#chartTreemap")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");



d3.csv('/ikigai/data/dataTreemap.csv', function(data) {

  // stratify the data: reformatting for d3.js
  let root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
  root.sum(function(d) { return + d.orders; })   // Compute the numeric value for each entity

  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
    .size([width, height])
    .padding(2)
    (root)

let myColor = d3.scaleSqrt()
  .range(["#FFE9E5", "#E3533F"])
  .domain([0,42])


  // use this information to add rectangles:
  chartTreemap
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("fill", function(d) { return myColor(d.data.orders)} )

  // and to add the text labels
  chartTreemap
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+10})
      .attr("y", function(d){ return d.y0+20})
      .text(function(d){ return d.data.name + ": " + d.data.orders + "%"})
      .attr("font-size", "14px")
      .attr("fill", "#202020")
})

}