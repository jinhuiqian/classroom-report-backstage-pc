<template>
<div class="bg">
<el-row :gutter="20" type="flex" justify="space-around">
  <el-col :span="5">
    <div class="a">

      <div>
      <el-image
      style="width: 80px; height: 80px"
      :src="url1"
      :fit="fit"></el-image>
      </div>
      <div style="b">
      <h3>正常报告</h3>
      <h3>{{nreportList.length}}</h3>
      </div>

    </div>
  </el-col>

  <el-col :span="5">
    <div class="a">

      <div>
      <el-image
      style="width: 80px; height: 80px"
      :src="url2"
      :fit="fit"></el-image>
      </div>
      <div style="b">
      <h3>异常报告</h3>
      <h3>{{areportList.length}}</h3>
      </div>

    </div>
  </el-col>

  <el-col :span="5">
    <div class="a">

      <div>
      <el-image
      style="width: 80px; height: 80px"
      :src="url3"
      :fit="fit"></el-image>
      </div>
      <div style="b">
      <h3>未打分报告</h3>
      <h3 style="color:red">{{unratedreport.length}}</h3>
      </div>

    </div>
  </el-col>

  <el-col :span="5">
    <div class="a">

      <div>
      <el-image
      style="width: 80px; height: 80px"
      :src="url4"
      :fit="fit"></el-image>
      </div>
      <div style="b">
      <h3>未处理报告</h3>
      <h3 style="color:red">{{unprocessedreport.length}}</h3>
      </div>

    </div>
  </el-col>

</el-row>
</div>
</template>

<script>
import { fetchNListCount,fetchAListCount,fetchUnratedReport,fetchunProcessedReport } from "@/api/report"
import scroll from "@/utils/scroll"
export default {
  data() {
    return {
      url1: 'https://jinhuiqian.oss-cn-beijing.aliyuncs.com/avatar/c3ce052c3ac97a09726138b2019034bd.png',
      url2: 'https://jinhuiqian.oss-cn-beijing.aliyuncs.com/avatar/5a16e6c1a6d5df416b85dd7276300022.png',
      url3: 'https://jinhuiqian.oss-cn-beijing.aliyuncs.com/avatar/08fc6d3f0eb86cf89ce11d862cc34bb0.png',
      url4: 'https://jinhuiqian.oss-cn-beijing.aliyuncs.com/avatar/f4734718032481151a4e091b6219580a.png',
      nreportList: [],
      areportList: [],
      unratedreport: [],
      unprocessedreport: []
    }
  },
  created() {
    this.getList();
  },
  mounted() {
    scroll.start(this.getList);
  },
  methods: {
    getList() {
      fetchNListCount({
      }).then(res => {
        const data = res.data;
        let _nreportList = [];
        for (let i = 0, len = data.length; i < len;i++) {
          _nreportList.push(JSON.parse(data[i]));
        }
        this.nreportList = this.nreportList.concat(_nreportList);
        if(_nreportList.length < this.count) {
          scroll.end();
        }
      });
      fetchAListCount({
      }).then(res => {
        const data = res.data;
        let _areportList = [];
        for (let i = 0, len = data.length; i < len;i++) {
          _areportList.push(JSON.parse(data[i]));
        }
        this.areportList = this.areportList.concat(_areportList);
        if(_areportList.length < this.count) {
          scroll.end();
        }
      });
      fetchUnratedReport({
      }).then(res => {
        const data = res.data;
        let _unratedreport = [];
        for (let i = 0, len = data.length; i < len;i++) {
          _unratedreport.push(JSON.parse(data[i]));
        }
        this.unratedreport = this.unratedreport.concat(_unratedreport);
        if(_unratedreport.length < this.count) {
          scroll.end();
        }
      });
      fetchunProcessedReport({
      }).then(res => {
        const data = res.data;
        let _unprocessedreport = [];
        for (let i = 0, len = data.length; i < len;i++) {
          _unprocessedreport.push(JSON.parse(data[i]));
        }
        this.unprocessedreport = this.unprocessedreport.concat(_unprocessedreport);
        if(_unprocessedreport.length < this.count) {
          scroll.end();
        }
      });
    },
}
}
</script>
<style scoped>
.bg{
      background-color: #d3dce6;
      background-size: cover;
      position: absolute;
      width: 100%;
      height: 100%;
}
.a{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
}
.b{
  display: flex;
  align-content: center;
}
.el-image{
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
