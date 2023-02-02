<script>
const request = () => {
  var apiClient = new OpenapiForSibyl2Server.ApiClient(settingStore.backendUrl);
  var api = new OpenapiForSibyl2Server.OpsApi(apiClient);
  let that = this;
  var callback = function (error, data, response) {
    if (error) {
      ElMessage.error(JSON.stringify(error));
    } else {
      ElMessage.success(JSON.stringify(response.body));
    }
  };
  api.opsVersionGet(callback);
};
</script>

<template>
  <el-form label-width="120px">
    <el-form-item label="Backend Url">
      <el-input v-model="input" />
    </el-form-item>
    <el-form-item>
      <el-button @click="request" type="primary">Request</el-button>
    </el-form-item>
  </el-form>
</template>
