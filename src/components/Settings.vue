<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import * as OpenapiForSibyl2Server from "sibyl_javascript_client";

const count = ref(0);
const input = ref("element-plus");

const curDate = ref("");

const toast = () => {
  var apiClient = new OpenapiForSibyl2Server.ApiClient("http://localhost:9876");
  var api = new OpenapiForSibyl2Server.OpsApi(apiClient);
  let that = this;
  var callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      ElMessage.success(JSON.stringify(response.body));
    }
  };
  api.opsVersionGet(callback);
};
</script>

<template>
  <el-button @click="toast">El Message</el-button>
  <el-input v-model="input" style="width: 200px; margin: 20px" />
  <el-tag>Tag 1</el-tag>
</template>

<style>
.ep-button {
  margin: 4px;
}
</style>
