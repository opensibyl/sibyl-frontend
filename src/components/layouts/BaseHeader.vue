<script lang="ts" setup>
import { ref } from "vue";
import { toggleDark } from "~/composables";
import { useSettingStore } from "../../stores/setting";
const settingStore = useSettingStore();
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item index="1">OpenSibyl</el-menu-item>
    <el-menu-item h="full"
      >Connected: {{ settingStore.backendStatus }}</el-menu-item
    >

    <div class="flex-grow" />
    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>
</template>
