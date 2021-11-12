<template>
  <div class="container">
    <el-button plain @click="onUpload">添加教室</el-button>
    <el-dialog title="填写信息" :visible.sync="addCodeFlag" width="30%">
      <el-select v-model="college" placeholder="请选择学院" class="picker">
        <el-option
          v-for="item in collegeOptions"
          :key="item.college"
          :label="item.collegeLabel"
          :value="item.college"
        />
      </el-select>
      <el-input
        v-model="class_number"
        placeholder="请输入待添加教室编号 (格式：J4-123)"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCodeFlag = false">取 消</el-button>
        <el-button type="primary" @click="postCode">确 定</el-button>
      </span>
    </el-dialog>
    <h2>教室列表</h2>
    <el-table v-loading="loading" :data="codeList" stripe>
      <el-table-column width="50" />
      <el-table-column label="教室" width="300" prop="class_number" />
      <el-table-column label="学院" prop="college">
        <template slot-scope="scope">
          <span>{{ collegeFormat(scope.row.college) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="600">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" alt height="150">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="onDel(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col>
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="count"
          layout="pager"
          :total="codeListLength"
          @current-change="getList"
        />
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该教室吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadCode, fetchList, del } from '@/api/qrcode'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      codeList: [],
      loading: false,
      delDialogVisible: false,
      qrcode: {},
      addCodeFlag: false,
      class_number: '',
      count: 2,
      currentPage: 1,
      codeListLength: 0,
      collegeOptions: [
        {
          college: undefined,
          collegeLabel: undefined
        },
        {
          college: 1,
          collegeLabel: '计算机与软件学院'
        },
        {
          college: 2,
          collegeLabel: '机械工程学院'
        },
        {
          college: 3,
          collegeLabel: '电气工程学院'
        },
        {
          college: 4,
          collegeLabel: '交通工程学院'
        },
        {
          college: 5,
          collegeLabel: '航空工程学院'
        },
        {
          college: 6,
          collegeLabel: '商务贸易学院'
        },
        {
          college: 7,
          collegeLabel: '经济管理学院'
        },
        {
          college: 8,
          collegeLabel: '艺术设计学院'
        },
        {
          college: 9,
          collegeLabel: '国际教育学院'
        }
      ], // 学院选项
      college: undefined
    }
  },
  computed: {
    ...mapGetters(['admin'])
  },
  created() {
    this.getList()
  },
  methods: {
    // 教室格式校验
    classNumberVaild(str) {
      const Reg = /^((J[1-9]-)+\d{3})$/
      return Reg.test(str)
    },
    // 获取教室小程序码列表
    getList() {
      this.loading = true
      this.codeList = []
      fetchList({
        college: this.admin.college,
        start: this.count * (this.currentPage - 1),
        count: this.count
      }).then((res) => {
        if (res.data === '没有教室') {
          this.$message({
            message: '教室为空',
            type: 'error'
          })
        } else {
          this.codeList = res.data
          this.codeListLength = res.total
        }
        this.loading = false
      })
    },
    // 删除小程序码相关
    onDel(row) {
      this.delDialogVisible = true
      this.qrcode = row
    },
    doDel() {
      this.delDialogVisible = false
      this.loading = true
      del(this.qrcode).then((res) => {
        this.loading = false
        // 删除成功
        if (res.data.delDBRes.deleted === 1) {
          this.codeList = []
          this.getList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 添加小程序码相关
    onUpload() {
      this.class_number = ''
      this.college = undefined
      this.addCodeFlag = true
    },
    postCode() {
      const flag = this.classNumberVaild(this.class_number)
      if (this.college === undefined) {
        this.$message({
          message: '学院未选择',
          type: 'error'
        })
        return
      }
      if (!flag) {
        this.$message({
          message: '教室编号格式错误，(格式：J4-121)',
          type: 'error'
        })
      } else {
        uploadCode({
          college: this.college,
          scene: this.class_number
        }).then((res) => {
          if (res.data !== '') {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.codeList = []
            this.getList()
          } else {
            this.$message({
              message: '该教室二维码已存在',
              type: 'error'
            })
          }
          this.addCodeFlag = false
        })
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
    }
  }
}
</script>

<style lang="scss" scope>
.container {
  background-color: #d3dce6;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 30px 50px;

  .picker {
    margin-bottom: 10px;
  }
}
</style>
