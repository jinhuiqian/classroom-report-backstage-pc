<template>
  <div class="bg" style="padding: 10px 60px">
    <!-- 添加管理员 -->
    <div>
      <h2>添加未打扫记录</h2>
      <el-row :gutter="20">
        <el-col :span="5">
          <div>
            <el-input
              v-model="classroom"
              placeholder="请输入教室(J4-xxx)"
            />
          </div>
        </el-col>

        <el-col :span="5">
          <div>
            <el-input
              v-model="user_class"
              placeholder="请输入班级(软件1921)"
            />
          </div>
        </el-col>
        <el-col :span="5">
          <div>
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
            />
          </div>
        </el-col>
        <el-col :span="5">
          <div>
            <el-button plain @click="submitAdd">添加记录</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table v-loading="loading" :data="reportList" class="table">
        <el-table-column type="index" width="50" label="编号" />
        <el-table-column
          label="教室"
          prop="classroom"
          sortable
        />
        <el-table-column
          label="提交班级"
          prop="user_class"
          sortable
        />
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
      </el-table>

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
  </div>
</template>

<script>
import { addNotClean, fetchNCList } from '@/api/report'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      value1: '',
      classroom: '',
      user_class: '',
      reportList: [],
      loading: false,
      currentPage: 1, // 初始页
      pagesize: 5, // 每页的数据
      total: 5
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
      this.loading = true
      fetchNCList({
        start: 5 * (this.currentPage - 1)
      }).then((res) => {
        const data = res.data
        const _reportList = []
        for (let i = 0, len = data.length; i < len; i++) {
          _reportList.push(JSON.parse(data[i]))
        }
        this.reportList = _reportList
        this.loading = false
      })
    },
    // 教室格式校验
    classroomVaild(str) {
      const Reg = /^((J[1-9]-)+\d{3})$/
      return Reg.test(str)
    },
    classVaild(str) {
      const Reg = /^[\u4e00-\u9fa5]{2,}[0-9]{4}$/
      return Reg.test(str)
    },

    vaildInfo() {
      return (
        this.classroomVaild(this.classroom) && this.classVaild(this.user_class)
      )
    },
    submitAdd() {
      if (this.vaildInfo()) {
        const report = {
          classroom: this.classroom,
          time: Number(this.value1.getTime()),
          user_class: this.user_class,
          college: this.admin.college
        }
        addNotClean(report).then((res) => {
          if (res.data !== '') {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.classroom = ''
            this.user_class = ''
            this.value1 = null
          } else {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          }
        })
      } else {
        this.$message.error('信息格式不正确')
      }
    }
  }
}
</script>

<style lang="scss">
.loadMore {
  position: relative;
  margin-top: 20px;
  .more {
    position: absolute;
    right: 50%;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.bg {
  background-color: #d3dce6;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
}
.b {
  padding-top: 15px;
}
.table {
  padding-top: 20px;
}
</style>
