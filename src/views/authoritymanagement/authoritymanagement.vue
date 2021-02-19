<template>
  <div class="bg">
    <div>
      <div style="padding-left: 60px">
        <h2>添加管理员</h2>
        <el-row :gutter="20">
          <el-col :span="16">
            <div>
              <el-input v-model="username" placeholder="请输入姓名"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div>
              <el-input v-model="job_number" placeholder="请输入工号"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-input v-model="phone" placeholder="请输入手机号"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div>
              <el-input
                placeholder="请输入密码"
                v-model="password"
                show-password
              ></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-input
                placeholder="再次输入密码"
                v-model="repassword"
                show-password
              ></el-input>
            </div>
          </el-col>
        </el-row>

        <el-button plain>添加管理员</el-button>
      </div>

      <div style="padding-left: 60px; padding-right: 60px">
        <h2>当前管理员</h2>
        <el-table v-loading="loading" :data="adminList" stripe>
          <el-table-column label="工号"></el-table-column>
          <el-table-column label="姓名"></el-table-column>
          <el-table-column label="手机号"></el-table-column>
          <el-table-column label="权限"></el-table-column>
          <el-table-column label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini">编辑</el-button>
              <el-button size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 确认删除的对话框 -->
        <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
          <span>确定删除该歌单吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doDel">确 定</el-button>
          </span>
        </el-dialog>

        <el-row justify="center" type="flex">
          <el-col :span="10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage2"
              :page-sizes="[5]"
              :page-size="5"
              layout="sizes, prev, pager, next"
              :total="20"
              class="b"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </div>

      <div style="padding-left: 60px">
        <el-button plain>注销账号</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      job_number: "",
      phone: "",
      password: "",
      repassword: "",
    };
  },
  created() {

  },
  methods: {

  }
};
</script>

<style scoped>
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
</style>
