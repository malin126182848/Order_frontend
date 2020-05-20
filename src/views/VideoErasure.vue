<template>
  <div class="ArticleEdit">
    <h1>编辑视频</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="上传视频">
        <el-upload
          class="items-uploader"
          :action="$http.defaults.baseURL + '/video'"
          :headers="mixin_getAuthHeaders()"
          :show-file-list="false"
          :on-success="res => model.video=res.url"
        >
          <i class="el-icon-plus items-uploader-icon"></i>
        </el-upload>
        <a :href="model.video">点击下载</a>
      </el-form-item> 
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>

export default {
  name: 'VideoErasure',
  props: {
  },
  data() {
    return {
      model: {
        name: '',
        video: '#'
      },
    }
  },
  created() {
  },
  methods: {
    //保存
    async save() {
      await this.$http.post('rest/videos', this.model)
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    download() {
      window.open(this.model.video)
    }
  },

}
</script>


<style scoped>
</style>
