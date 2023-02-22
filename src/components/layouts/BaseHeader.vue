<script lang="ts" setup>
import { ref } from "vue";
import { toggleDark } from "~/composables";
import {
  Menu as IconMenu,
  Setting,
  InfoFilled,
  RefreshRight,
} from "@element-plus/icons-vue";
import { useSettingStore } from "../../stores/setting";
import { ElNotification } from "element-plus";
import * as OpenapiForSibyl2Server from "sibyl_javascript_client";

const settingStore = useSettingStore();
const backendUrl = ref(settingStore.backendUrl);

const repoList = ref([]);
const revList = ref([]);

const requestRepo = () => {
  var apiClient = settingStore.getApiClient();
  var api = new OpenapiForSibyl2Server.ScopeApi(apiClient);
  var callback = function (error, data, response) {
    if (error) {
      ElNotification.error(JSON.stringify(error));
      repoList.value = [];
    } else {
      repoList.value = response.body;
    }
  };
  api.apiV1RepoGet(callback);
};

const requestRev = () => {
  var apiClient = settingStore.getApiClient();
  var api = new OpenapiForSibyl2Server.ScopeApi(apiClient);
  var callback = function (error, data, response) {
    if (error) {
      ElNotification.error(JSON.stringify(error));
      revList.value = [];
    } else {
      revList.value = response.body;
    }
  };
  api.apiV1RevGet(settingStore.curRepo, callback);
};

const sync = () => {
  if (settingStore.curRepo == "") {
    requestRepo();
  }
  if (settingStore.curRepo != "") {
    requestRev();
  }
};

requestRepo();
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
    <el-menu-item
      style="height: var(--ep-menu-item-height)"
      index="/about"
      h="full"
      ><h2>OpenSibyl</h2></el-menu-item
    >

    <el-container>
      <el-input
        class="m-2"
        v-model="backendUrl"
        size="large"
        style="width: fit-content"
        ><template #prepend>http://</template></el-input
      >
      <el-select
        v-model="settingStore.curRepo"
        class="m-2"
        placeholder="Repo"
        size="large"
        clearable
        v-on:change="sync"
        filterable
      >
        <el-option
          v-for="item in repoList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>

      <el-select
        v-model="settingStore.curRev"
        class="m-2"
        placeholder="Rev"
        size="large"
        clearable
        filterable
      >
        <el-option
          v-for="item in revList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>

      <el-button class="m-3" v-on:click="requestRepo">Refresh</el-button>
    </el-container>

    <div class="flex-grow" />
    <el-menu-item h="full" index="/about">
      <el-icon style="height: var(--ep-menu-item-height)"
        ><info-filled
      /></el-icon>
    </el-menu-item>
    <el-menu-item h="full" index="" @click="toggleDark()">
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>
</template>
