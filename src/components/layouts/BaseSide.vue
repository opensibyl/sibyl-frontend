<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-sub-menu index="1">
      <template #title
        ><el-icon><icon-menu></icon-menu></el-icon>
        <span>文件维度</span></template
      >
      <el-menu-item index="/file/basic"><span>基础查询</span></el-menu-item>
      <el-menu-item index="/file/reference" disabled
        ><span>文件关联</span></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title
        ><el-icon><icon-menu></icon-menu></el-icon>
        <span>函数维度</span></template
      >
      <el-menu-item index="/func/search" disabled
        ><span>全局查询</span></el-menu-item
      >
      <el-menu-item index="/func/reference" disabled
        ><span>函数关联</span></el-menu-item
      >
      <el-menu-item index="/func/reference" disabled
        ><span>冷热函数</span></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title
        ><el-icon><icon-menu></icon-menu></el-icon>
        <span>类维度</span></template
      >
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Menu as IconMenu,
  Setting,
  InfoFilled,
  RefreshRight,
} from "@element-plus/icons-vue";
</script>
