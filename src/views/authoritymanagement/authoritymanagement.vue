<template>
  <div class="bg" style="padding: 10px 60px">
    <div v-if="isSuperAdmin">
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

      <el-button plain @click="submitAdd">添加管理员</el-button>
    </div>

    <h2>管理员列表</h2>
    <el-table v-loading="loading" :data="adminList" stripe>
      <el-table-column label="工号" prop="job_number"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
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
      <el-table-column label="操作" v-if="isSuperAdmin">
        <template slot-scope="scope" v-if="scope.row.authority == 0">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该管理员吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>

    <div class="loadMore">
      <el-button class="more" plain @click="loadMore">加载更多</el-button>
    </div>
  </div>
</template>

<script>
import { fetchList, deleteAdmin, addAdmin } from "@/api/user";
import scroll from "@/utils/scroll";
export default {
  data() {
    return {
      username: "",
      job_number: "",
      phone: "",
      password: "",
      repassword: "",
      loading: false,
      adminList: [],
      count: 5,
      isSuperAdmin: true,
      delDialogVisible: false,
      info: {},
    };
  },
  // mounted() {
  //   scroll.start(this.getList)
  // },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      fetchList({
        start: this.adminList.length,
        count: this.count,
      }).then((res) => {
        this.loading = false;
        console.log(res);
        this.adminList = this.adminList.concat(res.data);
        // if (res.data.length < this.count) {
        //   scroll.end();
        // }
      });
    },
    doDel() {
      deleteAdmin({ id: this.info.id }).then((res) => {
        console.log(res.data);
        this.delDialogVisible = false;
        if (res.data.deleted > 0) {
          this.adminList = [];
          this.getList();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    onDel(row) {
      this.delDialogVisible = true;
      this.info.id = row._id;
      console.log(this.info);
    },
    loadMore() {
      this.getList();
    },
    vaildInfo() {
      if (
        this.username != "" &&
        this.password.length >= 6 &&
        this.repassword === this.password &&
        this.phone.length == 11 &&
        this.job_number.length == 10
      ) {
        return true;
      }
    },
    submitAdd() {
      console.log(this.vaildInfo());
      if (this.vaildInfo()) {
        let admin = {
          job_number: this.job_number,
          password: this.password,
          phone: this.phone,
          username: this.username,
        };
        console.log(admin);
        addAdmin(admin).then((res) => {
          console.log(res);
          if (res.data == "账号已存在") {
            this.$message.error("账号已存在");
          } else {
            this.$message({
              message: "添加成功",
              type: "success",
            });
          }
        });
      } else {
        this.$message.error("信息格式不正确");
      }
    },
  },
};
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
</style>
