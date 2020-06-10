<template>
  <div class="list">
    <h1>订单列表</h1>
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
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-table :data="items">
        <el-table-column prop="buyerName" label="就餐方式" width="250"></el-table-column>
        <el-table-column prop="buyerPhone" label="附加"></el-table-column>
        <el-table-column prop="buyerAddress" label="座位号"></el-table-column>
        <el-table-column prop="mealCode" label="取餐码"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
<!--        <el-table-column prop="payStatus" label="支付状态"></el-table-column>-->
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              size="small"
            @click="$router.push(`/heroes/edit/${scope.row.orderId}`)">编辑</el-button>-->
            <el-button
                    type="text"
                    size="small"
                    @click="$router.push(`/cookEdit/${scope.row.orderId}`)"
            >详细菜单</el-button>
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
  activated () {
    console.log(this.$route.meta.isChange)
    if (this.$route.meta.isChange) {
      let changeData = JSON.parse(window.sessionStorage.getItem('changeData'))
      this.items.forEach(item => {
        if(item.orderId === changeData.orderId)
          item.orderStatus = changeData.orderStatus;
      })
      this.$route.meta.isChange = false
    }
  },
  methods: {
    initWebSocket: function () {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https   key你自定义的key
      var host = "localhost:8080"
      this.websock = new WebSocket("ws://" + host + "/websocket/123");
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen: function () {
      console.log("WebSocket连接成功");
      console.log("WebSocket正在发送实时数据.......");
    },
    websocketonerror: function (e) {
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage: function (e) {
      this.items.push(JSON.parse(e.data))  //这个是收到后端主动推送的值
      console.log(this.items)
      this.$message({
        type: 'success',
        message: '接收到了新订单，请尽快处理'
      })
    },
    websocketclose: function (e) {
      console.log("WebSocket连接断开");
    },
    async fetch(id) {
      this.$http.get(`seller/order/detail?orderId=${id}`).then((res)=> {
        this.items.push(res.data.data)
        console.log(res.data)
      })
    },
    handleCommand(command) {
      if (command === 'exit') {
        localStorage.token = ''
        this.$router.push('/login')
      }

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
  created(){
    // 页面创建生命周期函数
    this.initWebSocket()
  },
  destroyed: function () {
    // 离开页面生命周期函数
    this.websocketclose();
  }
}
</script>

<style scoped></style>
