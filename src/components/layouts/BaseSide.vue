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
        <span>File Level</span></template
      >
      <el-menu-item index="/file/basic"><span>Extract</span></el-menu-item>
      <el-menu-item index="/file/reference"
        ><span>Reference Map</span></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title
        ><el-icon><icon-menu></icon-menu></el-icon>
        <span>Function Level</span></template
      >
      <el-menu-item index="/func/search" disabled
        ><span>Global Search</span></el-menu-item
      >
      <el-menu-item index="/func/reference" disabled
        ><span>Reference Map</span></el-menu-item
      >
      <el-menu-item index="/func/reference" disabled
        ><span>Heat Map</span></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title
        ><el-icon><icon-menu></icon-menu></el-icon>
        <span>Class Level</span></template
      >
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from "@element-plus/icons-vue";
</script>
