<template>
  <div class="bg" style="padding: 10px 60px">
    <el-button plain @click="onUpdate">修改账号信息</el-button>

    <!-- 修改信息的对话框 -->
    <el-dialog title="修改信息" :visible.sync="updateInfoFlag" width="30%">
      <el-input
        v-model="updateBody.phone"
        placeholder="请输入新手机号"
        style="margin-bottom: 10px"
      />
      <el-input v-model="updateBody.password" placeholder="请输入新密码" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateInfoFlag = false">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加管理员 - 折叠面板 -->
    <div v-if="isSuperAdmin">
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <h2>添加管理员</h2>
          </template>

          <el-row :gutter="20">
            <el-col :span="8">
              <div>
                <el-input v-model="username" placeholder="请输入姓名" />
              </div>
            </el-col>
            <el-col :span="8">
              <el-select v-model="college" placeholder="请选择学院">
                <el-option
                  v-for="item in collegeOptions"
                  :key="item.college"
                  :label="item.collegeLabel"
                  :value="item.college"
                />
              </el-select>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <div>
                <el-input v-model="job_number" placeholder="请输入工号" />
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-input v-model="phone" placeholder="请输入手机号" />
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <div>
                <el-input
                  v-model="password"
                  placeholder="请输入密码"
                  show-password
                />
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-input
                  v-model="repassword"
                  placeholder="再次输入密码"
                  show-password
                />
              </div>
            </el-col>
          </el-row>
          <el-button plain @click="submitAdd">添加管理员</el-button>
        </el-collapse-item>
      </el-collapse>
    </div>
    <h2>管理员列表</h2>
    <el-table v-loading="loading" :data="adminList" stripe :height="305">
      <el-table-column label="学院" prop="college" sortable>
        <template slot-scope="scope">
          <span>{{ collegeFormat(scope.row.college) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号" prop="job_number" />
      <el-table-column label="姓名" prop="username" />
      <el-table-column label="手机号" prop="phone" />
      <el-table-column label="权限">
        <template slot-scope="scope">
          <span>{{ scope.row.authority == 1 ? "超级管理员" : "管理员" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | parseTime("{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="isSuperAdmin" label="操作">
        <template v-if="scope.row.authority == 0" slot-scope="scope">
          <el-button
            size="mini"
            @click="onUpdateAuth(scope.row)"
          >设为超管</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="onDel(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <el-row justify="center" type="flex">
      <el-col :span="10">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
          @current-change="getList"
        />
      </el-col>
    </el-row>

    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该管理员吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改权限的对话框 -->
    <el-dialog title="提示" :visible.sync="updateAuthFlag" width="30%">
      <span>确定设为超级管理员吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateAuthFlag = false">取 消</el-button>
        <el-button type="primary" @click="doUpdateAuth">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  deleteAdmin,
  addAdmin,
  updateInfo,
  setSuperAdmin
} from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      total: 5,
      pageSize: 5,
      currentPage: 1,
      username: '',
      job_number: '',
      phone: '',
      password: '',
      repassword: '',
      loading: false,
      adminList: [],
      delDialogVisible: false,
      info: {},
      updateInfoFlag: false,
      updateAuthFlag: false,
      updateBody: {
        phone: '',
        password: ''
      },
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
    ...mapGetters(['isSuperAdmin', 'admin'])
  },
  created() {
    this.getList()
  },
  methods: {
    // 修改权限相关
    onUpdateAuth(row) {
      this.updateAuthFlag = true
      this.info.job_number = row.job_number
    },
    doUpdateAuth() {
      setSuperAdmin({
        job_number: this.info.job_number,
        authority: 1
      }).then(res => {
        this.updateAuthFlag = false
        if (res.data.modified > 0) {
          this.adminList = []
          this.getList()
          this.$message({
            message: '已设为超级管理员',
            type: 'success'
          })
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    // 修改个人信息相关
    onUpdate() {
      this.updateBody = {
        phone: '',
        password: ''
      }
      this.updateInfoFlag = true
    },
    updateInfo() {
      if (
        (this.updateBody.password.length == 0 ||
          this.updateBody.password.length >= 6) &&
        (this.updateBody.phone.length == 0 ||
          this.updateBody.phone.length == 11)
      ) {
        updateInfo({
          id: this.admin._id,
          phone: this.updateBody.phone,
          password: this.updateBody.password
        }).then(res => {
          if (res.data.modified > 0) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.adminList = []
            this.getList()
          } else {
            this.$message.error('修改失败')
          }
          this.updateInfoFlag = false
        })
      } else {
        this.$message.error('新手机号长度必须为11位，新密码长度请大于6位')
      }
    },
    // 获取管理员列表
    getList() {
      this.loading = true
      fetchList({
        count: this.pageSize,
        start: this.pageSize * (this.currentPage - 1)
      }).then(res => {
        console.log(res)
        this.loading = false
        this.total = res.total
        this.adminList = []
        this.adminList = res.data
      })
    },
    // 删除管理员相关
    doDel() {
      deleteAdmin({ id: this.info.id }).then(res => {
        this.delDialogVisible = false
        if (res.data.deleted > 0) {
          this.adminList = []
          this.getList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    onDel(row) {
      this.delDialogVisible = true
      this.info.id = row._id
    },
    // 验证添加管理员信息
    vaildInfo() {
      if (
        this.username !== '' &&
        this.password.length >= 6 &&
        this.repassword === this.password &&
        this.phone.length === 11 &&
        this.job_number.length === 10 &&
        this.college !== undefined
      ) {
        return true
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
    // 添加管理员
    submitAdd() {
      if (this.vaildInfo()) {
        const admin = {
          job_number: this.job_number,
          password: this.password,
          phone: this.phone,
          username: this.username,
          college: this.college
        }
        console.log(admin)
        addAdmin(admin).then(res => {
          if (res.data === '账号已存在') {
            this.$message.error('账号已存在')
          } else {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.username = ''
            this.job_number = ''
            this.phone = ''
            this.password = ''
            this.repassword = ''
            this.college = undefined
            this.adminList = []
            this.getList()
          }
        })
      } else {
        this.$message.error('信息格式不正确')
      }
    }
  }
}
</script>

<style lang="scss" scope>
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
.el-collapse-item__header {
  background-color: #d3dce6;
}
.el-collapse-item__wrap {
  background-color: #d3dce6;
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
</style>
