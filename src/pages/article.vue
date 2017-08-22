<template>
  <div class="article">
    <titleBar title1="文章" title2="文章列表" />
    <!-- 工具条 -->
    <el-row>
      <el-form :inline="true" v-model="getFilters">
        <el-form-item>
          <el-input v-model="getFilters.title" placeholder="标题名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  
    <!--列表-->
    <el-table :data="articleList" highlight-current-row v-loading="backLoading" :border="true">
      <el-table-column prop="title" label="标题" sortable>
      </el-table-column>
      <el-table-column prop="tags" label="所属分类" sortable>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部工具条 -->
    <el-row class="bottom-bar">
      <el-col :span="4" :offset="18">
        <el-pagination layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :page-size="3" :total="articleCount"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import titleBar from '../components/titleBar.vue'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        // 根据条件查找
        getFilters: {
          title: ''
        },
        currentPage: ~~this.$route.params.index
      }
    },
    methods: {
      ...mapActions([
        'getArticleList',
        'delArticle'
      ]),
      // 分页点击
      handleCurrentChange (pageIndex) {
        this.currentPage = pageIndex
        this.getArticleList({
          pageIndex,
          ...this.getFilters
        })
        this.$router.push({ name: 'article', params: { index: pageIndex } })
      },
      // 编辑
      handleEdit (index, row) {
        this.$router.push({ name: `articleEdit`, params: { title: row.title } })
      },
      // 删除
      handleDel (index, row) {
        let pageIndex = this.articleList.length === 1 ? this.currentPage - 1 : this.currentPage
        this.delArticle({
          context: this,
          title: row.title,
          pageIndex
        })
      },
      // 根据标题查找
      handleSearch () {
        this.getArticleList({
          context: this,
          pageIndex: 1,
          ...this.getFilters
        })
      }
    },
    computed: {
      ...mapGetters([
        'articleList',
        'backLoading',
        'articleCount'
      ])
    },
    created () {
      this.getArticleList({
        pageIndex: this.$route.params.index
      })
    },
    watch: {
      '$route' () {
        if (this.currentPage !== ~~this.$route.params.index) {
          this.currentPage = ~~this.$route.params.index
        }
      }
    },
    components: {
      titleBar
    }
  }
</script>

<style lang="scss" scoped>
  .el-input {
    width: 300px;
  }
  .bottom-bar {
    margin: 15px 0;
    padding: 8px 0px;
    background-color: #EFF2F7;
  }
</style>
