<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div style="display: flex; height: 100%">
      <BaseSide />
      <div>
        <router-view></router-view>
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
  height: 100%;
}

html,
body {
  height: 100%;
}
</style>
