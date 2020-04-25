import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import { DataService } from '../data.service';
import { StateInfo } from './../StateInfo';
import { color } from 'd3';
@Component({
  selector: 'app-geographic-chart',
  templateUrl: './geographic-chart.component.html',
  styleUrls: ['./geographic-chart.component.css']
})
export class GeographicChartComponent implements OnInit {

  geoJson: any;
  width = 960;
  height = 1160;
  stateInfo: StateInfo[];
  path: any;
  projection: any;
  group: any;
  tooltip: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    var self = this;
    this.dataService.getStateInfo().subscribe(data => {
      console.log(data.statewise)
      self.stateInfo = data.statewise as StateInfo[];
      self.projection = d3.geoMercator();
      self.path = d3.geoPath()
        .projection(self.projection)
        .pointRadius(2);

      var svg = d3.select("#content").append("svg")
        .attr("width", self.width)
        .attr("height", self.height);

      self.group = svg.append("g");

      this.tooltip = d3.select("#content")
        .append("div")
        .attr("class", "tooltip");



      d3.json("../../assets/india copy.json").then(function (india) {

        var boundary = self.centerZoom(india);
        var subunits = self.drawSubUnits(india);
        self.colorSubunits(subunits);
        // self.drawSubUnitLabels(india);
        self.drawOuterBoundary(india, boundary);

      }).catch(err => {
        console.log(err);
      })

    })


  }




  centerZoom(data) {

    var o = topojson.mesh(data, data.objects.polygons, function (a, b) { return a === b; });

    this.projection
      .scale(1)
      .translate([0, 0]);

    var b = this.path.bounds(o);
    var s = 1 / Math.max((b[1][0] - b[0][0]) / 960, (b[1][1] - b[0][1]) / 1160);

    var p = this.projection
      .scale(s)
      .translate([(960 - s * (b[1][0] + b[0][0])) / 2, (1160 - s * (b[1][1] + b[0][1])) / 2]);

    return o;

  }

  drawSubUnits(data) {

    var subunits = this.group.selectAll(".subunit")
      .data((topojson.feature(data, data.objects.polygons) as any).features)
      .enter().append("path")
      .attr("class", "subunit")
      .attr("d", this.path)
      .on("mouseover", this.mouseOverEvent())
      .on("mousemove", this.mouseMoveEvent())
      .on("mouseout", this.mouseOutEvent());
    return subunits;

  }


  private mouseOverEvent(): any {
    var self = this;
    return function (d) {

      d3.select(this)
        .classed("active", true);

    };
  }

  private mouseMoveEvent(): any {
    var self = this;
    return function (d) {
      var stateInfo = self.stateInfo.filter(data => {
        return data.state == d.properties.st_nm;

      }).map(stateInfo => {
        console.log(stateInfo);
        d3.select(this)
          .classed("active", true);
        self.tooltip.transition()
          .duration(200).style("opacity", 1);
        self.tooltip
          .html(`<b>${d.properties.st_nm}</b>
           <br> Confirmed: ${stateInfo.confirmed}
           <br> Active: ${stateInfo.active}
           <br> Recovered: ${stateInfo.recovered}
           <br> Deaths: ${stateInfo.deaths} `)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");

      })

    };
  }

  private mouseOutEvent(): any {
    var self = this;
    return function (d) {

      d3.select(this)
        .classed("active", false);
      self.tooltip.transition()
        .duration(500);
      self.tooltip.style("opacity", 0);


    };
  }


  colorSubunits(subunits) {
    var self = this;
    // d3.scaleOrdinal( d3.schemeCategory10);

    var c =
      d3.scaleOrdinal(["green", "#a6acec", "#ace7ef", "#cefff1", "random","red"]);
    subunits
      .style("fill", function (d, i) {

        let color = getColor(d);
        console.log(c(color));
        return c(color);

      })
      .style("opacity", ".6");


    function getColor(d) {
      let color;
      for (let i in self.stateInfo) {

        let stateInfo = self.stateInfo[i];
        if (stateInfo.state == d.properties.st_nm) {
          let confirmedCases = parseInt(stateInfo.confirmed);
          if (confirmedCases > 4000) {
            color = "0";
          } else if (confirmedCases < 4000 && confirmedCases > 2000) {
            color = "1";
          } else if (confirmedCases < 2000 && confirmedCases > 1000) {
            color = "2";
          } else if (confirmedCases < 1000 && confirmedCases > 500) {
            color = "3";
          } else {
            color = "4";
          }
          console.log(`${stateInfo.state} color ${color}`)
        }
        

      }
      return color;

    }
  }


  drawOuterBoundary(data, boundary) {

    this.group.append("path")
      .datum(boundary)
      .attr("d", this.path)
      .attr("class", "subunit-boundary")
      .attr("fill", "none")
      .attr("stroke", "#3a403d");

  }



}
