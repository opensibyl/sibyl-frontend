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
const funcResult = ref("");
const classResult = ref("");
const funcctxResult = ref("");

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
      funcctxResult.value = response.body.map((each) => {
        return {
          name: each["signature"],
          calls: each.calls,
          reverseCalls: each.reverseCalls,
        };
      });
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
        ><vue-json-pretty :data="funcResult"
      /></el-tab-pane>
      <el-tab-pane label="Classes"
        ><vue-json-pretty :data="classResult"
      /></el-tab-pane>
      <el-tab-pane label="FunctionContexts">
        <vue-json-pretty :data="funcctxResult" />
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>
