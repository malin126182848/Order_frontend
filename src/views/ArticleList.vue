<template>
  <div class="list">
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column  label="图标" style="height:1rem;">
        <template slot-scope="scope">
          <img :src="`http://192.168.43.254:8080/image/QRCodePath/${scope.row.fileName}`"  width="100" height="100" alt="图标" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column fixed="name" label="名称" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import http from "../plugins/http";
export default {
  name: 'ArticleList',
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('seller/QRcode/list')
      this.items = res.data.data
    },
    async remove(row) {
      this.$confirm(`将永久删除《${row.title}》文章, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/articles/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetch()
      }).catch(() => { })//防止报错
    }
  },
  created() {
    this.fetch()
  }
}
</script>


<style scoped>
</style>
