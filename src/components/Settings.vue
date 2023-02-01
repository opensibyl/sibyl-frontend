<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import * as OpenapiForSibyl2Server from "sibyl_javascript_client";
import { useSettingStore } from "../stores/setting";
const settingStore = useSettingStore();

const input = ref(settingStore.backendUrl);

const save = () => {
  settingStore.updateUrl(input);
  ElMessage.success("url saved");
};

const testConnection = () => {
  var apiClient = new OpenapiForSibyl2Server.ApiClient(settingStore.backendUrl);
  var api = new OpenapiForSibyl2Server.OpsApi(apiClient);
  let that = this;
  var callback = function (error, data, response) {
    if (error) {
      ElMessage.error(JSON.stringify(error));
      settingStore.switchStatus(false);
    } else {
      ElMessage.success(JSON.stringify(response.body));
      settingStore.switchStatus(true);
    }
  };
  api.opsVersionGet(callback);
};
</script>

<template>
  <el-input v-model="input" style="width: 200px; margin: 20px" />
  <el-button @click="save" type="primary">Save</el-button>
  <el-button @click="testConnection">Test connection</el-button>
</template>

<style>
.ep-button {
  margin: 4px;
}
</style>
