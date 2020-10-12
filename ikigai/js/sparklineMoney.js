{
let margin = {top: 30, right: 25, bottom: 20, left: 10},
    width = 240 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;

let spark = d3.select("#sparklineMoney")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", 150)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/ikigai/data/orders.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.Date), value : d.SM }
  },

  // Now I can use this dataset:
  function(data) {
    
    // Выбираем последние 2 недели 
    let cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 16);
    data = data.filter(function(d) {
    return d.date > cutoffDate
    })

    // Add X axis --> it is a date format
    let x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, 120000])
      .range([ height, 0 ]);

    let bisect = d3.bisector(function(d) { return d.date; }).left;

    let focus = spark
    .append('g')
    .append('circle')
      .style("class", "sparkcircle")
      .attr('r', 2)
      .style("opacity", 0)

    let focusText = spark
    .append('g')
    .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "middle")
      .style('font-size', '12px')

    // Линия при наведении
    let focusLine = spark
    .append('g')
    .append('rect')
      .style("opacity", 0)
      .style("fill", "#202020")
      .attr("width", 1)

    // Дата при наведении
    let focusDate = spark
    .append('g')
    .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "text-before-edge")
      .style("font-size", "12px")

    spark
    .append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("transform", "translate("+ 0 + "," + 50 + ")")
      .attr('width', width)
      .attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);

    let normalDate = d3.timeFormat("%B %d");
    price = data[14].value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

    // Add the line
    spark.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("class", "sparkline")
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) + 50})
        .curve(d3.curveMonotoneX)
        )

    spark.append('circle')
      .attr('class', 'sparkcircle')
      .attr('cx', x(data[14].date))
      .attr('cy', y(data[14].value) + 50)
      .attr('r', 2);

    spark.append('text')
      .attr('x', 0)
      .attr('y', 23)
      .style('text-anchor', 'start')
      .attr('class', 'statsNumber')
      .text(price)

    spark.append('text')
      .attr('x', 0)
      .attr('y', -7)
      .style('font-family', 'Manrope')
      .style('font-size', '14px')
      .text(normalDate(data[14].date) + ' Revenue')

  function mouseover() {
    focus.style("opacity", 1)
    focusText.style("opacity", 1)
    focusLine.style("opacity", 1)
    focusDate.style("opacity", 1)
  }

  function mousemove() {
    // recover coordinate we need
    let x0 = x.invert(d3.mouse(this)[0]);
    let i = bisect(data, x0, 1);
    let normalTime = d3.timeFormat("%B %d");

    selectedData = data[i]
    focus
      .attr("cx", x(selectedData.date))
      .attr("cy", y(selectedData.value) + 50)
    focusLine
      .attr("x", x(selectedData.date) - 0.5)
      .attr("y", y(selectedData.value) + 53)
      .attr("height", height - y(selectedData.value))
    focusText
      .html(selectedData.value)
      .attr("x", x(selectedData.date))
      .attr("y", y(selectedData.value) + 43)
    focusDate
      .html(normalTime(selectedData.date))
      .attr("x", x(selectedData.date))
      .attr("y", height + 51)

    spark
      .selectAll("path")
      .style("opacity", ".2")
    }

  function mouseout() {
    focus.style("opacity", 0)
    focusText.style("opacity", 0)
    focusLine.style("opacity", 0)
    focusDate.style("opacity", 0)

    spark
      .selectAll("path")
      .style("opacity", "1")
  }

})

}