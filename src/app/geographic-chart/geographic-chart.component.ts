import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import { DataService } from '../data.service';
import { StateInfo } from './../StateInfo';
@Component({
  selector: 'app-geographic-chart',
  templateUrl: './geographic-chart.component.html',
  styleUrls: ['./geographic-chart.component.css']
})
export class GeographicChartComponent implements OnInit {

  geoJson: any;
  width = 960;
  height = 1160;
  stateInfo:StateInfo[];
  path: any;
  projection:any;
  group:any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    var self=this;
    this.dataService.getStateInfo().subscribe(data=>{
      console.log(data.statewise)
     this.stateInfo=data.statewise as StateInfo[];
     console.log( this.stateInfo[1].state);
    })

    this.projection = d3.geoMercator();
    this.path = d3.geoPath()
      .projection(this.projection)
      .pointRadius(2);
      
    var svg = d3.select("#content").append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.group= svg.append("g");


    d3.json("../../assets/india copy.json").then(function (india) {

      var boundary = self.centerZoom(india);
      var subunits = self.drawSubUnits(india);
      self.colorSubunits(subunits);
      self.drawSubUnitLabels(india);
      self.drawOuterBoundary(india, boundary);

    }).catch(err => {
      console.log(err);
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
      .attr("d", this.path);
    

    return subunits;

  }

  
   drawSubUnitLabels(data){
    var self=this;
    this.group.selectAll(".subunit-label")
        .data((topojson.feature(data, data.objects.polygons) as any).features)
      .enter().append("text")
        .attr("class", "subunit-label")
        .attr("transform", function(d:any) { return "translate(" + self.path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d:any) { return d.properties.st_nm; });

  }

   colorSubunits(subunits) {

    var c = d3.scaleOrdinal(d3.schemeCategory10);
    subunits
        .style("fill", function(d,i){ return c(i); })
        .style("opacity", ".6");

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
