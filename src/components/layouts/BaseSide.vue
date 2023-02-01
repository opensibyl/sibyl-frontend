<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-menu-item index="/home">
      <el-icon><icon-menu /></el-icon>
      <span>Home</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <el-icon><setting /></el-icon>
      <span>Settings</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <el-icon><info-filled /></el-icon>
      <span>About</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu, Setting, InfoFilled } from "@element-plus/icons-vue";
</script>
