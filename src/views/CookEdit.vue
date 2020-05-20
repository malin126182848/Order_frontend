<template>
  <div class="list">
    <h1>详细菜品</h1>
    <el-table :data="items">
      <el-table-column prop="productName" label="食品名" width="250"></el-table-column>
      <el-table-column prop="productQuantity" label="食品数量"></el-table-column>
      <el-table-column  label="图标" style="height:1rem;">
        <template slot-scope="scope">
          <img :src="scope.row.productIcon"  width="40" height="40" alt="图标" />
        </template>
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/items/edit/${scope.row.productId}`)"
          >完成</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-button @click="finish">完成</el-button>
    <el-button @click="back">返回上一步</el-button>
  </div>
</template>

<script>
export default {
  name: 'ItemsList',
  props:{
    id:{}
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    async finish(){
      await this.$http.post(`seller/order/finish?orderId=${this.id}`)
    },
    async fetch() {
      const res = await this.$http.get(`seller/order/detail?orderId=${this.id}`)
      this.items = res.data.data.orderDetailList
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
