<template>
  <el-col :span="24" class="header">
    <div class="header__left">后台管理系统</div>
    <div class="header__nav">
      <div class="header__right">
        <span class="header__name">{{ user.name }}</span>
        <img v-if="user.avatar" :src="user.avatar">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-col>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      ...mapActions([
        'userInfo',
        'logout'
      ]),
      handleCommand (command) {
        switch (command) {
          case 'logout':
            this.logout()
            break
        }
      }
    },
    mounted () {
      this.userInfo()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .header {
    height: 70px;
    background-color: $blue;
    width: 100%;
    z-index: 8;
    @at-root &__left {
      float: left;
      width: 250px;
      line-height: 70px;
      font-size: 20px;
      color: $white;
      text-align: center;
    }
    @at-root &__nav {
      float: left;
      width: calc(100% - 250px);
      height: 100%;
    }
    @at-root &__name {
      color: $white;
    }
    @at-root &__right {
      float: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 20px;
      min-width: 150px;
      height: 100%;
      &>img {
        display: block;
        border-radius: 50%;
        margin-right: 10px;
        margin-left: 10px;
        width: 40px;
        height: 40px;
      }
      .el-dropdown-link {
        color: $white;
        cursor: pointer;
      }
    }
  }
</style>
