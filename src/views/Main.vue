<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="openeds" unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message">菜品管理</i>
          </template>

          <el-menu-item-group>
            <el-menu-item index="/items/create">新建菜品</el-menu-item>
            <el-menu-item index="/items/list">菜品列表</el-menu-item>
            <el-menu-item index="/categories/create">新建类别</el-menu-item>
            <el-menu-item index="/categories/list">类别列表</el-menu-item>
          </el-menu-item-group>
          
          
          <!-- <el-menu-item-group>
            <template slot="title">视频</template>
            <el-menu-item index="/video/erasure">视频消音</el-menu-item>
            <el-menu-item index="/audio/cut">音频裁剪</el-menu-item>
          </el-menu-item-group> -->
          <!-- <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>-->
        </el-submenu>
        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message">运营管理</i>
          </template>

          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message">订单管理</i>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/heroes/create">新建订单</el-menu-item>
            <el-menu-item index="/heroes/list">订单列表</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group> -->
          
        </el-submenu>
         <el-submenu index="3">
           <template slot="title">
            <i class="el-icon-message">二维码设置</i>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/articles/create">新建二维码</el-menu-item>
            <el-menu-item index="/articles/create1">新建二维码(带logo)</el-menu-item>
            <el-menu-item index="/articles/list">二维码列表</el-menu-item>
          </el-menu-item-group>
         </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="username">{{username}}</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      date: '2016-05-02',
      openeds: ['1']
    }
  },
  computed: {
    username() {
      return this.$store.state.username
    }
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index
    },
    handleCommand(command) {
      if (command === 'exit') {
        localStorage.token = ''
        this.$router.push('/login')
      }

    },

  },
  watch: {
    $route() {
      let url = window.location.hash.substring(1)
      this.handleSelect(url)
    }
  }
};
</script>

<style scope>
.el-header {
  background-color: #d9e4f1;
  color: #333;
  line-height: 60px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  margin-right: 2rem;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-aside {
  color: #333;
}
.username {
  font-size: 1rem;
}
</style>