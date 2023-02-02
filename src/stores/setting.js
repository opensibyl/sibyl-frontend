import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => {
    return {
      backendUrl: "http://127.0.0.1:9876",
      backendStatus: false,
    };
  },
  actions: {},
});
