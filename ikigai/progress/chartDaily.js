{
let margin = {top: 50, right: 30, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
let chartDaily = d3.select("#chartDaily")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("orders.csv", function(data) {

// X axis
let x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Date; }));

let xAxis = d3.axisBottom(x)

chartDaily.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
    .style("text-anchor", "end")
    .attr("display", "none")

// Add Y axis
let y = d3.scaleLinear()
  .domain([0, 80])
  .range([ height, 0]);

let yAxis = d3.axisLeft(y)
  .tickSize(-width);

chartDaily.append("g")
  .call(yAxis)
  .selectAll("text")
    .attr("x", -30)
    .style("text-anchor", "start")

// Bars
chartDaily.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Date); })
    .attr("y", function(d) { return y(d.Orders); })
    .attr("width", x.bandwidth() + 0.5) // Плюсуем немного, чтобы нивелировать отступы даже при нулевом паддинге
    .attr("height", function(d) { return height - y(d.Orders); })
    .style("fill", "404040")

chartDaily.append("text")
  .attr("class", "titleYaxis")
  .attr("x", -30)
  .attr("y", -20)
  .text("Orders")

chartDaily.append("text")
  .attr("class", "titleXaxis")
  .attr("x", width)
  .attr("y", height + 20)
  .attr("text-anchor", "end")
  .text("Days")

})

}