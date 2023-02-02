<template>
  <el-descriptions
    title="About This Project"
    :column="1"
    :size="size"
    border
    style="margin: 20px"
  >
    <el-descriptions-item label="Documentation"
      >https://opensibyl.github.io/doc/</el-descriptions-item
    >
    <el-descriptions-item label="Contact us"
      >https://github.com/opensibyl/sibyl2/issues/25</el-descriptions-item
    >
    <el-descriptions-item label="Github repo"
      >https://github.com/opensibyl/sibyl-frontend</el-descriptions-item
    >
  </el-descriptions>
</template>

<style scoped>
.board {
  overflow: auto;
  width: 50%;
  height: 100%;
}
</style>
