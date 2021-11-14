<template>
  <div class="bg">
    <el-row :gutter="20" type="flex" justify="space-around">
      <el-col :span="5">
        <div class="a">
          <div>
            <el-image style="width: 80px; height: 80px" :src="url1" />
          </div>
          <div style="b">
            <h3>正常报告</h3>
            <h3>{{ nreportList }}</h3>
          </div>
        </div>
      </el-col>

      <el-col :span="5">
        <div class="a">
          <div>
            <el-image style="width: 80px; height: 80px" :src="url2" />
          </div>
          <div style="b">
            <h3>异常报告</h3>
            <h3>{{ areportList }}</h3>
          </div>
        </div>
      </el-col>

      <el-col :span="5">
        <div class="a">
          <div>
            <el-image style="width: 80px; height: 80px" :src="url4" />
          </div>
          <div style="b">
            <h3>未处理报告</h3>
            <h3 style="color: red">{{ unprocessedreport }}</h3>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchReportCount
} from '@/api/report'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      url1:
        'https://jinhuiqian.oss-cn-beijing.aliyuncs.com/avatar/5a16e6c1a6d5df416b85dd7276300022.png',
      url2:
        'https://jinhuiqian.oss-cn-beijing.aliyuncs.com/avatar/5a16e6c1a6d5df416b85dd7276300022.png',
      url4:
        'https://jinhuiqian.oss-cn-beijing.aliyuncs.com/avatar/f4734718032481151a4e091b6219580a.png',
      nreportList: 0,
      areportList: 0,
      unprocessedreport: 0
    }
  },
  computed: {
    ...mapGetters(['admin'])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchReportCount({
        flag: 1,
        if: 1,
        status: '已处理',
        college: this.admin.college
      }).then((res) => {
        this.nreportList = res.data
      })
      fetchReportCount({
        flag: 1,
        if: 2,
        status: '已处理',
        college: this.admin.college
      }).then((res) => {
        this.areportList = res.data
      })
      fetchReportCount({
        flag: 2,
        status: '未处理',
        college: this.admin.college
      }).then((res) => {
        this.unprocessedreport = res.data
      })
    }

  }
}
</script>
<style scoped>
.bg {
  background-color: #d3dce6;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
}
.a {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
}
.b {
  display: flex;
  align-content: center;
}
.el-image {
  border-radius: 10px;
  margin: 10px 50px 10px 10px;
}
.el-row {
  margin-bottom: 20px;
  margin-top: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
