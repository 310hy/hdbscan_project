import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "../assets/irisData.json";

function ScatterPlot() {
  const svgElemRef = useRef(null);

  useEffect(() => {
    console.log("start");

    let margin = { top: 10, right: 30, bottom: 50, left: 60 };
    let width = 500 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;

    let svg = d3
      .select(svgElemRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    let x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d["sepal length (cm)"]))
      .range([0, width]);

    let y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d["sepal width (cm)"]))
      .range([height, 0]);

    let color = d3
      .scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica"])
      .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d["sepal length (cm)"]))
      .attr("cy", (d) => y(d["sepal width (cm)"]))
      .attr("r", 4)
      .style("fill", (d) => color(d["species"]))
      .style("opacity", "0.7");

    // Add X-axis label
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10) // Positioning it below the axis
      .text("Sepal Length (cm)");

    // Add Y-axis label
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2) // Negative because of the rotation
      .attr("y", -margin.left + 20) // Adding some padding to move it away from the axis
      .text("Sepal Width (cm)");
  }, []);

  return (
    <div>
      <svg ref={svgElemRef}></svg>
    </div>
  );
}

export default ScatterPlot;
