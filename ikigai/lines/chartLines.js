 /* let margin = {top: 10, right: 60, bottom: 40, left: 60},
    width = 1080 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3.select("#chartLines")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("dataLines2.csv", function(data) {

  // group the data: I want to draw one line per group
  let sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.Number;})
    .entries(data);

  console.log(JSON.stringify(sumstat));

  // Add X axis --> it is a date format
  let x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.Date; }))
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  // Add Y axis
  let y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.Sum; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette
  let res = sumstat.map(function(d){ return d.key }) // list of group names
  let color = d3.scaleOrdinal()
    .domain(res)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

  // Draw the line
  svg.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.Date); })
            .y(function(d) { return y(+d.Sum); })
            (d.values)
        })
}); */



let margin = {top: 30, right: 0, bottom: 30, left: 50},
    width = 210 - margin.left - margin.right,
    height = 210 - margin.top - margin.bottom;

//Read the data
d3.csv("dataLines2.csv", function(data) {

  // group the data: I want to draw one line per group
  let sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.Number;})
    .entries(data);

  console.log(JSON.stringify(sumstat));

  // What is the list of groups?
  allKeys = sumstat.map(function(d){return d.key})

  // Add an svg element for each group. The will be one beside each other and will go on the next row when no more room available
  let svg = d3.select("#chartLines")
    .selectAll("uniqueChart")
    .data(sumstat)
    .enter()
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis --> it is a date format
  let x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.Date; }))

  //Add Y axis
  let y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.Sum; })])
    .range([ height, 0 ]);

  svg.append("g")
    .call(d3.axisLeft(y).ticks(5));


  // Draw the line
  svg
    .append("path")
      .attr("fill", "none")
      .attr("stroke", "#D3604C")
      .attr("stroke-width", 1)
      .attr("d", function(d){
        return d3.line()
          .x(function(d) { return x(d.Date); })
          .y(function(d) { return y(+d.Sum); })
          (d.values)
      });

  // Add titles
  /* svg
    .append("text")
    .attr("text-anchor", "start")
    .attr("y", -5)
    .attr("x", 0)
    .text(function(d){ return(d.key)})
    .style("fill", "D3604C")  */

})  