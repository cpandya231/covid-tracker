import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-color-chart',
  templateUrl: './color-chart.component.html',
  styleUrls: ['./color-chart.component.css']
})
export class ColorChartComponent implements OnInit {

  inputArray: number[] = [0, 1000, 2000, 3000, 4000];
  constructor() { }

  ngOnInit(): void {
    var self = this;
    let margin = { top: 50, right: 50, bottom: 50, left: 50 }
      , width = window.innerWidth - margin.left - margin.right // Use the window's width 
      , height = window.innerHeight - margin.top - margin.bottom;

    let n = 6;

    let xScale = d3.scaleLinear()
      .domain([0, 4000])
      .range([0, width / 4]);


    let yScale = d3.scaleLinear()
      .domain([0, 5])
      .range([height, 0]);

    let line: any = d3.line()
      .x(function (d, i) {
        return xScale(self.inputArray[i]);
      })
      .y(function (d: any) {
        return yScale(0.1);
      })
      .curve(d3.curveMonotoneX);

    let dataset = d3.range(n).map(function (d) { return { "y": 0.1 } });

    var svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)
        .tickSizeOuter(0)
        .tickSizeInner(0)); // Create an axis component with d3.axisBottom
    // Create an axis component with d3.axisLeft

    svg.append("path")
      .datum(dataset) // 10. Binds data to the line 
      .attr("class", "line") // Assign a class for styling 
      .attr("d", line); // 11. Calls the line generator 
    // 12. Appends a circle for each datapoint 
    svg.selectAll(".dot")
      .data(dataset)
      .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function (d, i) { return xScale(self.inputArray[i]) })
      .attr("cy", function (d) { return yScale(d.y) })
      .attr("r", 5);

  }
  getRange(): any[] {
    return ['yellow', 'red']
  }

}
