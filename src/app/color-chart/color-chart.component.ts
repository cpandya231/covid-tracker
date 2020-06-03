import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-color-chart',
  templateUrl: './color-chart.component.html',
  styleUrls: ['./color-chart.component.css']
})
export class ColorChartComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    var self = this;
    let tempArray = [100, 23, 500, 4000, 1000, 20000];
    let margin = { top: 50, right: 50, bottom: 50, left: 50 }
      , width = 430 // Use the window's width 
      , height = 20;



    var linearScale = d3.scaleLinear()
      .domain([d3.min(tempArray), d3.max(tempArray)])
      .range([0, 400]);

    var quantizeScale = d3.scaleQuantize<string>()
      .domain([d3.min(tempArray), d3.max(tempArray)])
      .range(["#461220", "#8c2f39", "#b23a48", "#fcb9b2", "#fed0bb"].reverse());

    var myData = d3.range(d3.min(tempArray), d3.max(tempArray), 200);




    var svg = d3.select("#scale")
      .attr("width", width)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(linearScale)
        .tickSizeOuter(0)
        .tickSizeInner(0)); //

    svg.selectAll('rect')
      .data(myData)
      .enter()
      .append("g")
      .append('rect')
      .attr('x', function (d) {
        return linearScale(d);
      })
      .attr("transform", "translate(0," + 0 + ")")
      .attr('width', 5)
      .attr('height', 20)
      .style('fill', function (d) {
        return quantizeScale(d);
      })


  }


}
