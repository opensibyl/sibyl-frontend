<script lang="ts" setup>
import { ref } from "vue";
import { toggleDark } from "~/composables";
import { Menu as IconMenu, Setting, InfoFilled } from "@element-plus/icons-vue";
import { useSettingStore } from "../../stores/setting";
const settingStore = useSettingStore();
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
    <el-menu-item style="height: var(--ep-menu-item-height)" index="" h="full"
      ><h2>OpenSibyl</h2></el-menu-item
    >
    <el-menu-item h="full"
      >Current backend: {{ settingStore.backendUrl }}</el-menu-item
    >
    <el-menu-item h="full"
      >Connected: {{ settingStore.backendStatus }}</el-menu-item
    >

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
