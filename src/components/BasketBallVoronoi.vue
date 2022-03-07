<template>
  <div>
    <h1>展示某一时刻球场上各球员所控制的空间</h1>
    <svg id="mainsvg">
      <!-- width = 47  -->
      <!-- height = 50-->
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "BasketBallVoronoi",
  data() {
    return {
      width: 200,
      height: 200,
      defensive_players: {
        "120015": [3.4, 5.2],
        "120016": [4.4, 7.2],
        "120017": [5.8, 5.4],
        "120018": [6.6, 9.2],
        "120019": [7.4, 4.2]
      },
      offensive_players: {
        "120025": [5.4, 5.8],
        "120026": [6.1, 7.9],
        "120027": [8.8, 4.4],
        "120028": [9.6, 10.2]
      },
      cutter: { "120019": [7.4, 4.2] },
      offensive_contribution: 0.54,
      basketball: [6.4, 10.2]
    };
  },
  methods: {
    setAxis() {
      var svg = d3
        .select("#mainsvg")
        .attr("width", this.width) //设定宽度
        .attr("height", this.height); //设定高度
      // 定义比例尺
      var xscale = d3
        .scaleLinear() //定义了一个类型为（linear）的比例尺
        .domain([0, 12])
        .range([0, this.width]);
      var yscale = d3
        .scaleBand() //定义了一个类型为（linear）的比例尺
        .domain([0, 12])
        .range([this.height, 0]);

      var g = svg
        .append("g") //添加g元素
        .attr("id", "maingroup");

      var yAxis = d3.axisLeft(yscale);
      g.append("g").call(yAxis);

      var xAxis = d3.axisBottom(xscale);
      g.append("g")
        .attr("transform", "translate(0,200)")
        .call(xAxis);
    },
    setVoronoi() {
      var all_players = {}; //所有球员的信息（字典）

      for (var key in this.defensive_players) {
        all_players[key] = this.defensive_players[key];
      }

      for (var key in this.offensive_players) {
        all_players[key] = this.offensive_players[key];
      }

      var all_players_value = []; //所有球员的坐标（二维数组）
      let i = 0;
      for (var key in all_players) {
        all_players_value[i] = all_players[key];
        i++;
      }

      var voronoi = d3.Voronoi();
      //报错[Vue warn]: Error in mounted hook: "TypeError: Class constructor Voronoi cannot be invoked without 'new'"
      //var voronoi = d3.voronoi(); 会报错voronoi is not a function
      voronoi
        .x(function(d) {
          return x(d.x);
        })
        .y(function(d) {
          return y(d.y);
        })
        .extent([
          [0, 0],
          [this.width, this.height]
        ]);

      var svg = d3
        .select("#mainsvg")
        .attr("width", this.width) //设定宽度
        .attr("height", this.height); //设定高度

      var g = svg
        .append("g")
        .attr("id", "subgroup")
        .selectAll("path")
        .data(voronoi(all_players_value).polygons())
        .enter()
        .append("path")
        .attr("d", d => {
          return d ? "M" + d.join("L") + "Z" : null;
        })
        // .attr("fill", "green")
        .attr("stroke", "black");
    }

    // setPosition() {},
    // setBackground() {}
  },
  mounted() {
    this.setAxis();
    this.setVoronoi();
  }
};
</script>

<style></style>
