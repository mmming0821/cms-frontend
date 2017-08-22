<template>
  <el-breadcrumb separator="/" class="crumbs">
    <el-breadcrumb-item>
      <i class="el-icon-date"></i> {{ title1 }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ title2 }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    props: {
      title1: String,
      title2: String
    }
  }
</script>

<style lang="scss" scoped>
  .el-breadcrumb {
    margin-bottom: 20px;
  }
</style>

