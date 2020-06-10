<template>
  <div class="list">
    <h1>菜品列表</h1>
    <el-table :data="items">
      <el-table-column prop="productName" label="菜品名称" width="250"></el-table-column>
      <el-table-column prop="productPrice" label="菜品价格"></el-table-column>
      <el-table-column prop="productDescription" label="菜品描述"></el-table-column>
      <el-table-column  label="图标" style="height:1rem;">
        <template slot-scope="scope">
          <img :src="scope.row.productIcon"  width="40" height="40" alt="图标" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/items/edit/${scope.row.productId}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ItemsList',
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('seller/product/list')
      this.items = res.data.data
    },
    async remove(row) {
      this.$confirm(`将永久删除 ${row.productName} , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`rest/items/${row.productId}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetch()
        })
        .catch(() => { }) //防止报错
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style scoped></style>
