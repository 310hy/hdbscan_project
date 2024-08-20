import React from "react";
import * as d3 from "d3";
import data from "../assets/irisData";

export const ScatterPlot = () => {
  let width = 400;
  let height = 300;
  let margin = { top: 30, bottom: 60, right: 30, left: 60 };

  let svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[0])])
    .range([margin.left, width - margin.right]);

  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([height - margin.bottom, margin.top]);

  let xAxis = d3.axisBottom(xScale).ticks(5);
  let yAxis = d3.axisLeft(yScale).ticks(5);

  let color = d3
    .scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica"])
    .range(["#3366cc", "#dc3912", "#ff9900"]);

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis);

  svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d[0]))
    .attr("cy", (d) => yScale(d[1]))
    .attr("r", 4)
    .style("fill", (d) => color(d[4]));
};
