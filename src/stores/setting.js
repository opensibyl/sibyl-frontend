import { defineStore } from "pinia";
import * as OpenapiForSibyl2Server from "sibyl_javascript_client";

export const useSettingStore = defineStore("setting", {
  state: () => {
    return {
      backendUrl: "127.0.0.1:9876",
      backendStatus: false,
      curRepo: "",
      curRev: "",
    };
  },
  actions: {
    getApiClient() {
      if (!this.backendUrl.startsWith("http")) {
        this.backendUrl = "http://" + this.backendUrl;
      }
      var apiClient = new OpenapiForSibyl2Server.ApiClient(this.backendUrl);
      apiClient.defaultHeaders = {};
      return apiClient;
    },
  },
});
