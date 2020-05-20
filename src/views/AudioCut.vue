<template>
  <div class="ArticleEdit">
    <h1>音频裁剪</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="开始时间">
        <el-input v-model="currentTime"></el-input>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-input v-model="lastTime"></el-input>
      </el-form-item>
      <el-form-item label="上传音频">
        <el-upload
          class="items-uploader"
          :action="$http.defaults.baseURL + '/audio'"
          :headers="mixin_getAuthHeaders()"
          :show-file-list="false"
          :on-success="wave"
        >
          <i class="el-icon-plus items-uploader-icon"></i>
        </el-upload>
        <div id="waveform"></div>
        <div id="wave-timeline" ref="wave-timeline">
          <!--时间轴 -->
        </div>
        <el-button type="primary" @click="play">
          <i class="el-icon-video-play"></i>
          播放 /
          <i class="el-icon-video-pausee"></i>
          暂停
        </el-button>
      </el-form-item>
      <a :href="model.audio">点击下载</a>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import WaveSurfer from 'wavesurfer.js'
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js'
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
export default {
  name: 'AudioCut',
  props: {
  },
  data() {
    return {
      model: {
        name: '',
        audio: '#',
      },
      wavesurfer: null,
      currentTime: '',
      lastTime: '',
    }
  },
  updated() {

  },
  methods: {
    //保存
    async save() {
      await this.$http.post('rest/audios', this.model)
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    play() {
      this.wavesurfer.playPause()

    },
    download() {
      window.open(this.model.audio)
    },
    wave(res) {
      this.model.audio = res.url
      this.$nextTick(() => {
        this.wavesurfer = WaveSurfer.create({
          container: '#waveform',
          waveColor: 'violet',
          progressColor: 'purple',
          plugins: [
            Timeline.create({
              container: '#wave-timeline'
            }),
            CursorPlugin.create({
              showTime: true,
              opacity: 1,
              customShowTimeStyle: {
                'background-color': '#000',
                color: '#fff',
                fontSize: '5px'
              }
            }),
            // Regions
            Regions.create({
              regions: [
                {
                  start: this.currentTime,
                  end: 3,
                  color: 'hsla(400, 100%, 30%, 0.5)'
                },
              ],
            }),
          ]
        })
        this.wavesurfer.load(res.url)
        this.wavesurfer.on('region-update-end', this.getStartLastTime)
        this.getStartLastTime()
      })
    },
    getStartLastTime() {
      var s = document.getElementsByTagName('region')
      if (s[0].getAttribute('title')) {
        s[0].setAttribute('data-content', s[0].getAttribute('title'))
        s[0].removeAttribute("title")
      }
      var arr = s[0].getAttribute('data-content').split('-')
      this.currentTime = arr[0]
      this.lastTime = arr[1]
    },
    formatDuraton(time) {
      if (time > -1) {
        var hour = Math.floor(time / 3600);
        var min = Math.floor(time / 60) % 60;
        var sec = time % 60;
        if (hour < 10) {
          time = '0' + hour + ":"
        } else {
          time = hour + ":"
        }

        if (min < 10) {
          time += "0"
        }
        time += min + ":"

        if (sec < 10) {
          time += "0"
        }
        time += sec
      }
      return time
    }

  },

}
</script>


<style scoped>
</style>
