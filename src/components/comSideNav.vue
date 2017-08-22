<template>
  <el-menu :default-active="onRoutes"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            theme="light"
            router>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-edit"></i>文章管理</template>
      <el-menu-item index="/cms/article/list/1">文章列表</el-menu-item>
      <el-menu-item index="/cms/article/add">添加文章</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-date"></i>分类管理</template>
      <el-menu-item index="/cms/gategory">分类列表</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
      <el-menu-item index="/cms/user/info">个人资料</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    computed: {
      onRoutes () {
        let path = this.$route.path
        if (path.includes('/cms/article/list')) return '/cms/article/list/1'
        return this.$route.path
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo {
    // position: fixed;
    // top: 70px;
    // left: 0;
    border-radius: 0;
    flex: 0 0 230px;
  }
</style>
