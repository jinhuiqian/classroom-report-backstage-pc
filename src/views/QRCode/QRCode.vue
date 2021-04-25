<template>
  <div class="container">
    <el-button plain @click="onUpload">添加教室</el-button>
    <el-dialog title="修改信息" :visible.sync="uploadInfoFlag" width="30%">
      <el-input
        v-model="class_number"
        placeholder="请输入待添加教室编号 (格式：J4-123)"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadInfoFlag = false">取 消</el-button>
        <el-button type="primary" @click="postCode">确 定</el-button>
      </span>
    </el-dialog>
    <h2>教室列表</h2>
    <el-table v-loading="loading" :data="codeList" stripe>
      <el-table-column width="50" />
      <el-table-column label="教室" width="300" prop="class_number" />
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
import { uploadCode, fetchList, del, getLength } from '@/api/qrcode'
import scroll from '@/utils/scroll'
export default {
  data() {
    return {
      codeList: [],
      loading: false,
      delDialogVisible: false,
      qrcode: {},
      uploadInfoFlag: false,
      class_number: '',
      count: 2,
      currentPage: 1,
      codeListLength: 0
    }
  },
  created() {
    this.getList()
    this.getListLength()
  },
  mounted() {
    scroll.start(this.getList)
  },
  methods: {
    // 获取列表总长度
    getListLength() {
      getLength().then((res) => {
        this.codeListLength = res.data
      })
    },
    // 教室格式校验
    classNumberVaild(str) {
      const Reg = /^((J[1-9]-)+\d{3})$/
      return Reg.test(str)
    },
    // 获取教室小程序码列表
    getList() {
      this.loading = true
      fetchList({
        start: this.count * (this.currentPage - 1),
        count: this.count
      }).then((res) => {
        if (res.data === '没有教室') {
          this.$message({
            message: '教室为空',
            type: 'error'
          })
          this.codeList = []
        } else {
          this.codeList = res.data
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
      this.uploadInfoFlag = true
    },
    postCode() {
      const flag = this.classNumberVaild(this.class_number)
      if (!flag) {
        this.$message({
          message: '教室编号格式错误，(格式：J4-121)',
          type: 'error'
        })
      } else {
        uploadCode({
          scene: this.class_number
        }).then((res) => {
          if (res.data !== '') {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.codeList = []
            this.getList()
            this.getListLength()
            this.uploadInfoFlag = false
          } else {
            this.$message({
              message: '该教室二维码已存在',
              type: 'error'
            })
          }
        })
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
}
</style>
