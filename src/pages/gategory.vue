<template>
  <div class="category">
    <titleBar title1="分类" title2="分类列表"/>
    <!-- 工具条 -->
    <el-row>
      <el-form :inline="true" v-model="getFilters">
        <el-form-item>
          <el-input v-model="getFilters.tag" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  
    <!--列表-->
    <el-table :data="categoryList" highlight-current-row  v-loading="backLoading" @selection-change="selsChange" :border="true">
      <el-table-column prop="tag" label="分类名称" sortable>
      </el-table-column>
      <el-table-column prop="articleTotal" label="文章总数" sortable>
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

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" v-model="showEditForm" size="small">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="分类名称：" prop="newTag">
					<el-input v-model="editForm.newTag" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
      <span slot="footer">
        <el-button @click="showEditForm = false">取 消</el-button>
        <el-button type="primary" @click.native="editSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!--新增弹窗-->
		<el-dialog title="新增" v-model="showAddForm">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="分类名称：" prop="tag">
					<el-input v-model="addForm.tag" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="showAddForm = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="backLoading">提交</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
  import titleBar from '../components/titleBar.vue'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        // 编辑弹窗显示
        showEditForm: false,
        // 编辑弹窗
        editForm: {
          tag: '',
          newTag: ''
        },
        editFormRules: {
          newTag: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ]
        },
        getFilters: {
          tag: ''
        },
        // 新增弹窗
        showAddForm: false,
        addForm: {
          tag: ''
        },
        addFormRules: {
          tag: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'getCategory',
        'editCategory',
        'delCategory',
        'addCategory'
      ]),
      selsChange () {
        // console.log(1)
      },
      // 编辑
      handleEdit (index, row) {
        this.showEditForm = true
        this.editForm.tag = row.tag
        this.editForm.newTag = row.tag
      },
      // 编辑提交
      editSubmit () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.editCategory({
              context: this,
              ...this.editForm
            })
            this.showEditForm = false
          }
        })
      },
      // 新增
      handleAdd () {
        this.showAddForm = true
        if (this.$refs['addForm']) {
          this.$refs['addForm'].resetFields()
        }
      },
      // 提交新增
      addSubmit () {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.addCategory({
              context: this,
              ...this.addForm
            })
            this.showAddForm = false
          }
        })
      },
      // 删除分类
      handleDel (index, row) {
        if (row.articleTotal > 0) {
          this.$message.error('该分类下文章总数不为0，无法删除')
          return
        }
        this.delCategory({
          context: this,
          ...row
        })
      },
      // 查找
      handleSearch () {
        this.getCategory({
          context: this,
          tag: this.getFilters.tag
        })
      }
    },
    computed: {
      ...mapGetters([
        'categoryList',
        'backLoading'
      ])
    },
    mounted () {
      this.getCategory(this)
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
</style>
