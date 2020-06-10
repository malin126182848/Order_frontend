<template>
  <div class="list">
    <h1>分类列表</h1>
    <el-table :data="items">
<!--      <el-table-column prop="categoryId" label="ID" width="250"></el-table-column>-->
      <el-table-column prop="categoryType" label="类别编号"></el-table-column>
      <el-table-column prop="categoryName" label="类别名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row.categoryType}`)"
          >编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('seller/category/list')
      this.items = res.data.data.categoryList
    },
    async remove(row) {
      this.$confirm(`将永久删除 ${row.name} 分类, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/categories/${row._id}`)
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
