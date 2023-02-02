<script setup lang="ts">
import { ref } from "vue";
import { ElNotification } from "element-plus";
import * as OpenapiForSibyl2Server from "sibyl_javascript_client";
import { useSettingStore } from "../stores/setting";
const settingStore = useSettingStore();

const backendUrl = ref(settingStore.backendUrl);

const save = () => {
  settingStore.backendUrl = backendUrl.value;
  ElNotification.success("url saved");
};

const testConnection = () => {
  var apiClient = settingStore.getApiClient();
  var api = new OpenapiForSibyl2Server.OpsApi(apiClient);
  var callback = function (error, data, response) {
    if (error) {
      ElNotification.error(JSON.stringify(error));
      settingStore.backendStatus = false;
    } else {
      ElNotification.success(JSON.stringify(response.body));
      settingStore.backendStatus = true;
    }
  };
  api.opsVersionGet(callback);
};
</script>

<template>
  <el-form label-width="120px" style="margin: 20px">
    <el-form-item label="Backend Url">
      <el-input v-model="backendUrl" />
    </el-form-item>
    <el-form-item>
      <el-button @click="save" type="primary">Save</el-button>
      <el-button @click="testConnection">Test connection</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
.ep-button {
  margin: 4px;
}
</style>
