<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as OpenapiForSibyl2Server from "sibyl_javascript_client";
import { ElNotification } from "element-plus";
import { useSettingStore } from "../stores/setting";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

const settingStore = useSettingStore();
const curFile = ref("");

const fileList = ref([]);
const funcResult = ref([]);
const classResult = ref([]);
const funcctxResult = ref([]);
const isGraphMode = ref(false);

const requestFile = () => {
  if (settingStore.curRepo == "" || settingStore.curRev == "") {
    ElNotification.warning("Please fill the repo and rev first");
    return;
  }

  var apiClient = settingStore.getApiClient();
  var api = new OpenapiForSibyl2Server.ScopeApi(apiClient);
  var callback = function (error, data, response) {
    if (error) {
      ElNotification.error(JSON.stringify(error));
    } else {
      ElNotification.success("files pulled");
      fileList.value = response.body;
    }
  };
  api.apiV1FileGet(settingStore.curRepo, settingStore.curRev, null, callback);
};
onMounted(() => {
  requestFile();
});

const requestFunction = () => {
  var apiClient = settingStore.getApiClient();
  var api = new OpenapiForSibyl2Server.BasicQueryApi(apiClient);
  var callback = function (error, data, response) {
    if (error) {
      ElNotification.error(JSON.stringify(error));
    } else {
      funcResult.value = response.body;
    }
  };
  api.apiV1FuncGet(
    settingStore.curRepo,
    settingStore.curRev,
    curFile.value,
    null,
    callback
  );
};

const requestClass = () => {
  var apiClient = settingStore.getApiClient();
  var api = new OpenapiForSibyl2Server.BasicQueryApi(apiClient);
  var callback = function (error, data, response) {
    if (error) {
      console.info(response.body);
      ElNotification.error(JSON.stringify(error));
    } else {
      console.info(response.body);
      classResult.value = response.body;
    }
  };
  api.apiV1ClazzGet(
    settingStore.curRepo,
    settingStore.curRev,
    curFile.value,
    callback
  );
};

const requestFuncctx = () => {
  var apiClient = settingStore.getApiClient();
  var api = new OpenapiForSibyl2Server.BasicQueryApi(apiClient);
  var callback = function (error, data, response) {
    if (error) {
      ElNotification.error(JSON.stringify(error));
    } else {
      funcctxResult.value = response.body.map((each) => {
        return {
          name: each.name,
          signature: each.signature,
          calls: each.calls,
          reverseCalls: each.reverseCalls,
        };
      });
      drawChart();
    }
  };
  api.apiV1FuncctxGet(
    settingStore.curRepo,
    settingStore.curRev,
    curFile.value,
    null,
    callback
  );
};

const pullAll = () => {
  requestFunction();
  requestClass();
  requestFuncctx();
};

// chart view
import * as echarts from "echarts";

const chart1 = ref();
var myChart = null;
onMounted(() => {
  myChart = echarts.init(chart1.value, null, {
    width: 600,
    height: 400,
  });
});

const drawChart = () => {
  var links = [];
  var nodes = {};

  funcctxResult.value.forEach((each) => {
    var k = each.signature;
    nodes[k] = {
      id: k,
      name: k,
      category: 1,
      symbolSize: 10,
    };
    links.push({
      source: curFile.value,
      target: k,
    });

    // calls
    each.calls.forEach((eachCall) => {
      if (!(eachCall in nodes)) {
        nodes[eachCall] = {
          id: eachCall,
          name: eachCall,
          category: 2,
          symbolSize: 5,
        };
      }

      links.push({
        source: k,
        target: eachCall,
      });
    });
  });

  nodes[curFile.value] = {
    id: curFile.value,
    name: curFile.value,
    category: 0,
    symbolSize: 20,
  };
  Object.values(nodes).forEach((each) => {
    each.draggable = true;
  });

  var categories = [
    {
      name: "root",
    },
    {
      name: "func",
    },
    {
      name: "call",
    },
  ];

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
        data: categories.map(function (a) {
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
        layout: "force",
        force: {
          repulsion: 100,
        },
        data: Object.values(nodes),
        links: links,
        categories: categories,
        roam: true,
        lineStyle: {
          color: "source",
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
};
</script>

<template>
  <el-form>
    <el-form-item label="Extract metadata" class="m-3">
      <el-select
        v-model="curFile"
        placeholder="Select File"
        size="large"
        clearable
        filterable
        v-on:change="checkFilled"
      >
        <el-option
          v-for="item in fileList"
          :key="item"
          :label="item"
          :value="item"
        /> </el-select
    ></el-form-item>
    <el-form-item class="m-3">
      <el-button @click="requestFile" style="width: fit-content"
        >Refresh File List</el-button
      >
      <el-button @click="pullAll" style="width: fit-content" type="primary"
        >Pull</el-button
      >
    </el-form-item>

    <el-tabs type="border-card" class="m-3">
      <el-tab-pane label="Functions"
        ><vue-json-pretty :deep="1" :data="funcResult"
      /></el-tab-pane>
      <el-tab-pane label="Classes"
        ><vue-json-pretty :deep="1" :data="classResult"
      /></el-tab-pane>
      <el-tab-pane label="FunctionContexts">
        <el-switch
          v-model="isGraphMode"
          active-text="graph"
          inactive-text="text"
          style="margin: 20px"
        ></el-switch>

        <vue-json-pretty
          :deep="1"
          :data="funcctxResult"
          v-show="!isGraphMode"
        />
        <div
          ref="chart1"
          style="width: 400px height: 400px"
          v-show="isGraphMode"
        ></div>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>
