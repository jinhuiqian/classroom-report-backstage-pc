<template>
  <div class="bg">
    <div class="a">
      <!-- 时间选择器 -->
      <el-date-picker
        v-model="timeRange"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="timePicker"
      />
      <el-button
        type="primary"
        class="button"
        @click="getList"
      >时间范围</el-button>
      <el-button
        type="primary"
        class="button"
        @click="showFilter"
      >条件筛选</el-button>
      <el-button
        type="primary"
        class="button"
        @click="reset"
      >重置表格</el-button>
      <el-button
        type="primary"
        class="button"
        @click="exportXlsx"
      >导出数据</el-button>
      <!-- 报告列表 -->
      <el-table v-loading="loading" :data="reportList" class="table">
        <el-table-column type="index" width="50" label="编号" />
        <el-table-column label="学院" prop="college" sortable>
          <template slot-scope="scope">
            <span>{{ collegeFormat(scope.row.college) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="教室" prop="classroom" sortable />
        <el-table-column label="提交班级" prop="user_class" sortable />
        <el-table-column label="提交时间" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.time | parseTime("{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评分" prop="score" sortable>
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.score"
              disabled
              text-color="#ff9900"
              show-score
            />
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" sortable>
          <template slot-scope="scope">
            <el-button
              v-model="scope.row.status"
              :class="scope.row.status == '已处理' ? 'green' : 'yellow'"
              type="text"
            >{{ scope.row.status }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="showDetail(scope.row)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <el-row justify="center" type="flex">
        <el-col :span="10">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="getList"
          />
        </el-col>
      </el-row>
    </div>

    <!-- 详情对话框 -->
    <el-dialog
      :title="detailTitle"
      :visible.sync="detailReportVisible"
      width="80%"
      top="50px"
    >
      <el-row :gutter="15">
        <el-col :span="5"> 学院：{{ report.college }} </el-col>
        <el-col :span="5"> 提交班级：{{ report.user_class }} </el-col>
        <el-col :span="5"> 提交人: {{ reportDetail.username }} </el-col>
        <el-col :span="5">
          提交时间： {{ report.time | parseTime("{y}-{m}-{d} {h}:{i}") }}
        </el-col>
      </el-row>

      <h4>教室信息</h4>
      <el-row :gutter="10">
        <el-col :span="5"> 教室：{{ report.classroom }} </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="5">桌椅是否有异常：{{ reportDetail.table }}</el-col>
        <el-col
          :span="5"
        >空调是否有异常: {{ reportDetail.air_conditioning }}</el-col>
        <el-col :span="5">窗户是否有异常: {{ reportDetail.windows }}</el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col
          :span="5"
        >投影仪是否有异常：{{ reportDetail.projector }}</el-col>
        <el-col
          :span="5"
        >门禁是否有异常: {{ reportDetail.access_control }}</el-col>
        <el-col
          :span="5"
        >实训设备是否有异常: {{ reportDetail.equipment }}</el-col>
      </el-row>

      <h4>详细描述</h4>
      <el-row :gutter="20">
        {{ reportDetail.describe }}
      </el-row>

      <h4>图片</h4>
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in report.img"
          :key="index"
          :span="2"
          class="col"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="item"
            :preview-src-list="report.img"
          />
        </el-col>
      </el-row>

      <hr>
      <el-row :gutter="15">
        <el-col :span="5">处理人：{{ reportDetail.handler }}</el-col>
        <el-col :span="10">反馈: {{ reportDetail.feedback }}</el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <span class="demonstration">卫生评分： </span>
        <span> {{ reportScore }}</span>
        <el-rate v-model="reportScore" :colors="colors" :allow-half="true" />
        <el-button @click="editRating">修改评分</el-button>
        <el-button type="primary" @click="open">处 理</el-button>
      </span>
    </el-dialog>

    <!-- 筛选对话框 -->
    <el-dialog
      :title="fliterTitle"
      :visible.sync="filterVisible"
      width="70%"
      top="50px"
    >
      <el-row :gutter="14">
        <el-col :span="7">
          教室：
          <el-autocomplete
            v-model="classroomFilter"
            class="inline-input"
            placeholder="请输入内容"
          />
        </el-col>

        <el-col :span="7">
          提交班级：
          <el-autocomplete
            v-model="classFilter"
            class="inline-input"
            placeholder="请输入内容"
          />
        </el-col>
        <el-col :span="7">
          评分：
          <el-select v-model="changeScore" placeholder="请选择">
            <el-option
              v-for="item in scoreOptions"
              :key="item.changeScore"
              :label="item.scoreLabel"
              :value="item.changeScore"
            />
          </el-select>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="getList">筛 选</el-button>
        <el-button type="primary" @click="closeFilter">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchDetail,
  updateStatus,
  updateScore,
  updateFeedback,
  getList,
  exportRecord
} from '@/api/report'
import { Loading } from 'element-ui'
import { mapGetters } from 'vuex'
import table2excel from 'js-table2excel'

export default {
  data() {
    return {
      reportList: [], // 报告列表
      loading: false, // 表格加载
      detailReportVisible: false, // 详情展示
      filterVisible: false, // 筛选框展示
      report: {}, // 详细报告 - 报告对象
      reportDetail: {}, // 详细报告 - 详细对象
      detailTitle: '报告详情',
      fliterTitle: '筛选',
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // 字体颜色数组
      reportScore: 0, // 报告打分
      currentPage: 1, // 初始页
      pagesize: 7, // 每页的数据
      classroomFilter: '', // 筛选框教室
      classFilter: '', // 筛选框班级
      total: 7, // 每页条数
      timePicker: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7 // 对小于开始日期范围禁用,否则反之即可
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }, // 时间选择器
      timeRange: '', // 时间范围
      scoreOptions: [
        {
          changeScore: undefined,
          scoreLabel: undefined
        },
        {
          changeScore: 0.5,
          scoreLabel: 0.5
        },
        {
          changeScore: 1,
          scoreLabel: 1
        },
        {
          changeScore: 1.5,
          scoreLabel: 1.5
        },
        {
          changeScore: 2,
          scoreLabel: 2
        },
        {
          changeScore: 3.5,
          scoreLabel: 3.5
        },
        {
          changeScore: 4,
          scoreLabel: 4
        },
        {
          changeScore: 4.5,
          scoreLabel: 4.5
        },
        {
          changeScore: 5,
          scoreLabel: 5
        }
      ], // 打分选项
      changeScore: '' // 筛选分数
    }
  },
  computed: {
    ...mapGetters(['admin'])
  },
  created() {
    this.getList()
  },
  methods: {
    // 列表渲染
    getList() {
      this.loading = true
      const reportCondition = {
        timeFlag: 0,
        classroom: this.classroomFilter,
        college: this.admin.college,
        user_class: this.classFilter,
        score: this.changeScore,
        if: 2,
        status: '已处理',
        start: 7 * (this.currentPage - 1)
      }
      if (reportCondition.classroom === '') {
        delete reportCondition.classroom
      }
      if (reportCondition.user_class === '') {
        delete reportCondition.user_class
      }
      if (reportCondition.score === '') {
        delete reportCondition.score
      }
      if (this.timeRange[0] !== undefined && this.timeRange[1] !== undefined) {
        const timeStart = new Date(this.timeRange[0]).getTime()
        const timeEnd = new Date(this.timeRange[1]).getTime()
        reportCondition.timeFlag = 1
        reportCondition['timeStart'] = timeStart
        reportCondition['timeEnd'] = timeEnd
      }
      getList(reportCondition).then((res) => {
        const data = res.data.data
        this.total = res.data.pager.Total
        const _reportList = []
        for (let i = 0, len = data.length; i < len; i++) {
          _reportList.push(JSON.parse(data[i]))
        }
        this.reportList = _reportList
        this.loading = false
      })
      this.filterVisible = false
    },
    // 显示详情
    showDetail(report) {
      this.report = {}
      this.reportDetail = {}
      this.detailReportVisible = true
      const reportId = report._id
      this.reportScore = report.score
      fetchDetail({
        reportId
      }).then((res) => {
        this.report = res.data
        this.report.time = this.timeFormat(this.report.time.$numberDouble)
        this.report.college = this.collegeFormat(
          this.report.college.$numberDouble
        )
        this.reportDetail = res.data.reportDetail[0]
      })
    },
    // 显示筛选
    showFilter() {
      this.filterVisible = true
      this.classroomFilter = ''
      this.classFilter = ''
      this.changeScore = ''
    },
    // 关闭筛选
    closeFilter() {
      this.filterVisible = false
    },
    // 修改评分
    editRating() {
      const reportId = this.report._id
      updateScore({
        _id: reportId,
        value: this.reportScore
      }).then((res) => {
        this.reportList = []
        this.getList()
        this.detailReportVisible = false
      })
    },
    // 提交处理
    onSubmit() {
      updateStatus(this.report).then((res) => {
        if (res.data.modified > 0) {
          this.$message({
            message: '处理完成',
            type: 'success'
          })
          this.editRating()
        } else {
          this.$message.error('已处理')
        }
      })
      this.detailReportVisible = false
    },
    // 填写处理反馈
    open() {
      const reportId = this.report._id
      this.$prompt('请输入反馈', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          updateFeedback({
            reportId: reportId,
            feedback: value,
            username: this.admin.username
          }).then((res) => {
            this.onSubmit()
          })
          this.$message({
            type: 'success',
            message: '已提交'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    // 重置表格
    reset() {
      this.reportList = []
      this.classroomFilter = ''
      this.classFilter = ''
      this.changeScore = ''
      this.changeStatus = ''
      this.timeRange = ''
      this.getList()
    },
    // Excel导出
    exportXlsx() {
      this.$message({
        message: '文件导出所需时间过长，请耐心等待(导出一百条数据大约45秒)',
        type: 'error'
      })
      let loadingInstance
      const timeOut = setTimeout(() => {
        loadingInstance = Loading.service({
          fullscreen: true,
          background: 'rgba(0, 0, 0, 0.5)'
        })
      }, 1000)
      clearTimeout(timeOut)
      const column = [
        {
          title: '学院',
          key: 'college',
          type: 'text'
        },
        {
          title: '教室',
          key: 'classroom',
          type: 'text'
        },
        {
          title: '上报班级',
          key: 'user_class',
          type: 'text'
        },
        {
          title: '上报人',
          key: 'username',
          type: 'text'
        },
        {
          title: '学号',
          key: 'number',
          type: 'text'
        },
        {
          title: '异常情况',
          key: 'if',
          type: 'text'
        },
        {
          title: '桌椅',
          key: 'table',
          type: 'text'
        },
        {
          title: '空调',
          key: 'air_conditioning',
          type: 'text'
        },
        {
          title: '窗户',
          key: 'windows',
          type: 'text'
        },
        {
          title: '投影仪',
          key: 'projector',
          type: 'text'
        },
        {
          title: '门禁系统',
          key: 'access_control',
          type: 'text'
        },
        {
          title: '实训设备',
          key: 'equipment',
          type: 'text'
        },
        {
          title: '描述',
          key: 'describe',
          type: 'text'
        },
        {
          title: '图片',
          key: 'img',
          type: 'image',
          width: 140,
          height: 160
        },
        {
          title: '上报时间',
          key: 'time',
          type: 'text'
        },
        {
          title: '处理人',
          key: 'handler',
          type: 'text'
        },
        {
          title: '反馈',
          key: 'feedback',
          type: 'text'
        }
      ]
      const excelName = '实验室异常报告汇总表.xls'
      const reportCondition = {
        timeFlag: 0,
        classroom: this.classroomFilter,
        college: this.admin.college,
        user_class: this.classFilter,
        score: this.changeScore,
        if: 2,
        status: '已处理'
      }
      if (reportCondition.classroom === '') {
        delete reportCondition.classroom
      }
      if (reportCondition.user_class === '') {
        delete reportCondition.user_class
      }
      if (reportCondition.score === '') {
        delete reportCondition.score
      }
      if (this.timeRange[0] !== undefined && this.timeRange[1] !== undefined) {
        const timeStart = new Date(this.timeRange[0]).getTime()
        const timeEnd = new Date(this.timeRange[1]).getTime()
        reportCondition.timeFlag = 1
        reportCondition['timeStart'] = timeStart
        reportCondition['timeEnd'] = timeEnd
      }
      exportRecord(reportCondition).then((res) => {
        const data = this.formatExportData(res.data)
        table2excel(column, data, excelName)
        loadingInstance.close()
      })
    },
    // 导出数据格式化
    formatExportData(res) {
      let returnList = []
      for (let i = 0; i < res.length; i++) {
        const record = res[i]
        const recordDetail = record.reportDetail[0]
        const returnItem = {
          college: this.collegeFormat(recordDetail.college.$numberDouble),
          classroom: record.classroom,
          user_class: record.user_class,
          username: recordDetail.username,
          number: recordDetail.number,
          if: this.ifFormat(record.if.$numberDouble),
          table: recordDetail.table,
          air_conditioning: recordDetail.air_conditioning,
          windows: recordDetail.windows,
          projector: recordDetail.projector,
          access_control: recordDetail.access_control,
          equipment: recordDetail.equipment,
          describe: recordDetail.describe,
          img: record.img[0],
          time: this.timeFormat(record.time.$numberDouble),
          handler: recordDetail.handler,
          feedback: recordDetail.feedback
        }
        returnList = returnList.concat(returnItem)
      }
      return returnList
    },
    // 状态转换
    ifFormat(num) {
      const status = parseInt(num)
      if (status === 1) {
        return '正常报告'
      } else if (status === 2) {
        return '异常报告'
      } else if (status === 3) {
        return '未打扫报告'
      }
    },
    // 学院转换
    collegeFormat(num) {
      const college = parseInt(num)
      switch (college) {
        case 1:
          return '计算机与软件学院'
        case 2:
          return '机械工程学院'
        case 3:
          return '电气工程学院'
        case 4:
          return '交通工程学院'
        case 5:
          return '航空工程学院'
        case 6:
          return '商务贸易学院'
        case 7:
          return '经济管理学院'
        case 8:
          return '艺术设计学院'
        case 9:
          return '国际教育学院'
      }
    },
    // 时间转换
    timeFormat(num) {
      const one = num.toString().split('E')[0].split('.')[0]
      const two = num.toString().split('E')[0].split('.')[1]
      const timeStr = one + two
      const time = parseInt(timeStr)
      var now = new Date(time)
      var y = now.getFullYear()
      var m = ('0' + (now.getMonth() + 1)).slice(-2)
      var d = ('0' + now.getDate()).slice(-2)
      return y + '-' + m + '-' + d + ' ' + now.toTimeString().substr(0, 8)
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
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 30px;
}
.b {
  padding-top: 15px;
}
.button {
  margin-bottom: 10px;
  margin-left: 10px;
}
.green {
  color: #00ac00;
}
.yellow {
  color: #dada15;
}
</style>
