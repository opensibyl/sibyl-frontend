<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const chart1 = ref();
let myChart = null;
onMounted(() => {
  myChart = echarts.init(chart1.value, null, {
    width: 600,
    height: 400,
  });

  var option = {
    title: {
      text: "File Relationship",
      subtext: "Circular layout",
      top: "bottom",
      left: "right",
    },
    tooltip: {},
    legend: [
      {
        data: graph.categories.map(function (a) {
          return a.name;
        }),
      },
    ],
    animationDurationUpdate: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        name: "File Relationship",
        type: "graph",
        layout: "none",
        circular: {
          rotateLabel: true,
        },
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          position: "right",
          formatter: "{b}",
        },
        lineStyle: {
          color: "source",
          curveness: 0.3,
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 10,
          },
        },
      },
    ],
  };

  myChart.setOption(option);
});

const graph = {
  nodes: [
    {
      id: "0",
      name: "Myriel",
      symbolSize: 19.12381,
      x: -266.82776,
      y: 299.6904,
      value: 28.685715,
      category: 0,
    },
    {
      id: "1",
      name: "Napoleon",
      symbolSize: 2.6666666666666665,
      x: -418.08344,
      y: 446.8853,
      value: 4,
      category: 0,
    },
    {
      id: "2",
      name: "MlleBaptistine",
      symbolSize: 6.323809333333333,
      x: -212.76357,
      y: 245.29176,
      value: 9.485714,
      category: 1,
    },
    {
      id: "3",
      name: "MmeMagloire",
      symbolSize: 6.323809333333333,
      x: -242.82404,
      y: 235.26283,
      value: 9.485714,
      category: 1,
    },
  ],
  links: [
    {
      source: "1",
      target: "0",
    },
    {
      source: "2",
      target: "0",
    },
    {
      source: "3",
      target: "0",
    },
  ],
  categories: [
    {
      name: "A",
    },
    {
      name: "B",
    },
    {
      name: "C",
    },
  ],
};
</script>

<template>
  <div ref="chart1" style="width: 400px height: 400px"></div>
</template>
