<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-menu-item index="/func/basic">
      <el-icon><icon-menu /></el-icon>
      <span>BasicFunction</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <el-icon><setting /></el-icon>
      <span>Settings</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu, Setting, InfoFilled } from "@element-plus/icons-vue";
</script>
