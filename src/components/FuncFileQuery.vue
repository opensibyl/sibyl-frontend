<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as OpenapiForSibyl2Server from "sibyl_javascript_client";
import { ElNotification } from "element-plus";
import { useSettingStore } from "../stores/setting";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

import * as echarts from "echarts";

// 基于准备好的dom，初始化echarts实例
const chart1 = ref();
let myChart = null;
onMounted(() => {
  myChart = echarts.init(chart1.value, null, {
    width: 600,
    height: 400,
  });
  // 绘制图表
  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
});

const settingStore = useSettingStore();
const curFile = ref("");
const fileList = ref([]);
const funcResult = ref("");
const classResult = ref("");
const funcctxResult = ref("");

const requestFile = () => {
  var apiClient = settingStore.getApiClient();
  var api = new OpenapiForSibyl2Server.ScopeApi(apiClient);
  var callback = function (error, data, response) {
    if (error) {
      ElNotification(JSON.stringify(error));
    } else {
      ElNotification.success("files pulled");
      fileList.value = response.body;
    }
  };
  api.apiV1FileGet(settingStore.curRepo, settingStore.curRev, null, callback);
};

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
      ElNotification.error(JSON.stringify(error));
    } else {
      classResult.value = response.body;
    }
  };
  api.apiV1ClazzGet(
    settingStore.curRepo,
    settingStore.curRev,
    curFile.value,
    null,
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
      funcctxResult.value = response.body;
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
</script>

<template>
  <el-form label-width="120px">
    <el-form-item>
      <el-select
        v-model="curFile"
        class="m-4"
        placeholder="Select File"
        size="large"
        clearable
        filterable
      >
        <el-option
          v-for="item in fileList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button @click="requestFile" class="m-3" style="width: fit-content"
        >Sync File List</el-button
      >
      <el-button @click="pullAll" class="m-3" style="width: fit-content"
        >Pull Data</el-button
      >
    </el-form-item>

    <el-tabs type="border-card" class="m-3">
      <el-tab-pane label="Functions"
        ><vue-json-pretty :data="funcResult"
      /></el-tab-pane>
      <el-tab-pane label="Classes"
        ><vue-json-pretty :data="classResult"
      /></el-tab-pane>
      <el-tab-pane label="FunctionContexts" style="width: 400px height: 400px">
        <div ref="chart1" style="width: 400px height: 400px"></div>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>
