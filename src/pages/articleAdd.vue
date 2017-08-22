<template>
  <div class="article">
    <titleBar title1="文章" title2="添加文章"/>
    <el-form :model="article" :rules="rules" label-width="100px" v-loading="backLoading" ref="articleForm">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="article.title" placeholder="标题" class="article-title"></el-input>
      </el-form-item>
      <el-form-item label="所属分类：" prop="tags">
        <el-checkbox-group v-model="article.tags">
          <el-checkbox v-for="item in tags" :label="item" :key="item"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="简介：" prop="introduction">
        <el-input type="textarea" v-model="article.introduction" placeholder="简介"></el-input>
      </el-form-item>
      <el-form-item label="正文：" prop="content" class="markdown">
        <markdownEditor v-model="article.content" :configs="configs"/>
      </el-form-item>
      <el-form-item class="btns-wrap">
        <el-button type="primary" @click="submitForm('articleForm')">立即添加</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import titleBar from '../components/titleBar.vue'
  import { markdownEditor } from 'vue-simplemde'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        article: {
          title: '',
          tags: [],
          introduction: '',
          content: ''
        },
        configs: {
          renderingConfig: {
            codeSyntaxHighlighting: true, // 开启代码高亮
            highlightingTheme: 'googlecode' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
          }
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          tags: [
            { type: 'array', required: true, message: '请至少选择一个分类', trigger: 'change' }
          ],
          introduction: [
            { required: true, message: '请输入简介', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入正文', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'tags',
        'backLoading'
      ])
    },
    methods: {
      ...mapActions([
        'getTags',
        'addArticle'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            await this.addArticle({
              context: this,
              ...this.article
            })
          } else {
            return false
          }
        })
      },
      resetForm () {
        if (this.$refs['articleForm']) this.$refs['articleForm'].resetFields()
      }
    },
    components: {
      titleBar,
      markdownEditor
    },
    mounted () {
      this.getTags({context: this})
    }
  }
</script>

<style lang="scss" scoped>
  .article {
    &-title {
      width: 200px;
    }
  }
  .markdown {
    &-editor {
      margin-top: 10px;
      line-height: 20px;
    }
  }
  .btns-wrap {
    margin-top: 30px;
  }
</style>

<style lang="scss">
  .editor-statusbar {
    position: absolute;
    right: 0;
  }
</style>
