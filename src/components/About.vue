<template>
  <el-descriptions
    title="Documentation"
    :column="1"
    :size="size"
    border
    style="margin: 20px"
  >
    <el-descriptions-item label="Documentation (English)"
      ><el-link
        >https://github.com/opensibyl/sibyl2</el-link
      ></el-descriptions-item
    >
    <el-descriptions-item label="Documentation (中文)"
      ><el-link>https://opensibyl.github.io/doc/</el-link></el-descriptions-item
    ></el-descriptions
  >

  <el-descriptions
    title="Repositories"
    :column="1"
    :size="size"
    border
    style="margin: 20px"
  >
    <el-descriptions-item label="Github repo (Main)"
      ><el-link
        >https://github.com/opensibyl/sibyl2</el-link
      ></el-descriptions-item
    >
    <el-descriptions-item label="Github repo (Frontend)"
      ><el-link
        >https://github.com/opensibyl/sibyl-frontend</el-link
      ></el-descriptions-item
    >
  </el-descriptions>
  <el-descriptions
    title="Contact us"
    :column="1"
    :size="size"
    border
    style="margin: 20px"
  >
    <el-descriptions-item label="Issue Board"
      ><el-link
        >https://github.com/opensibyl/sibyl2/issues</el-link
      ></el-descriptions-item
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
