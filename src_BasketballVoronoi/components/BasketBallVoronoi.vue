<template>
  <div>
    <h3>展示某一时刻球场上各球员所控制的空间</h3>
    <svg id="mainsvg" class="mainsvg">
      <!-- <img src="../assets/court.png"> -->
    </svg>
  </div>
</template>

<script>
import * as d3vor from "d3-voronoi";
import * as d3 from "d3";

export default {
  name: "BasketBallVoronoi",
  data() {
    return {
      width: 200,
      height: 200
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.setAxis();
      this.setVoronoi();
      this.setPoint();
    },
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
        .scaleLinear() //定义了一个类型为（linear）的比例尺
        .domain([0, 12])
        .range([this.height, 0]);
      var g = svg
        .append("g") //添加g元素
        .attr("id", "axisgroup")
        .attr("width", this.width) //设定宽度
        .attr("height", this.height); //设定高度
      var yAxis = d3.axisLeft(yscale);
      g.append("g").call(yAxis);

      var xAxis = d3.axisBottom(xscale);
      g.append("g")
        .attr("transform", "translate(0,200)")
        .call(xAxis);
    },

    setPoint() {
      //set point
      var xscale = d3
        .scaleLinear() //定义了一个类型为（linear）的比例尺
        .domain([0, 12])
        .range([0, this.width]);
      var yscale = d3
        .scaleLinear() //定义了一个类型为（linear）的比例尺
        .domain([0, 12])
        .range([this.height, 0]);

      // var all_players = {}; //所有球员的信息（字典）
      var def_players_value = []; //进攻球员坐标
      var off_players_value = []; //防守球员坐标
      var cutter_value = [];
      var basketball_value = [
        [
          xscale(this.$store.state.Instant_players_info["basketball"][0]),
          yscale(this.$store.state.Instant_players_info["basketball"][1])
        ]
      ];

      // this.$store.state.Instant_players_info[defensive_players]

      let i = 0; //防守球员坐标
      for (var key in this.$store.state.Instant_players_info[
        "defensive_players"
      ]) {
        def_players_value[i] = [
          xscale(
            this.$store.state.Instant_players_info["defensive_players"][key][0]
          ),
          yscale(
            this.$store.state.Instant_players_info["defensive_players"][key][1]
          )
        ];
        i++;
      }
      let j = 0; //进攻球员坐标
      for (var key in this.$store.state.Instant_players_info[
        "offensive_players"
      ]) {
        off_players_value[j] = [
          xscale(
            this.$store.state.Instant_players_info["offensive_players"][key][0]
          ),
          yscale(
            this.$store.state.Instant_players_info["offensive_players"][key][1]
          )
        ];
        j++;
      }

      for (var key in this.cutter) {
        cutter_value[0] = [
          xscale(this.$store.state.Instant_players_info["cutter"][key][0]),
          yscale(this.$store.state.Instant_players_info["cutter"][key][1])
        ];
      }

      var svg = d3.select("#mainsvg");
      var g = svg
        .append("g") //添加g元素
        .attr("id", "pointgroup")
        .attr("width", this.width) //设定宽度
        .attr("height", this.height); //设定高度
      var circle1 = g //进攻球员坐标显示
        .attr("class", "class1")
        .selectAll("class1")
        .data(def_players_value)
        .enter()
        .append("circle");
      circle1
        .attr("cx", function(d, i) {
          return d[0];
        })
        .attr("cy", function(d, i) {
          return d[1];
        })
        .attr("r", 5.5)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      var circle2 = g //防守球员坐标显示
        .attr("class", "class2")
        .selectAll("class2")
        .data(off_players_value)
        .enter()
        .append("circle");
      circle2
        .attr("cx", function(d, i) {
          return d[0];
        })
        .attr("cy", function(d, i) {
          return d[1];
        })
        .attr("r", 5.5)
        .attr("fill", "black");

      var circle3 = g
        .attr("class", "class3")
        .selectAll("class3")
        .data(cutter_value)
        .enter()
        .append("circle");
      circle3
        .attr("cx", function(d, i) {
          return d[0];
        })
        .attr("cy", function(d, i) {
          return d[1];
        })
        .attr("r", 5.5)
        .attr("fill", "black");

      var circle4 = g //basketball坐标显示
        .attr("class", "class4")
        .selectAll("class4")
        .data(basketball_value)
        .enter()
        .append("circle");
      circle4
        .attr("cx", function(d, i) {
          return d[0];
        })
        .attr("cy", function(d, i) {
          return d[1];
        })
        .attr("r", 7)
        .attr("fill", "orange");
    },
    setVoronoi() {
      var xscale = d3
        .scaleLinear() //定义了一个类型为（linear）的比例尺
        .domain([0, 12])
        .range([0, this.width]);
      var yscale = d3
        .scaleLinear() //定义了一个类型为（linear）的比例尺
        .domain([0, 12])
        .range([this.height, 0]);

      var all_players = {}; //所有球员的信息（字典）
      var all_players_value = []; //所有球员的坐标（二维数组）

      for (var key in this.$store.state.Instant_players_info[
        "defensive_players"
      ]) {
        all_players[key] = this.$store.state.Instant_players_info[
          "defensive_players"
        ][key];
      }

      for (var key in this.$store.state.Instant_players_info[
        "offensive_players"
      ]) {
        all_players[key] = this.$store.state.Instant_players_info[
          "offensive_players"
        ][key];
      }

      let i = 0; //all_players
      for (var key in all_players) {
        all_players_value[i] = [
          xscale(all_players[key][0]),
          yscale(all_players[key][1])
        ];
        i++;
      }

      var cutter_value = [];
      for (var key in this.$store.state.Instant_players_info["cutter"]) {
        cutter_value[0] = [
          xscale(this.$store.state.Instant_players_info["cutter"][key][0]),
          yscale(this.$store.state.Instant_players_info["cutter"][key][1])
        ];
      }
      all_players_value.push(cutter_value[0]);

      var voronoi = d3vor
        .voronoi()
        .x(function(d) {
          return d[0];
        })
        .y(function(d) {
          return d[1];
        })
        .extent([
          [0, 0],
          [this.width, this.height]
        ]);
      var svg = d3.select("#mainsvg");

      const ret = this.$store.state.Instant_players_info[
        "offensive_contribution"
      ];
      var voro = svg
        .append("g")
        .attr("id", "vorogroup")
        .selectAll("path")
        .data(voronoi.polygons(all_players_value))
        .enter()
        .append("path")
        .style("fill", function(d, i) {
          return color(i);
        })
        .style("stroke", "black")
        .style("opacity", function(d, i) {
          return setopacity(i, ret);
        })
        .style("stroke-width", 1.5)
        .call(redrawVoro);

      function color(i) {
        if (i <= 4) {
          return "#f2f2f2";
        } else if (i == 9) {
          return "#ffb3a1";
        } else {
          return "none";
        }
      }

      function setopacity(i, ret) {
        if (i <= 8) {
          return 0.75;
        } else {
          return ret;
        }
      }

      function redrawVoro(voro) {
        voro.attr("d", d => {
          return d ? "M" + d.join("L") + "Z" : null;
        });
      }
    }
  }
};
</script>

<style>
.mainsvg {
  background-image: url("../assets/court.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
