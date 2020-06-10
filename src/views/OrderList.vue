<template>
  <div class="list">
    <h1>订单列表</h1>
    <el-button type="primary" round @click="exportTable">导出数据</el-button>
    <el-table id="rebateSetTable" :data="items">
      <el-table-column prop="buyerName" label="就餐方式" width="250"></el-table-column>
      <el-table-column prop="buyerPhone" label="附加"></el-table-column>
      <el-table-column prop="buyerAddress" label="座位号"></el-table-column>
      <el-table-column prop="mealCode" label="取餐码"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
      <el-table-column prop="payStatus" label="支付状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <!-- <el-button
            type="text"
            size="small"
          @click="$router.push(`/heroes/edit/${scope.row.orderId}`)">编辑</el-button>-->
          <el-button type="text" size="small" @click="remove(scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

export default {
  name: 'ItemsList',
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('seller/order/list?page=0&size=1000')
      this.items = res.data.data
      
        if (this.items.length > 0) {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].orderId === 0) {
            this.$set(this.items[i], 'orderId', '待定')
          } else if (this.items[i].orderId === 1) {
            this.$set(this.items[i], 'orderId', '完成')
          } else {
            this.$set(this.items[i], 'orderId', '已取消')
          }
        }
      }
    },
    exportTable(){
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined')
          console.log(e, wbout)
      }
      return wbout
    },
    async remove(row) {
      this.$confirm(`即将取消,是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.post(`seller/order/cancel?orderId=${row.orderId}`)
          this.$message({
            type: 'success',
            message: '取消成功!'
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
