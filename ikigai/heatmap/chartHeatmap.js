{
let margin = {top: 10, right: 0, bottom: 40, left: 60},
  width = 800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

let chartHeatmap = d3.select("#chartHeatmap")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Labels
let myDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
let myTimes = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]

let x = d3.scaleBand()
  .range([ -44, width ])
  .domain(myTimes)
  .padding(0.02);

chartHeatmap
  .append("g")
  .attr("transform", "translate(4," + height + ")")
  .attr("class", "axisColor")
  .call(d3.axisBottom(x))
  .call(g => g.select(".domain").remove()) // удаляем ось

let y = d3.scaleBand()
  .range([ 0, height ])
  .domain(myDays)
  .padding(0.02);

chartHeatmap.append("g")
    .attr("class", "axisColor")
    .attr("transform", "translate(-35,-17)") // сдвигаем надписи на оси
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove()) // удаляем ось
  .selectAll("text")
    .attr("x", -15)
    .attr("y", 2)
    .style("text-anchor", "start")
    .style("font-size", "12px")
    .style("font-family", "Manrope");

let myColor = d3.scaleLinear()
  .range(["white", "#D3604C"])
  .domain([0,10])

d3.csv("dataHeatmap.csv", function(data) {

  // tooltip
  /* var tooltip = d3.select("#heatmap")
    .append("div")
    .attr("class", "tooltip")
    .style("border-radius", "4px") 

  var mouseover = function(d) {
    tooltip.style("display", "inline")
  }

  var mousemove = function(d) {
    tooltip
      .html("Заказов: " + d.value)
      .style("left", (d3.event.pageX + 70) + "px")
      .style("top", (d3.event.pageY + 20) + "px")
  }

  var mouseleave = function(d) {
    tooltip.style("display", "none")
  } */

  // add the squares
  let chart = chartHeatmap.selectAll()
    .data(data, function(d) {return d.day+':'+d.variable;})
    .enter()
    .append("g")

    chart.append("rect")
      .attr("x", function(d) { return x(d.variable) + 42 })
      .attr("y", function(d) { return y(d.day) })
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )

    chart.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return x(d.variable) + 48 + "px" })
      .attr("y", function(d) { return y(d.day) + 20 + "px"})
      .style("font-weight", "400")
      .style("fill", "#202020")
      .style("font-size", "12px")
      .text(function(d) {return d.value})

    chart.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return x(d.variable) + 48 + "px" })
      .attr("y", function(d) { return y(d.day) + 36 + "px"})
      .style("font-weight", "400")
      .style("fill", "#202020")
      .style("opacity", ".4")
      .style("font-size", "12px")
      .text(function(d) {return d.notmyself})

    /*
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    */
})

}