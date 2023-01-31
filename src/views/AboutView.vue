<template>
  <div class="about">
    <h1>This is an about page</h1>
    <br />
    {{ version_resp }}
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
import * as OpenapiForSibyl2Server from "sibyl_javascript_client";

export default {
  name: "about",
  data() {
    return {
      version_resp: null,
    };
  },
  mounted() {
    this.getVersion();
  },
  methods: {
    getVersion() {
      var apiClient = new OpenapiForSibyl2Server.ApiClient(
        "http://localhost:9876"
      );
      var api = new OpenapiForSibyl2Server.OpsApi(apiClient);

      let that = this;
      var callback = function (error, data, response) {
        if (error) {
          console.error(error);
        } else {
          that.version_resp = response.body;
        }
      };
      api.opsVersionGet(callback);
    },
  },
};
</script>
