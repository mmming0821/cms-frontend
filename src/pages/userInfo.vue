<template>
  <div class="article">
    <titleBar title1="用户管理" title2="个人资料"/>
    <el-form :rules="userRules" :model="userInfo" label-width="100px" ref="userForm">
      <el-form-item label="更改昵称：" prop="nickname">
        <el-input  v-model="userInfo.nickname" placeholder="新的昵称"></el-input>
      </el-form-item>
      <el-form-item label="用户头像：">
        <el-upload
          class="avatar-uploader"
          :action="imgAction"
          ref="upload"
          name="avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :headers="token"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false"
          :on-change="avatarChange">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item class="btns-wrap">
        <el-button type="primary" @click="submitForm()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import titleBar from '../components/titleBar.vue'
  import api from '../store/api'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        userInfo: {
          nickname: ''
        },
        userRules: {
          nickname: [
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ]
        },
        uploadUrl: '',
        imgAction: api.uploadImg(),
        token: { Authorization: `token ${localStorage.getItem('token')}`.replace(/(^")|("$)/g, '') }
      }
    },
    methods: {
      ...mapActions([
        'updateUserInfo'
      ]),
      ...mapMutations([
        'SET_USER_AVATAR'
      ]),
      submitForm () {
        if (this.userInfo.nickname) {
          this.$refs['userForm'].validate(valid => {
            if (valid) {
              this.updateUserInfo({
                context: this,
                ...this.userInfo
              })
            }
          })
        }
        if (this.imageUrl === '') {
          this.$message({
            showClose: true,
            message: '没有图片'
          })
          return
        }
        // 上传头像图片
        this.$refs.upload.submit()
      },
      // 上传图片成功后
      handleAvatarSuccess (res, file) {
        this.SET_USER_AVATAR(res.url)
      },
      avatarChange (file, fileList) {
        let fileInfo = file.raw
        let isUpload = true
        if (fileInfo.type !== 'image/jpeg' && fileInfo.type !== 'image/png') {
          isUpload = false
          this.$message.error('上传头像图片只能是 JPG或PNG 格式')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          isUpload = false
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        if (isUpload) {
          this.uploadUrl = URL.createObjectURL(file.raw).toString()
        } else {
          this.$refs.upload.clearFiles()
        }
      },
      beforeAvatarUpload (file) {
        let isUpload = true
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          isUpload = false
          this.$message.error('上传头像图片只能是 JPG或PNG 格式')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          isUpload = false
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isUpload
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      imageUrl () {
        return this.uploadUrl || this.user.avatar
      }
    },
    components: {
      titleBar
    }
  }
</script>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style lang="scss" scoped>
  .el-input {
    width: 300px;
  }
</style>
